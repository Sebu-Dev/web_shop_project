package user_service.user_service.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import user_service.user_service.entity.User;
import user_service.user_service.service.UserService;

public class CookieAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private UserService userService;

    @SuppressWarnings("null")
	@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if("userId".equals(cookie.getName())) {
                    String userId = cookie.getValue();
                    User user = userService.getUserById(Long.parseLong(userId));
                    if (user != null) {
                        UserAuthentication authentication = new UserAuthentication(userId, user.getRole());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                    break;
                }
            }
        }
        filterchain.doFilter(request, response);
    }
}
