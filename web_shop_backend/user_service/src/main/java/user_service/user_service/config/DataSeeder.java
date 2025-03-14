package user_service.user_service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import user_service.user_service.entity.User;
import user_service.user_service.repository.UserRepository;

public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@example.com");
            admin.setAddress("Admin Straße");
            admin.setRole("ROLE_ADMIN"); 
            userRepository.save(admin);

            User user = new User();
            user.setUsername("user");
            user.setPasswordHash(passwordEncoder.encode("user123"));
            user.setEmail("user@example.com");
            user.setAddress("User Straße");
            user.setRole("ROLE_USER"); 
            userRepository.save(user);
        }
    }
}
