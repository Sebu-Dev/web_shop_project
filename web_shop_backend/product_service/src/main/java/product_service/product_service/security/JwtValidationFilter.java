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
        System.out.println("JwtValidationFilter constructor called");
    }

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, java.io.IOException {
        System.out.println("JwtValidationFilter: Entering doFilterInternal");
        String token = extractTokenFromCookie(request);
        System.out.println("Extracted token: " + (token != null ? token.substring(0, 20) + "..." : "null"));
        if (token != null) {
            try {
                UserDetailsDTO userDetails = authClient.validateToken(token);
                System.out.println("Validated user: " + userDetails.getUsername() + ", Authorities: "
                        + userDetails.getAuthorities());
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
        System.out.println("Extracting token from cookies...");
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            System.out.println("Cookies found: " + cookies.length);
            for (Cookie cookie : cookies) {
                System.out.println("Cookie name: " + cookie.getName() + ", value: " + cookie.getValue());
                if ("authToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        } else {
            System.out.println("No cookies found in request");
            // Fallback: Cookie-Header direkt prüfen
            String cookieHeader = request.getHeader("Cookie");
            System.out.println("Raw Cookie header: " + cookieHeader);
            if (cookieHeader != null && cookieHeader.contains("authToken=")) {
                String[] parts = cookieHeader.split(";");
                for (String part : parts) {
                    if (part.trim().startsWith("authToken=")) {
                        return part.trim().substring("authToken=".length());
                    }
                }
            }
        }
        return null;
    }
}
