import { Logo } from '../../logo/Logo';
import { HomeButton } from './HomeButton';
import { LoginButton } from './LoginButton';
import { ShoppingCartButton } from './ShoppingCartButton';

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className=".navbar flex items-center justify-between py-3">
      <div className="flex flex-shrink-0 items-center">
        <Logo />
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-2xl lg:m-8">
        {children && (
          <div className="flex items-center">
            {children} {/* you can add more icons here*/}
          </div>
        )}
        <ShoppingCartButton></ShoppingCartButton>
        <HomeButton></HomeButton>
        <LoginButton></LoginButton>
      </div>
    </nav>
  );
};
