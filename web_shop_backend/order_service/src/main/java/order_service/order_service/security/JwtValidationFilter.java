package order_service.order_service.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import order_service.order_service.dto.UserDetailsDTO;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

public class JwtValidationFilter extends OncePerRequestFilter {
    private final AuthClient authClient;

    public JwtValidationFilter(AuthClient authClient) {
        this.authClient = authClient;
    }

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = extractTokenFromCookie(request);
        if (token != null) {
            try {
                UserDetailsDTO userDetails = authClient.validateToken(token);
                Collection<SimpleGrantedAuthority> authorities = userDetails.getAuthorities().stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                // Bei ungültigem Token keine Authentifizierung setzen
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