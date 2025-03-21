package user_service.user_service.controller;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import user_service.user_service.config.UserDetailsResponse;
import user_service.user_service.dto.LoginRequest;
import user_service.user_service.dto.UpdateUserDTO;
import user_service.user_service.dto.UserDTO;
import user_service.user_service.dto.UserRegistrationDTO;
import user_service.user_service.entity.User;
import user_service.user_service.service.UserService;

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
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO registerDTO) {
        logger.info("Registration request: {}", registerDTO);
        try {
            User user = userService.register(registerDTO);
            UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail());
            return ResponseEntity.ok(userDTO);
        } catch (IllegalArgumentException e) {
            logger.warn("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(409).body(new ErrorResponse(e.getMessage())); // 409 Conflict für Duplikate
        } catch (Exception e) {
            logger.error("Unexpected error during registration: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginDTO) {
        try {
            User user = userService.authenticate(loginDTO.getUsername(), loginDTO.getPassword());
            String token = Jwts.builder()
                    .setSubject(user.getUsername())
                    .claim("role", user.getRole())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(signingKey)
                    .compact();

            ResponseCookie cookie = ResponseCookie.from("authToken", token)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .build();

            UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail());
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(userDTO);
        } catch (IllegalArgumentException e) {
            logger.warn("Login failed: {}", e.getMessage());
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials")); // 401 Unauthorized
        } catch (Exception e) {
            logger.error("Unexpected error during login: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ErrorResponse("Internal server error"));
        }
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
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            logger.warn("User not found: {}", e.getMessage());
            return ResponseEntity.status(404).body(new ErrorResponse(e.getMessage())); // 404 Not Found
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ErrorResponse("Internal server error"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO userDTO) {
        try {
            User updatedUser = userService.updateUser(id, userDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            logger.warn("Update failed: {}", e.getMessage());
            return ResponseEntity.status(400).body(new ErrorResponse(e.getMessage())); // 400 Bad Request
        } catch (Exception e) {
            logger.error("Unexpected error during update: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ErrorResponse("Internal server error"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            logger.warn("Delete failed: {}", e.getMessage());
            return ResponseEntity.status(404).body(new ErrorResponse(e.getMessage())); // 404 Not Found
        } catch (Exception e) {
            logger.error("Unexpected error during delete: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ErrorResponse("Internal server error"));
        }
    }

    // Hilfsklasse für Fehlerantworten
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}