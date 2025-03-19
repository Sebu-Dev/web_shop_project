package user_service.user_service.dto;

public class UpdateUserDTO {

    private Long id;
    private String address;
    private String username;
    private String email;
    private String currentPasswordHash;
    private String newPasswordHash;

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

    public void setCurrentPasswordHash(String currentPasswordHash) {
        this.currentPasswordHash = currentPasswordHash;
    }

    public String getCurrentPasswordHash() {
        return this.currentPasswordHash;
    }

    public void setNewPasswordHash(String newPasswordHash) {
        this.newPasswordHash = newPasswordHash;
    }

    public String getNewPasswordHash() {
        return this.newPasswordHash;
    }
}
