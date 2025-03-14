package product_service.product_service.config;

public class UserDetailsResponse {
    private boolean valid;
    private String role;

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}