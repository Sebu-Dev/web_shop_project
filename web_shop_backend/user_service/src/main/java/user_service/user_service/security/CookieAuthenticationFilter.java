package user_service.user_service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class CookieAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public CookieAuthenticationFilter(UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
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
                        // Validiere JWT und extrahiere Benutzername
                        String username = jwtUtil.extractUsername(token);
                        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                            if (jwtUtil.validateToken(token, userDetails)) {
                                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                                SecurityContextHolder.getContext().setAuthentication(authToken);
                            }
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