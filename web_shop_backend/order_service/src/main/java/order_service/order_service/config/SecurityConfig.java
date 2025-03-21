package order_service.order_service.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import order_service.order_service.security.AuthClient;
import order_service.order_service.security.JwtValidationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public RestTemplate restTemplate() {
                return new RestTemplate();
        }

        @Bean
        public AuthClient authClient(RestTemplate restTemplate) {
                return new AuthClient(restTemplate);
        }

        @Bean
        public JwtValidationFilter jwtValidationFilter(AuthClient authClient) {
                return new JwtValidationFilter(authClient);
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(HttpMethod.GET, "/api/orders/**").authenticated()
                                                .requestMatchers(HttpMethod.POST, "/api/orders/**").authenticated()
                                                // .requestMatchers("/api/orders/**").hasRole("ADMIN")
                                                .anyRequest().permitAll())
                                .addFilterBefore(jwtValidationFilter(authClient(restTemplate())),
                                                UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList(
                                "http://localhost:5173"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                configuration.setAllowedHeaders(Arrays.asList("*"));
                configuration.setAllowCredentials(true);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}