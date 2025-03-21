package user_service.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import user_service.user_service.dto.UpdateUserDTO;
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
        // Prüfe, ob Benutzername oder E-Mail bereits existiert
        if (userRepository.findByUsername(registrationDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.findByEmail(registrationDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(registrationDTO.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setEmail(registrationDTO.getEmail());
        user.setAddress(registrationDTO.getAddress());
        user.setRole(registrationDTO.getRole() != null ? registrationDTO.getRole() : "USER");
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return jwtUtil.generateToken(user.getId().toString());
    }

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
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

    public User updateUser(Long userId, UpdateUserDTO updateDTO) {
        User user = getUserById(userId);
        if (updateDTO.getUsername() != null && !updateDTO.getUsername().isEmpty()) {
            if (!updateDTO.getUsername().equals(user.getUsername()) &&
                    userRepository.findByUsername(updateDTO.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username already exists");
            }
            user.setUsername(updateDTO.getUsername());
        }
        if (updateDTO.getCurrentPassword().isPresent() &&
                !updateDTO.getCurrentPassword().get().isEmpty() &&
                passwordEncoder.matches(updateDTO.getCurrentPassword().get(), user.getPasswordHash()) &&
                updateDTO.getNewPassword().isPresent() &&
                !updateDTO.getNewPassword().get().isEmpty()) {
            String newPasswordHash = passwordEncoder.encode(updateDTO.getNewPassword().get());
            user.setPasswordHash(newPasswordHash);
        } else if (updateDTO.getNewPassword().isPresent() && !updateDTO.getNewPassword().get().isEmpty()) {
            throw new IllegalArgumentException("Current password is required to update the password");
        }
        if (updateDTO.getEmail() != null && !updateDTO.getEmail().isEmpty()) {
            if (!updateDTO.getEmail().equals(user.getEmail()) &&
                    userRepository.findByEmail(updateDTO.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already exists");
            }
            user.setEmail(updateDTO.getEmail());
        }
        if (updateDTO.getAddress() != null && !updateDTO.getAddress().isEmpty()) {
            user.setAddress(updateDTO.getAddress());
        }
        if (updateDTO.getRole() != null && !updateDTO.getRole().isEmpty()) {
            user.setRole(updateDTO.getRole());
        }
        return userRepository.save(user);
    }

    public String getUserRole(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        return user.getRole();
    }
}