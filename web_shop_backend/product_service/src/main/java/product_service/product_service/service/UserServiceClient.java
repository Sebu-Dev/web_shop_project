package product_service.product_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import product_service.product_service.config.UserDetailsResponse;

@Component
public class UserServiceClient {

    private static final String USER_SERVICE_URL = "http://user-service:8001/api/users/validate";

    @Autowired
    private RestTemplate restTemplate;

    public UserDetailsResponse validateUser(String username, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(username, password);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<UserDetailsResponse> response = restTemplate.exchange(
                    USER_SERVICE_URL,
                    HttpMethod.GET,
                    entity,
                    UserDetailsResponse.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Fehler beim Validieren des Benutzers: " + e.getMessage());
            return null; // Invalid credentials
        }
    }
}