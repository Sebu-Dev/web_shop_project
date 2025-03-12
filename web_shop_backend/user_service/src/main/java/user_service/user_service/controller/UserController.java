package user_service.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import user_service.user_service.dto.LoginRequest;
import user_service.user_service.dto.UserRegistrationDTO;
import user_service.user_service.entity.User;
import user_service.user_service.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRegistrationDTO registrationDTO) {
        User user = userService.register(registrationDTO);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        Cookie cookie = new Cookie("userId", user.getId().toString());
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@AuthenticationPrincipal String userId) {
        User user = userService.getUserById(Long.parseLong(userId));
        return ResponseEntity.ok(user);
    }

   /*
     @GetMapping("/admin/all-users")
    public ResponseEntity<List<User>> getAllUsers(@AuthenticationPrincipal String userId) {
        // Hier könntest du eine Methode im UserService hinzufügen, um alle Benutzer abzurufen
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    */
}
