import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/ProcudtType';
import useCartStore from '@/store/ShoppingCartStore';


export const ShoppingCart: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Beispiel-Produkt zum Testen
  const sampleProduct: Product = {
    id: '1',
    name: 'Beispiel Produkt',
    image: 'https://via.placeholder.com/150',
    price: 29.99,
    onSale: true,
  };

  // Berechne den Gesamtpreis
  const totalPrice = cart.reduce((sum: number, item: Product) => {
    return item.quantity ? sum + item.price * item.quantity : sum;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Warenkorb</h1>

      {/* Button zum Testen */}
      <Button
        onClick={() => addToCart(sampleProduct)}
        className="mb-4 bg-blue-600 hover:bg-blue-700"
      >
        Beispielprodukt hinzufügen
      </Button>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Dein Warenkorb ist leer.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="w-full flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-l-md"
              />
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>
                    {item.name} {item.onSale && <span className="text-red-500">(Im Angebot)</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p>Preis: {item.price.toFixed(2)} €</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity || 1) - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity || 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
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
          <div className="flex justify-between items-center mt-6">
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

