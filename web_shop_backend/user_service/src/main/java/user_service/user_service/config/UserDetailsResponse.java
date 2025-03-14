package user_service.user_service.config;

public class UserDetailsResponse {
    private boolean valid;
    private String role;
    private String username;
    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
