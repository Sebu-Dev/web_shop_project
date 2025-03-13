import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/ProcudtType';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionCard = motion(Card);

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  function handleOnClick(): void {
    navigate(`/products/${product.id}`);
  }

  return (
    <MotionCard
      onClick={handleOnClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-neutral-100/80 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <CardHeader className="flex h-16">
        <CardTitle className="flex justify-between truncate">
          {product.name}
          {product.onSale && <Badge variant="destructive">Sale</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-md"
        />
        <p className="mt-2 text-lg font-bold">{product.price} €</p>
      </CardContent>
    </MotionCard>
  );
}
