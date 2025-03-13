import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

function GithubLink() {
  return (
    <motion.a
      whileHover={{ scale: 1.1, backgroundColor: '#333' }}
      whileTap={{ scale: 0.9 }}
      href="https://github.com/Sebu-Dev"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white shadow-lg transition-all lg:h-12 lg:w-auto"
    >
      <FaGithub size={24} />
      <span className="text-sm">GitHub</span>
    </motion.a>
  );
}

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

      <div className="flex flex-col items-center text-center tracking-tighter">
        {/* E-Mail Links */}
        <motion.a
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, color: '#9A5BE1' }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="my-2 text-lg"
          href="mailto:Niklas.Ganske@Volkswagen.de"
        >
          Niklas.Ganske@Volkswagen.de
        </motion.a>

        <motion.a
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, color: '#9A5BE1' }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="my-2 text-lg"
          href="mailto:florian.Sebulke@Volkswagen.de"
        >
          Florian.Sebulke@Volkswagen.de
        </motion.a>

        {/* GitHub Button */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mt-4"
        >
          <GithubLink />
        </motion.div>
      </div>
    </div>
  );
};
