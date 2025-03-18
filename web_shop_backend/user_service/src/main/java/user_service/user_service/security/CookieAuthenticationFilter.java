package user_service.user_service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import user_service.user_service.entity.User;
import user_service.user_service.service.UserService;
import java.io.IOException;

public class CookieAuthenticationFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public CookieAuthenticationFilter(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        if ("/api/users/login".equals(path) || "/api/users/register".equals(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Suche nach dem authToken-Cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("authToken".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    try {
                        // Validiere JWT und extrahiere userId
                        String userId = jwtUtil.extractUserId(token);
                        User user = userService.getUserById(Long.parseLong(userId));
                        if (user != null && jwtUtil.validateToken(token)) {
                            // Erstelle Authentication-Objekt
                            UserAuthentication authentication = new UserAuthentication(userId, user.getRole());
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                    } catch (Exception e) {
                        // Ungültiger Token, ignoriere ihn
                    }
                    break;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}