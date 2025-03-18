package order_service.order_service.config;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserServiceClient userServiceClient;

    public JwtAuthenticationFilter(UserServiceClient userServiceClient) {
        this.userServiceClient = userServiceClient;
    }

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        String token = extractTokenFromCookie(request);
        System.out.println(
                "Extracted token in order-service: " + (token != null ? token.substring(0, 20) + "..." : "null"));

        if (token != null) {
            UserDetailsResponse userDetails = userServiceClient.validateUser(token);
            System.out
                    .println(
                            "UserDetailsResponse: " + (userDetails != null
                                    ? "valid=" + userDetails.isValid() + ", role=" + userDetails.getRole()
                                            + ", username=" + userDetails.getUsername()
                                    : "null"));

            if (userDetails != null && userDetails.isValid()) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userDetails.getRole())));
                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("Authentication set for: " + userDetails.getUsername());
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("authToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}