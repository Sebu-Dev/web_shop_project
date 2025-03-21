package product_service.product_service.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import product_service.product_service.dto.UserDetailsDTO;

public class JwtValidationFilter extends OncePerRequestFilter {
    private final AuthClient authClient;

    public JwtValidationFilter(AuthClient authClient) {
        this.authClient = authClient;
    }

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, java.io.IOException {
        String token = extractTokenFromCookie(request);
        if (token != null) {
            try {
                UserDetailsDTO userDetails = authClient.validateToken(token);
                Collection<SimpleGrantedAuthority> authorities = userDetails.getAuthorities().stream()
                        .map(SimpleGrantedAuthority::new) // Jeder String wird in ein SimpleGrantedAuthority umgewandelt
                        .collect(Collectors.toList());
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                // Token ungültig, keine Authentifizierung setzen
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
