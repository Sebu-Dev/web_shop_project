package user_service.user_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String passwordHash;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String role;

}
