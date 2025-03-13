import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['login'], queryFn: getTodos });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {};
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
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-px bg-gray-200"></div>
            <span className="relative bg-white px-4 text-sm text-gray-500">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-md border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
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
