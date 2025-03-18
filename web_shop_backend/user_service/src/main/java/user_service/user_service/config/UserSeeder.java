package user_service.user_service.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import user_service.user_service.entity.User;
import user_service.user_service.repository.UserRepository;

@Configuration
public class UserSeeder {

    private static final Logger logger = LoggerFactory.getLogger(UserSeeder.class);

    @Bean
    public CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            logger.info("Starte User-Seeding...");

            // Admin-Benutzer
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                admin.setPasswordHash(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                admin.setAddress("123 Admin Street, Admin City, 12345");
                userRepository.save(admin);
                logger.info("Admin-Benutzer erstellt mit ID: {}", admin.getId());
            } else {
                logger.info("Admin-Benutzer existiert bereits");
            }

            // User 1
            if (userRepository.findByUsername("user1").isEmpty()) {
                User user1 = new User();
                user1.setUsername("user1");
                user1.setEmail("user1@example.com");
                user1.setPasswordHash(passwordEncoder.encode("user123"));
                user1.setRole("USER");
                user1.setAddress("456 User1 Lane, User City, 67890");
                userRepository.save(user1);
                logger.info("User1 erstellt mit ID: {}", user1.getId());
            } else {
                logger.info("User1 existiert bereits");
            }

            // User 2
            if (userRepository.findByUsername("user2").isEmpty()) {
                User user2 = new User();
                user2.setUsername("user2");
                user2.setEmail("user2@example.com");
                user2.setPasswordHash(passwordEncoder.encode("user123"));
                user2.setRole("USER");
                user2.setAddress("789 User2 Road, User Town, 54321");
                userRepository.save(user2);
                logger.info("User2 erstellt mit ID: {}", user2.getId());
            } else {
                logger.info("User2 existiert bereits");
            }

            logger.info("User-Seeding abgeschlossen");
        };
    }
}