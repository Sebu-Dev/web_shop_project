import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate } = useLogin();
  const onSubmit = () => {
    const credentials = {
      username: email,
      password,
    };
    mutate(credentials);
  };
  return (
    <div className="flex justify-center">
      <form
        className={cn(
          'relative flex w-full max-w-md flex-col gap-8 rounded-lg bg-white p-8 shadow-lg',
          className
        )}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Login submitted');
          onClose();
        }}
        {...props}
      >
        {/* Schließen-Button oben rechts im Formular */}
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
            Enter your email and password to access your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium text-gray-700">
              Email
            </Label>
            <Input
              value={email}
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              required
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            onClick={onSubmit}
            className="w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Login
          </Button>
        </div>
        <div className="text-center text-sm">
          <span className="text-gray-500">Don’t have an account? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
