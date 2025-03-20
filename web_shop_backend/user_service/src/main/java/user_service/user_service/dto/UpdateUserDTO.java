package user_service.user_service.dto;

import java.util.Optional;

public class UpdateUserDTO {

    private Long id;
    private String address;
    private String username;
    private String email;
    private Optional<String> currentPassword;
    private Optional<String> newPassword;
    private String role;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return this.address;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }

    public void setCurrentPassword(Optional<String> currentPasswordHash) {
        this.currentPassword = currentPasswordHash;
    }

    public Optional<String> getCurrentPassword() {
        return this.currentPassword;
    }

    public void setNewPassword(Optional<String> newPasswordHash) {
        this.newPassword = newPasswordHash;
    }

    public Optional<String> getNewPassword() {
        return this.newPassword;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }

}
