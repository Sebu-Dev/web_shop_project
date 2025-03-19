package user_service.user_service.dto;

public class UpdateUserDTO {

    private Long id;
    private String address;
    private String username;
    private String email;
    private String currentPassword;
    private String newPassword;

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

    public void setCurrentPassword(String currentPasswordHash) {
        this.currentPassword = currentPasswordHash;
    }

    public String getCurrentPasswordHash() {
        return this.currentPassword;
    }

    public void setNewPasswordHash(String newPasswordHash) {
        this.newPassword = newPasswordHash;
    }

    public String getNewPasswordHash() {
        return this.newPassword;
    }
}
