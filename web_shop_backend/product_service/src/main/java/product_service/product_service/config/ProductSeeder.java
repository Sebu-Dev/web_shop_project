package product_service.product_service.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import product_service.product_service.entity.Product;
import product_service.product_service.repository.ProductRepository;

@Configuration
public class ProductSeeder {

    private static final Logger logger = LoggerFactory.getLogger(ProductSeeder.class);

    @Bean
    public CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            logger.info("Starte Product-Seeding...");

            // Produkt 1: Laptop
            if (productRepository.findByName("Laptop").isEmpty()) {
                Product laptop = new Product();
                laptop.setName("Laptop");
                laptop.setImage("laptop.jpg");
                laptop.setPrice(999.99);
                laptop.setOnSale(false);
                laptop.setDescription("High-end Laptop");
                productRepository.save(laptop);
                logger.info("Produkt Laptop erstellt mit ID: {}", laptop.getId());
            } else {
                logger.info("Produkt Laptop existiert bereits");
            }

            // Produkt 2: Smartphone
            if (productRepository.findByName("Smartphone").isEmpty()) {
                Product smartphone = new Product();
                smartphone.setName("Smartphone");
                smartphone.setImage("smartphone.jpg");
                smartphone.setPrice(599.99);
                smartphone.setOnSale(false);
                smartphone.setDescription("Latest Smartphone");
                productRepository.save(smartphone);
                logger.info("Produkt Smartphone erstellt mit ID: {}", smartphone.getId());
            } else {
                logger.info("Produkt Smartphone existiert bereits");
            }

            // Produkt 3: Headphones
            if (productRepository.findByName("Headphones").isEmpty()) {
                Product headphones = new Product();
                headphones.setName("Headphones");
                headphones.setImage("headphones.jpg");
                headphones.setPrice(199.99);
                headphones.setOnSale(false);
                headphones.setDescription("Noise-cancelling Headphones");
                productRepository.save(headphones);
                logger.info("Produkt Headphones erstellt mit ID: {}", headphones.getId());
            } else {
                logger.info("Produkt Headphones existiert bereits");
            }

            // Produkt 4: Tablet
            if (productRepository.findByName("Tablet").isEmpty()) {
                Product tablet = new Product();
                tablet.setName("Tablet");
                tablet.setImage("tablet.jpg");
                tablet.setPrice(399.99);
                tablet.setOnSale(false);
                tablet.setDescription("Lightweight Tablet");
                productRepository.save(tablet);
                logger.info("Produkt Tablet erstellt mit ID: {}", tablet.getId());
            } else {
                logger.info("Produkt Tablet existiert bereits");
            }

            // Produkt 5: Smartwatch
            if (productRepository.findByName("Smartwatch").isEmpty()) {
                Product smartwatch = new Product();
                smartwatch.setName("Smartwatch");
                smartwatch.setImage("smartwatch.jpg");
                smartwatch.setPrice(249.99);
                smartwatch.setOnSale(false);
                smartwatch.setDescription("Fitness Tracking Smartwatch");
                productRepository.save(smartwatch);
                logger.info("Produkt Smartwatch erstellt mit ID: {}", smartwatch.getId());
            } else {
                logger.info("Produkt Smartwatch existiert bereits");
            }

            // Produkt 6: Desktop PC
            if (productRepository.findByName("Desktop PC").isEmpty()) {
                Product desktop = new Product();
                desktop.setName("Desktop PC");
                desktop.setImage("desktop.jpg");
                desktop.setPrice(1499.99);
                desktop.setOnSale(false);
                desktop.setDescription("Powerful Desktop PC");
                productRepository.save(desktop);
                logger.info("Produkt Desktop PC erstellt mit ID: {}", desktop.getId());
            } else {
                logger.info("Produkt Desktop PC existiert bereits");
            }

            // Produkt 7: Monitor
            if (productRepository.findByName("Monitor").isEmpty()) {
                Product monitor = new Product();
                monitor.setName("Monitor");
                monitor.setImage("monitor.jpg");
                monitor.setPrice(299.99);
                monitor.setOnSale(false);
                monitor.setDescription("4K Ultra HD Monitor");
                productRepository.save(monitor);
                logger.info("Produkt Monitor erstellt mit ID: {}", monitor.getId());
            } else {
                logger.info("Produkt Monitor existiert bereits");
            }

            // Produkt 8: Keyboard
            if (productRepository.findByName("Keyboard").isEmpty()) {
                Product keyboard = new Product();
                keyboard.setName("Keyboard");
                keyboard.setImage("keyboard.jpg");
                keyboard.setPrice(89.99);
                keyboard.setOnSale(false);
                keyboard.setDescription("Mechanical Keyboard");
                productRepository.save(keyboard);
                logger.info("Produkt Keyboard erstellt mit ID: {}", keyboard.getId());
            } else {
                logger.info("Produkt Keyboard existiert bereits");
            }

            // Produkt 9: Mouse
            if (productRepository.findByName("Mouse").isEmpty()) {
                Product mouse = new Product();
                mouse.setName("Mouse");
                mouse.setImage("mouse.jpg");
                mouse.setPrice(49.99);
                mouse.setOnSale(false);
                mouse.setDescription("Ergonomic Wireless Mouse");
                productRepository.save(mouse);
                logger.info("Produkt Mouse erstellt mit ID: {}", mouse.getId());
            } else {
                logger.info("Produkt Mouse existiert bereits");
            }

            // Produkt 10: External Hard Drive
            if (productRepository.findByName("External Hard Drive").isEmpty()) {
                Product hdd = new Product();
                hdd.setName("External Hard Drive");
                hdd.setImage("hdd.jpg");
                hdd.setPrice(129.99);
                hdd.setOnSale(false);
                hdd.setDescription("2TB External Hard Drive");
                productRepository.save(hdd);
                logger.info("Produkt External Hard Drive erstellt mit ID: {}", hdd.getId());
            } else {
                logger.info("Produkt External Hard Drive existiert bereits");
            }

            // Produkt 11: USB Stick
            if (productRepository.findByName("USB Stick").isEmpty()) {
                Product usb = new Product();
                usb.setName("USB Stick");
                usb.setImage("usb.jpg");
                usb.setPrice(19.99);
                usb.setOnSale(false);
                usb.setDescription("64GB USB 3.0 Stick");
                productRepository.save(usb);
                logger.info("Produkt USB Stick erstellt mit ID: {}", usb.getId());
            } else {
                logger.info("Produkt USB Stick existiert bereits");
            }

            // Produkt 12: Printer
            if (productRepository.findByName("Printer").isEmpty()) {
                Product printer = new Product();
                printer.setName("Printer");
                printer.setImage("printer.jpg");
                printer.setPrice(179.99);
                printer.setOnSale(false);
                printer.setDescription("All-in-One Printer");
                productRepository.save(printer);
                logger.info("Produkt Printer erstellt mit ID: {}", printer.getId());
            } else {
                logger.info("Produkt Printer existiert bereits");
            }

            // Produkt 13: Webcam
            if (productRepository.findByName("Webcam").isEmpty()) {
                Product webcam = new Product();
                webcam.setName("Webcam");
                webcam.setImage("webcam.jpg");
                webcam.setPrice(79.99);
                webcam.setOnSale(false);
                webcam.setDescription("1080p HD Webcam");
                productRepository.save(webcam);
                logger.info("Produkt Webcam erstellt mit ID: {}", webcam.getId());
            } else {
                logger.info("Produkt Webcam existiert bereits");
            }

            // Produkt 14: Speaker
            if (productRepository.findByName("Speaker").isEmpty()) {
                Product speaker = new Product();
                speaker.setName("Speaker");
                speaker.setImage("speaker.jpg");
                speaker.setPrice(149.99);
                speaker.setOnSale(false);
                speaker.setDescription("Bluetooth Speaker");
                productRepository.save(speaker);
                logger.info("Produkt Speaker erstellt mit ID: {}", speaker.getId());
            } else {
                logger.info("Produkt Speaker existiert bereits");
            }

            // Produkt 15: Gaming Console
            if (productRepository.findByName("Gaming Console").isEmpty()) {
                Product console = new Product();
                console.setName("Gaming Console");
                console.setImage("console.jpg");
                console.setPrice(499.99);
                console.setOnSale(false);
                console.setDescription("Next-Gen Gaming Console");
                productRepository.save(console);
                logger.info("Produkt Gaming Console erstellt mit ID: {}", console.getId());
            } else {
                logger.info("Produkt Gaming Console existiert bereits");
            }

            // Produkt 16: TV
            if (productRepository.findByName("TV").isEmpty()) {
                Product tv = new Product();
                tv.setName("TV");
                tv.setImage("tv.jpg");
                tv.setPrice(799.99);
                tv.setOnSale(false);
                tv.setDescription("55-inch 4K Smart TV");
                productRepository.save(tv);
                logger.info("Produkt TV erstellt mit ID: {}", tv.getId());
            } else {
                logger.info("Produkt TV existiert bereits");
            }

            // Produkt 17: Router
            if (productRepository.findByName("Router").isEmpty()) {
                Product router = new Product();
                router.setName("Router");
                router.setImage("router.jpg");
                router.setPrice(99.99);
                router.setOnSale(false);
                router.setDescription("Wi-Fi 6 Router");
                productRepository.save(router);
                logger.info("Produkt Router erstellt mit ID: {}", router.getId());
            } else {
                logger.info("Produkt Router existiert bereits");
            }

            // Produkt 18: Camera
            if (productRepository.findByName("Camera").isEmpty()) {
                Product camera = new Product();
                camera.setName("Camera");
                camera.setImage("camera.jpg");
                camera.setPrice(699.99);
                camera.setOnSale(false);
                camera.setDescription("Mirrorless Digital Camera");
                productRepository.save(camera);
                logger.info("Produkt Camera erstellt mit ID: {}", camera.getId());
            } else {
                logger.info("Produkt Camera existiert bereits");
            }

            // Produkt 19: Drone
            if (productRepository.findByName("Drone").isEmpty()) {
                Product drone = new Product();
                drone.setName("Drone");
                drone.setImage("drone.jpg");
                drone.setPrice(399.99);
                drone.setOnSale(false);
                drone.setDescription("4K Camera Drone");
                productRepository.save(drone);
                logger.info("Produkt Drone erstellt mit ID: {}", drone.getId());
            } else {
                logger.info("Produkt Drone existiert bereits");
            }

            // Produkt 20: Smart Bulb
            if (productRepository.findByName("Smart Bulb").isEmpty()) {
                Product bulb = new Product();
                bulb.setName("Smart Bulb");
                bulb.setImage("smart_bulb.jpg");
                bulb.setPrice(29.99);
                bulb.setOnSale(false);
                bulb.setDescription("Wi-Fi Smart LED Bulb");
                productRepository.save(bulb);
                logger.info("Produkt Smart Bulb erstellt mit ID: {}", bulb.getId());
            } else {
                logger.info("Produkt Smart Bulb existiert bereits");
            }

            logger.info("Product-Seeding abgeschlossen");
        };
    }
}