package user_service.user_service.controller;

import user_service.user_service.config.UserDetailsResponse;
import user_service.user_service.dto.LoginRequest;
import user_service.user_service.dto.UserDTO;
import user_service.user_service.dto.UserRegistrationDTO;
import user_service.user_service.entity.User;
import user_service.user_service.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Key;
import java.util.Date;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    private static final String SECRET_KEY = "your-very-secure-secret-key-with-at-least-32-chars";
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;
    private final Key signingKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserRegistrationDTO registerDTO) {
        logger.info("registration request: {}", registerDTO);
        User user = userService.register(registerDTO);
        return ResponseEntity.ok(new UserDTO(user.getId(), user.getUsername(), user.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginDTO) {
        User user = userService.authenticate(loginDTO.getUsername(), loginDTO.getPassword());
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(signingKey) // Kein SignatureAlgorithm mehr nötig, Key definiert es
                .compact();

        ResponseCookie cookie = ResponseCookie.from("authToken", token)
                .httpOnly(true)
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new UserDTO(user.getId(), user.getUsername(), user.getEmail()));
    }

    @GetMapping("/validate")
    public ResponseEntity<UserDetailsResponse> validateUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {
            String username = authentication.getName();
            String role = userService.getUserRole(username);
            UserDetailsResponse response = new UserDetailsResponse();
            response.setValid(true);
            response.setRole(role);
            response.setUsername(username);
            return ResponseEntity.ok(response);
        }
        UserDetailsResponse response = new UserDetailsResponse();
        response.setValid(false);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    /*
     * @PutMapping("/{id}")
     * public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody
     * User user) {
     * return ResponseEntity.ok;
     * }
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

}
