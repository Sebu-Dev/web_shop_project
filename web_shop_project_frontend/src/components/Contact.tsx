import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

interface ContactLinkProps {
  email: string;
  githubUrl: string;
}

const ContactLink = ({ email, githubUrl }: ContactLinkProps) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      className="my-4 flex items-center justify-center gap-4"
    >
      <motion.a
        whileHover={{ scale: 1.03 }}
        className="text-lg"
        href={`mailto:${email}`}
      >
        {email}
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.1, backgroundColor: '#333' }}
        whileTap={{ scale: 0.9 }}
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 rounded-full bg-black px-3 py-1 text-white shadow-lg transition-all"
      >
        <FaGithub size={16} />
      </motion.a>
    </motion.div>
  );
};

export const Contact = () => {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-neutral-900 bg-gray-900 py-8 text-neutral-300"
    >
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center text-4xl"
      >
        Get in Touch
      </motion.h2>

      <div className="flex flex-col items-center text-center tracking-tighter">
        <ContactLink
          email="Niklas.Ganske@Volkswagen.de"
          githubUrl="https://github.com/NiklasGanske"
        />
        <ContactLink
          email="Florian.Sebulke@Volkswagen.de"
          githubUrl="https://github.com/Sebu-Dev"
        />
      </div>
    </footer>
  );
};
