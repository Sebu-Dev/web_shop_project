package user_service.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import user_service.user_service.dto.LoginRequest;
import user_service.user_service.dto.UserDTO;
import user_service.user_service.dto.UserRegistrationDTO;
import user_service.user_service.entity.User;
import user_service.user_service.security.JwtUtil;
import user_service.user_service.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
        @Autowired
        private UserService userService;
        @Autowired
        private JwtUtil jwtUtil; // Annahme: JwtUtil ist verfügbar

        @PostMapping("/login")
        public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginRequest) {
                // Token aus der login-Methode holen
                String token = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

                // Benutzerdaten abrufen (über die User-ID aus dem Token)
                User user = userService.getUserById(Long.parseLong(jwtUtil.extractUserId(token)));

                // UserDTO ohne Token erstellen
                UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail());

                // Token im HttpOnly-Cookie setzen
                ResponseCookie cookie = ResponseCookie.from("authToken", token)
                                .httpOnly(true)
                                .secure(false)
                                .path("/")
                                .maxAge(86400)
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .body(userDTO);
        }

        @PostMapping("/register")
        public ResponseEntity<UserDTO> register(@RequestBody UserRegistrationDTO registrationDTO) {
                // Benutzer registrieren
                User registeredUser = userService.register(registrationDTO);

                // Token nach Registrierung generieren
                String token = userService.login(registrationDTO.getUsername(), registrationDTO.getPassword());

                // UserDTO ohne Token erstellen
                UserDTO userDTO = new UserDTO(registeredUser.getId(), registeredUser.getUsername(),
                                registeredUser.getEmail());

                // Token im HttpOnly-Cookie setzen
                ResponseCookie cookie = ResponseCookie.from("authToken", token)
                                .httpOnly(true)
                                .secure(false) // Setze auf true in Produktion mit HTTPS
                                .path("/")
                                .maxAge(86400) // 24 Stunden
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .body(userDTO);
        }

        @PostMapping("/logout")
        public ResponseEntity<Void> logout() {
                // Setze das authToken-Cookie mit maxAge=0, um es zu löschen
                ResponseCookie cookie = ResponseCookie.from("authToken", null)
                                .httpOnly(true)
                                .secure(false) // Setze auf true in Produktion mit HTTPS
                                .path("/")
                                .maxAge(0) // Sofortiges Ablaufen
                                .build();
                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .build();
        }

        @DeleteMapping("/{id}")
        @PreAuthorize("authentication.name == #id.toString() or hasRole('ROLE_ADMIN')")
        public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
                userService.deleteUser(id);
                return ResponseEntity.noContent().build();
        }

        @PutMapping("/{id}")
        @PreAuthorize("authentication.name == #id.toString() or hasRole('ROLE_ADMIN')")
        public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserRegistrationDTO updateDTO) {
                User updatedUser = userService.updateUser(id, updateDTO);
                UserDTO userDTO = new UserDTO(updatedUser.getId(), updatedUser.getUsername(), updatedUser.getEmail());
                return ResponseEntity.ok(userDTO);
        }
}