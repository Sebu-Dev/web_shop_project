import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useRegister } from '@/hooks/useRegister';
import { UserType } from '@/types/User';

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
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const { mutate } = useRegister();

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Create the user object
    const user: UserType = {
      id: 0,
      name: userName,
      email: email,
      adress: address,
    };

    // Call the mutation function
    mutate(user);
  };

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
            Create Your Account
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">
            Enter your details to create a new account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username" className="font-medium text-gray-700">
              Username
            </Label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              type="text"
              placeholder="Your username"
              required
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Neue Felder für Adresse und Rolle */}
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
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Sign Up
          </Button>
        </div>
        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
