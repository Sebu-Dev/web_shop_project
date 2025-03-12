import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <div id="contact" className="border-b border-neutral-900 pb-20">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-10 text-center text-4xl"
      >
        Get in Touch
      </motion.h2>
      <div className="text-center tracking-tighter flex flex-col">
        <motion.a
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.2, color: "#9A5BE1" }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="my-2"
          href="mailto:Niklas.Ganske@Volkswagen.de"
        >
          Niklas.Ganske@Volkswagen.de
        </motion.a>
        <motion.a
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.2, color: "#9A5BE1" }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="my-2"
          href="mailto:florian.Sebulke@Volkswagen.de"
        >
          Florian.Sebulke@Volkswagen.de
        </motion.a>
      </div>
    </div>
  );
};
