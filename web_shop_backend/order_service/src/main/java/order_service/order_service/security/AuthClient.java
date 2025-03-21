package order_service.order_service.security;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import order_service.order_service.dto.UserDetailsDTO;

public class AuthClient {
    private final RestTemplate restTemplate;
    private static final String USER_SERVICE_URL = "http://user-service:8001/api/users/validate";

    public AuthClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public UserDetailsDTO validateToken(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "authToken=" + token); // Token als Cookie senden
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<UserDetailsDTO> response = restTemplate.exchange(
                USER_SERVICE_URL,
                HttpMethod.POST,
                entity,
                UserDetailsDTO.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("Token validation failed");
        }
    }
}