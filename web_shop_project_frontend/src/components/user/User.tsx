import { useUserSession } from '@/store/useUserSessionStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon, LogOut, Edit, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLoginPopup } from '@/store/useLoginPopupStore';

export const User = () => {
  const { user, logout } = useUserSession();
  const { showLogin } = useLoginPopup();

  const handleLogoutClick = () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {user ? (
        <Card className="shadow-lg">
          <CardHeader className="border«Eb bg-gray-50">
            <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
              <UserIcon className="h-6 w-6 text-teal-500" />
              Profilübersicht
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Benutzername</p>
                <p className="text-lg font-medium">{user.username}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">E-Mail</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="text-lg font-medium">
                  {user.address || 'Keine Adresse angegeben'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <Button
                variant="outline"
                asChild
                className="flex w-full items-center gap-2 md:w-auto"
              >
                <Link to="/user/edit">
                  <Edit className="h-4 w-4" /> Profil bearbeiten
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex w-full items-center gap-2 md:w-auto"
              >
                <Link to="/user/orders">
                  <Package className="h-4 w-4" /> Bestellverlauf
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogoutClick}
                className="flex w-full items-center gap-2 md:w-auto"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
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
      )}
    </div>
  );
};
