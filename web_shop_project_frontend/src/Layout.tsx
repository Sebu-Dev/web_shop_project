import { useEffect } from 'react';
import { Navbar } from './components/navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Contact } from './components/Contact';
import { LoginPopup } from './components/LoginPopup'; // Add this import
import { UserButton } from './components/UserButton'; // Add if not in Navbar

interface LayoutProps {
  nav?: boolean;
  bgColor?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  nav = true,
  bgColor = 'bg-gray-900 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(75,85,99,0.4),rgba(17,24,39,0.1),rgba(255,255,255,0))]',
}: LayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const newPath = visibleSection.target.getAttribute('data-section');
          if (newPath) {
            navigate(newPath, { replace: true });
          }
        }
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigate]);

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div
          className={`absolute top-0 z-[-2] h-screen w-screen ${bgColor}`}
        ></div>
      </div>
      <div className="container mx-auto px-8">
        {nav && (
          <header>
            <Navbar />
          </header>
        )}
        <Outlet />
        <section id="contact">
          <Contact />
        </section>
        <LoginPopup />
      </div>
    </div>
  );
};
