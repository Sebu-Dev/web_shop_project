import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { products } from '@/data/ProductDummyData';
import useCartStore from '@/store/ShoppingCartStore';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Finde das Produkt anhand der ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Produkt nicht gefunden</div>; // Fehlerbehandlung, falls das Produkt nicht existiert
  }

  // Funktion zum Hinzufügen des Produkts zum Warenkorb
  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Produkt mit der angegebenen Menge in den Warenkorb legen
  };

  return (
    <div className="flex flex-col items-center p-4">
      <motion.img
        src={product.image}
        alt={product.name}
        className="h-64 w-64 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h1 className="mt-4 text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-neutral-600">{product.description}</p>
      <span className="mt-2 text-lg font-semibold text-blue-500">
        {product.price} €
      </span>

      {/* Anzahl Auswahl */}
      <div className="mt-4 flex items-center">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="rounded-l-md bg-slate-800/50 px-4 py-2 text-xl hover:bg-slate-800/90"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
          className="w- bg-slate-800/50 py-2 text-center text-xl hover:bg-slate-800/90"
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-r-md bg-slate-800/50 px-4 py-2 text-xl hover:bg-slate-800/90"
        >
          +
        </button>
      </div>

      <motion.button
        onClick={handleAddToCart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.01 }}
        className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md hover:bg-blue-700"
      >
        In den Warenkorb
      </motion.button>
    </div>
  );
}

export default ProductDetails;
