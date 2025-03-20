import useCartStore from '@/store/useShoppingCartStore';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/Routes';
import { calculateOrder } from '@/utils/OrderCalculator';

export const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  const { subtotalBrutto, mwstAmount, totalWithShipping } =
    calculateOrder(cart);

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Warenkorb</h1>

      {cart.length === 0 ? (
        <p className="b text-center text-gray-500 backdrop-blur-3xl">
          Dein Warenkorb ist leer.
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <Card key={item.id} className="flex w-full items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-l-md object-cover"
              />
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>
                    {item.name}{' '}
                    {item.onSale && (
                      <span className="text-teal-600">(Im Angebot)</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-6">
                    <p>Preis: {item.price.toFixed(2)} €</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-300 text-black hover:bg-blue-50"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity || 1) - 1
                          )
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity || 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-300 text-black hover:bg-blue-50"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 0) + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                    onClick={() => removeFromCart(item.id)}
                  >
                    × Entfernen
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}

          <div className="mt-8 flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Zwischensumme: {subtotalBrutto.toFixed(2)} €
              </p>
              <p className="text-sm text-gray-600">
                MwSt. (19%): {mwstAmount.toFixed(2)} €
              </p>
              <p className="text-sm text-gray-600">Versandkosten: 5.99 €</p>
              <p className="text-xl font-semibold text-neutral-300">
                Gesamt: {totalWithShipping.toFixed(2)} €
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="default"
                className="bg-cyan-900 text-neutral-200 hover:bg-cyan-700"
                onClick={clearCart}
              >
                Warenkorb leeren
              </Button>
              <Button
                variant="default"
                className="bg-teal-600 text-white hover:bg-teal-700"
                onClick={handleCheckout}
              >
                Zur Kasse
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
