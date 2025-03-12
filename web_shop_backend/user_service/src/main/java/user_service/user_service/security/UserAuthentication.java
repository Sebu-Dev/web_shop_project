package user_service.user_service.security;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class UserAuthentication implements Authentication {
    private final String USERID;
    private final String ROLE;

    public UserAuthentication(String userId, String role) {
        this.USERID = userId;
        this.ROLE = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(ROLE));
    }

    @Override
    public Object getCredentials() { return null; }

    @Override
    public Object getDetails() { return null; }

    @Override
    public Object getPrincipal() { return USERID; }

    @Override
    public boolean isAuthenticated() { return true; }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException { }

    @Override
    public String getName() { return USERID; }
}
