import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/ProcudtType";
import { motion } from "framer-motion";

const MotionCard = motion(Card); // Motion-Version der Card

export function ProductCard({ product }: { product: Product }) {
  return (
    <MotionCard
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-rows-subgrid row-span-2 group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-100"
    >
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        {product.onSale && <Badge variant="destructive">Sale</Badge>}
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="rounded-md w-full" />
        <p className="text-lg font-bold mt-2">{product.price} €</p>
      </CardContent>
    </MotionCard>
  );
}
