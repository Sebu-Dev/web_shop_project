import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion";

export const ShoppingCartButton=() =>{
  return (
    <motion.div className="text-6xl"><ShoppingCart size={34}></ShoppingCart></motion.div>
  )
}

