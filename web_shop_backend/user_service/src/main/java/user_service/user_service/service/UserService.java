package user_service.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import user_service.user_service.dto.UserRegistrationDTO;
import user_service.user_service.entity.User;
import user_service.user_service.repository.UserRepository;
import user_service.user_service.security.JwtUtil;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public User register(UserRegistrationDTO registrationDTO) {
        User user = new User();
        user.setUsername(registrationDTO.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setEmail(registrationDTO.getEmail());
        user.setAddress(registrationDTO.getAddress());
        user.setRole(registrationDTO.getRole());
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));
        if (passwordEncoder.matches(password, user.getPasswordHash())) {
            return jwtUtil.generateToken(user.getId().toString());
        } else {
            throw new RuntimeException("Ungültiges Passwort");
        }
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));
    }

    public User makeAdmin(Long userId) {
        User user = getUserById(userId);
        user.setRole("ROLE_ADMIN");
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = getUserById(userId);
        userRepository.delete(user);
    }

    /*
     * public User updateUser(Long userId, UpdateUserDTO updateDTO) {
     * User user = getUserById(userId);
     * if (updateDTO.getUsername() != null && !updateDTO.getUsername().isEmpty()) {
     * user.setUsername(updateDTO.getUsername());
     * }
     * if (updateDTO.getcurrentPasswordHash() != null &&
     * !updateDTO.getPasswordHash().isEmpty()) {
     * user.setPasswordHash(passwordEncoder.encode(updateDTO.getPasswordHash()));
     * }
     * if (updateDTO.getEmail() != null && !updateDTO.getEmail().isEmpty()) {
     * user.setEmail(updateDTO.getEmail());
     * }
     * if (updateDTO.getAddress() != null && !updateDTO.getAddress().isEmpty()) {
     * user.setAddress(updateDTO.getAddress());
     * }
     * if (updateDTO.getRole() != null && !updateDTO.getRole().isEmpty()) {
     * user.setRole(updateDTO.getRole());
     * }
     * return userRepository.save(user);
     * }
     */

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new UsernameNotFoundException("Invalid password for user: " + username);
        }
        return user;
    }

    // Gibt die Rolle eines Benutzers zurück
    public String getUserRole(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return user.getRole();
    }
}