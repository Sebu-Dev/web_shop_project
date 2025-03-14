package product_service.product_service.config;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import product_service.product_service.service.UserServiceClient;

import java.io.IOException;
import java.util.Collections;

public class CustomBasicAuthenticationFilter extends BasicAuthenticationFilter {

    private final UserServiceClient userServiceClient;

    public CustomBasicAuthenticationFilter(UserServiceClient userServiceClient) {
        super(authenticationManager -> null); // Wir überschreiben die Standardauthentifizierung
        this.userServiceClient = userServiceClient;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Basic ")) {
            String base64Credentials = authHeader.substring("Basic ".length()).trim();
            String credentials = new String(java.util.Base64.getDecoder().decode(base64Credentials));
            String[] usernamePassword = credentials.split(":", 2);

            if (usernamePassword.length == 2) {
                String username = usernamePassword[0];
                String password = usernamePassword[1];

                try {
                    UserDetailsResponse userDetails = userServiceClient.validateUser(username, password);
                    if (userDetails != null && userDetails.isValid()) {
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                username,
                                null, // Passwort wird nicht weiter verwendet
                                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userDetails.getRole())));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                } catch (Exception e) {
                    SecurityContextHolder.clearContext();
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed: " + e.getMessage());
                    return;
                }
            }
        }

        chain.doFilter(request, response);
    }
}