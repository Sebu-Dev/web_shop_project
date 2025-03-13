import useCartStore from '@/store/ShoppingCartStore';
import { Product } from '@/types/ProductType';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';

export const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Berechne den Gesamtpreis
  const totalPrice = cart.reduce((sum: number, item: Product) => {
    // Wenn quantity nicht definiert, setze sie auf 1
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Warenkorb</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Dein Warenkorb ist leer.</p>
      ) : (
        <div className="space-y-4">
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
                      <span className="text-red-500">(Im Angebot)</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p>Preis: {item.price.toFixed(2)} €</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
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
                    variant="destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Entfernen
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}

          {/* Gesamtpreis und Warenkorb leeren */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xl font-semibold">
              Gesamt: {totalPrice.toFixed(2)} €
            </p>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={clearCart}
            >
              Warenkorb leeren
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
