package product_service.product_service.security;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import product_service.product_service.dto.UserDetailsDTO;

public class AuthClient {
    private final RestTemplate restTemplate;
    private final String userServiceUrl = "http://localhost:8001/api/users/validate";

    public AuthClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("null")
    public UserDetailsDTO validateToken(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<UserDetailsDTO> response = restTemplate.exchange(
                    userServiceUrl,
                    HttpMethod.POST,
                    entity,
                    UserDetailsDTO.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                UserDetailsDTO userDetails = response.getBody();
                System.out.println("Validated user: " + userDetails.getUsername() + ", authorities: "
                        + userDetails.getAuthorities());
                return userDetails;
            } else {
                throw new RuntimeException("Token validation failed with status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Error validating token: " + e.getMessage());
            throw new RuntimeException("Token validation error", e);
        }
    }
}
