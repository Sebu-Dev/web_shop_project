package order_service.order_service.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class UserSecurity {

    public boolean checkUserId(Authentication authentication, Long userId) {
        String authenticatedUserId = authentication.getName();
        return authenticatedUserId.equals(userId.toString());
    }
}