package product_service.product_service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserServiceClient userServiceClient;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // GET-Endpunkte für USER und ADMIN
                        .requestMatchers("/api/products", "/api/products/pagination", "/api/products/{id}")
                        .hasAnyRole("USER", "ADMIN")
                        // POST, PUT, DELETE nur für ADMIN
                        .requestMatchers("/api/products/**")
                        .hasRole("ADMIN")
                        // Alle anderen Anfragen erfordern Authentifizierung
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthenticationFilter(userServiceClient),
                        UsernamePasswordAuthenticationFilter.class)
                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }

}