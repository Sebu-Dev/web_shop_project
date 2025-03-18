package order_service.order_service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserServiceClient {

    private static final String USER_SERVICE_URL = "http://user-service:8001/api/users/validate";

    @Autowired
    private RestTemplate restTemplate;

    public UserDetailsResponse validateUser(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "authToken=" + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<UserDetailsResponse> response = restTemplate.exchange(
                    USER_SERVICE_URL,
                    HttpMethod.GET,
                    entity,
                    UserDetailsResponse.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Fehler beim Validieren des Tokens: " + e.getMessage());
            return null;
        }
    }
}

class UserDetailsResponse {
    private boolean valid;
    private String role;
    private String username;

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}