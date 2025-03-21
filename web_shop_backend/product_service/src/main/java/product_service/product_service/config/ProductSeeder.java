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
                laptop.setImage(
                        "https://media.medion.com/prod/medion/de_DE/0817/0814/0782/75245_E15433_G1_3000x3000_DE.png?imwidth=640");
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
                smartphone.setImage(
                        "https://media.mdm.klarmobil.de/a98e332cb9f84610693afb3bcb5b34f33f1bcd47/390x520/apple-iphone-16-pro-128-gb-titan-natur-linke-seite.webp");
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
                headphones.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_118737565?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402");
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
                tablet.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_135667258?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402");
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
                smartwatch.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144739615?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402");
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
                desktop.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_149884870?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                monitor.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_136003515?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                keyboard.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_98371777?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                mouse.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_146459924?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                hdd.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-79563029?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                usb.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_80965913?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                printer.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_145237565?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                webcam.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86675588?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                speaker.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_147504462?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                console.setName("Playstation 5 Console");
                console.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_145802561?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                tv.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_146559850?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                router.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_93151413?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                camera.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_148746345?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                drone.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_100477259?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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
                bulb.setImage(
                        "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_87998504?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320");
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