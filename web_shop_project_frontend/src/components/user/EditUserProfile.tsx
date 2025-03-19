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
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { Skeleton } from '../ui/skeleton';

export const EditUserProfile = () => {
  // ÄNDERUNG: isPending statt isLoading verwenden
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { user } = useUserSession();
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

  const handleSave = async () => {
    const newErrors: FormErrors = {};

    if (!formData.newUsername) {
      newErrors.username = 'Benutzername ist erforderlich.';
    }

    if (formData.newEmail !== formData.confirmEmail) {
      newErrors.email = 'E-Mail-Adressen stimmen nicht überein.';
      newErrors.confirmEmail = 'E-Mail-Adressen stimmen nicht überein.';
    }

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

    if (!formData.newAddress) {
      newErrors.address = 'Adresse ist erforderlich.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (user === null) {
        alert('user nicht vorhanden');
        return;
      }

      const updatedUser: UpdateUserType = {
        id: user.id,
        address:
          formData.newAddress !== '' ? formData.newAddress : user.address,
        email: formData.newEmail !== '' ? formData.newEmail : user.email,
        username:
          formData.newUsername !== '' ? formData.newUsername : user.username,
        newPassword: formData.newPassword !== '' ? formData.newPassword : '',
        currentPassword:
          formData.currentPassword !== '' ? formData.currentPassword : '',
      };

      updateUser(updatedUser);
      setErrors({});
    } catch {
      console.log('');
    }
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
              onClick={showLogin}
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
              {/* ÄNDERUNG: isPending statt isLoading verwenden */}
              {isPending ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full md:col-span-2" />
                  <div className="flex justify-end gap-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Benutzername</Label>
                      <Input
                        id="username"
                        name="newUsername"
                        value={formData.newUsername}
                        onChange={handleChange}
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500">
                          {errors.username}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="newAddress"
                        value={formData.newAddress}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Neue E-Mail</Label>
                      <Input
                        type="email"
                        id="email"
                        name="newEmail"
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

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">
                        Aktuelles Passwort
                      </Label>
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
                        <p className="text-sm text-red-500">
                          {errors.newPassword}
                        </p>
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

                  <div className="flex justify-end gap-4">
                    <Button variant="outline">Abbrechen</Button>
                    <Button variant="default" onClick={handleSave}>
                      Speichern
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
