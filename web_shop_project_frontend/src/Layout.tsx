import { Navbar } from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Contact } from './components/Contact';
import { LoginForm } from './components/authentification/LoginForm';
import { RegistrationForm } from './components/authentification/RegistrationForm';
import { Popup } from './components/ui-components/Popup';
import { useLoginPopup } from './store/LoginPopupStore';

interface LayoutProps {
  nav?: boolean;
  bgColor?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  nav = true,
  bgColor = 'bg-gray-900 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(75,85,99,0.4),rgba(17,24,39,0.1),rgba(255,255,255,0))]',
}: LayoutProps) => {
  const { isPopupOpen, isLogin, closePopup, switchToRegister, switchToLogin } =
    useLoginPopup();

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
        <Popup isOpen={isPopupOpen} onClose={closePopup}>
          {isLogin ? (
            <LoginForm
              onSwitchToRegister={switchToRegister}
              onClose={closePopup}
            />
          ) : (
            <RegistrationForm
              onSwitchToLogin={switchToLogin}
              onClose={closePopup}
            />
          )}
        </Popup>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
};
