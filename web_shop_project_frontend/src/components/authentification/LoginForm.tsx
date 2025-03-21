import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { Loader2 } from 'lucide-react';

interface LoginFormProps extends React.ComponentProps<'form'> {
  onSwitchToRegister: () => void;
  onClose: () => void;
}

export function LoginForm({
  className,
  onSwitchToRegister,
  onClose,
  ...props
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Ladezustand hinzufügen
  const { mutate } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true); // Ladezustand aktivieren
    const credentials = {
      username,
      password,
    };
    mutate(credentials, {
      onSuccess: () => {
        setIsLoading(false); // Ladezustand beenden
        onClose(); // Schließt Popup nur bei Erfolg
      },
      onError: (err) => {
        setIsLoading(false); // Ladezustand beenden
        const errorMessage =
          err instanceof Error ? err.message : 'Login fehlgeschlagen';
        setLoginError(errorMessage);
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
            Login to Your Account
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">
            Enter your username and password to access your account
          </p>
        </div>

        {loginError && (
          <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
            {loginError}
          </div>
        )}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username" className="font-medium text-gray-700">
              Username
            </Label>
            <Input
              value={username}
              id="username"
              type="text"
              placeholder="yourusername"
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading} // Eingabe während Ladevorgang deaktivieren
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-medium text-gray-700">
                Password
              </Label>
              <a
                href="#"
                className="text-sm text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
              disabled={isLoading} // Eingabe während Ladevorgang deaktivieren
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
            disabled={isLoading} // Button während Ladevorgang deaktivieren
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          <span className="text-gray-500">Don’t have an account? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            disabled={isLoading} // Button während Ladevorgang deaktivieren
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
