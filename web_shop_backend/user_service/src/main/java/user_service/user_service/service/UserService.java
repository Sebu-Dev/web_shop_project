package user_service.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import user_service.user_service.dto.UserRegistrationDTO;
import user_service.user_service.entity.User;
import user_service.user_service.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(UserRegistrationDTO registrationDTO){
        User user = new User();
        user.setUsername(registrationDTO.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setEmail(registrationDTO.getEmail());
        user.setAddress(registrationDTO.getAddress());
        user.setRole("ROLE_USER");
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));
        if(passwordEncoder.matches(password, user.getPasswordHash())) {
            return user;
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
}
