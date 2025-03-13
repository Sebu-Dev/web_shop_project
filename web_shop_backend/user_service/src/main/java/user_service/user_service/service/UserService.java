package user_service.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
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
        user.setRole("ROLE_USER");
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

    public User updateUser(Long userId, UserRegistrationDTO updateDTO) {
        User user = getUserById(userId);
        if (updateDTO.getUsername() != null && !updateDTO.getUsername().isEmpty()) {
            user.setUsername(updateDTO.getUsername());
        }
        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(updateDTO.getPassword()));
        }
        if (updateDTO.getEmail() != null && !updateDTO.getEmail().isEmpty()) {
            user.setEmail(updateDTO.getEmail());
        }
        if (updateDTO.getAddress() != null && !updateDTO.getAddress().isEmpty()) {
            user.setAddress(updateDTO.getAddress());
        }
        return userRepository.save(user);
    }
}