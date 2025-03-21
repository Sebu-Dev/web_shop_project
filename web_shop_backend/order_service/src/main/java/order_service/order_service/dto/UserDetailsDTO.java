package order_service.order_service.dto;

import java.util.Collection;

public class UserDetailsDTO {
    private String username;
    private Collection<String> authorities;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Collection<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<String> authorities) {
        this.authorities = authorities;
    }

}
