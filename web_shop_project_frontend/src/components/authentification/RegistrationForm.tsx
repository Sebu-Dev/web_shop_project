import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRegister } from '@/hooks/useRegister';
import { Loader2 } from 'lucide-react';

interface RegistrationFormProps extends React.ComponentProps<'form'> {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

export function RegistrationForm({
  className,
  onSwitchToLogin,
  onClose,
  ...props
}: RegistrationFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useRegister();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError(null);

    if (password !== confirmPassword) {
      setRegistrationError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const user = {
      username,
      email,
      password,
      address,
      role: 'USER',
    };

    mutate(user, {
      onSuccess: () => {
        setIsLoading(false);
        onClose();
      },
      onError: (err) => {
        setIsLoading(false);
        const errorMessage =
          err instanceof Error ? err.message : 'Registration failed';
        setRegistrationError(errorMessage);
      },
    });
  };

  // Event-Listener für Enter und Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const form = document.querySelector('form');
        if (form) {
          form.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true })
          );
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="flex justify-center">
      <form
        className={cn(
          'relative flex w-full max-w-md flex-col gap-8 rounded-lg bg-white p-8 shadow-lg',
          className
        )}
        onSubmit={onSubmit}
        {...props}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          style={{ cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">
            Enter your details to create a new account
          </p>
        </div>

        {registrationError && (
          <div className="rounded-md bg-red-100 p-3 text-sm text-gray-700 text-red-700">
            {registrationError}
          </div>
        )}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username" className="font-medium text-gray-700">
              Username
            </Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              placeholder="Your username"
              required
              disabled={isLoading}
              className="rounded-md border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium text-gray-700">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
              className="rounded-md border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-medium text-gray-700">
              Password
            </Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
              disabled={isLoading}
              className="rounded-md border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="confirmPassword"
              className="font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              type="password"
              required
              disabled={isLoading}
              className="rounded-md border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address" className="font-medium text-gray-700">
              Address
            </Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              type="text"
              placeholder="Your address"
              required
              disabled={isLoading}
              className="rounded-md border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
