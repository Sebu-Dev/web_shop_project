import { useUserSession } from '@/store/UserSessionStore';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useLoginPopup } from '@/store/LoginPopupStore';
import { Input } from '../ui/input';
import { ChangeEvent, useState } from 'react';
import { Label } from '../ui/label';
import { UserIcon } from 'lucide-react';
import { FormErrors } from '@/types/Erorrs';
import { UpdateUserType } from '@/types/User';

export const EditUserProfile = () => {
  const { user, updateUser } = useUserSession();
  const { showLogin } = useLoginPopup();
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    newUsername: user?.username || '',
    newEmail: user?.email || '',
    confirmEmail: '',
    newAddress: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    const newErrors: FormErrors = {};

    // Benutzername Validierung
    if (!formData.newUsername) {
      newErrors.username = 'Benutzername ist erforderlich.';
    }

    // E-Mail Validierung
    if (formData.newEmail !== formData.confirmEmail) {
      newErrors.email = 'E-Mail-Adressen stimmen nicht überein.';
      newErrors.confirmEmail = 'E-Mail-Adressen stimmen nicht überein.';
    }

    // Passwort Validierung
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.newPassword = 'Passwörter stimmen nicht überein.';
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein.';
    }

    if (formData.newPassword && !formData.currentPassword) {
      newErrors.currentPassword = 'Bitte aktuelles Passwort eingeben.';
    }

    // Adresse Validierung
    if (!formData.newAddress) {
      newErrors.address = 'Adresse ist erforderlich.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Erfolgreich speichern
    try {
      updateUser({ ...formData });

      setErrors({});
    } catch {
      console.log('');
    }
  };
  const createUpdateUser = () => {
    const newUser: UpdateUserType = { address = newAddress };
  };
  return (
    <>
      {user === null ? (
        <Card className="text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">
              Profilübersicht
            </CardTitle>
          </CardHeader>
          <CardContent className="py-12">
            <UserIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p className="mb-4 text-lg text-gray-600">
              Bitte loggen Sie sich ein, um Ihr Profil anzuzeigen.
            </p>
            <Button
              variant="default"
              onClick={showLogin} // Trigger login popup
              className="w-full md:w-auto"
            >
              Zum Login
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-2xl md:text-3xl">
                Profil bearbeiten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Benutzername */}
                <div className="space-y-2">
                  <Label htmlFor="username">Benutzername</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.newUsername}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">{errors.username}</p>
                  )}
                </div>
                {/* Adresse */}
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.newAddress}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* E-Mail ändern */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Neue E-Mail</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.newEmail}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">E-Mail bestätigen</Label>
                  <Input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                  />
                  {errors.confirmEmail && (
                    <p className="text-sm text-red-500">
                      {errors.confirmEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Passwort ändern */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                  {errors.currentPassword && (
                    <p className="text-sm text-red-500">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Neues Passwort</Label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-500">{errors.newPassword}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword">
                    Neues Passwort bestätigen
                  </Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">Abbrechen</Button>
                <Button variant="default" onClick={handleSave}>
                  Speichern
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
