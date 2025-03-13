import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PopupProps {
  children: ReactNode;
  bgColor?: string;
  zPositionBlur?: string;
  zPositionPopup?: string;
  className?: string;
  bgOpacity?: string;
  backdropBlur?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({
  children,
  bgColor = '',
  bgOpacity = 'bg-opacity-10',
  zPositionBlur = 'z-10',
  zPositionPopup = 'z-20',
  backdropBlur = 'backdrop-blur-sm',
  className = '',
  isOpen,
  onClose,
}: PopupProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center p-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hintergrund, der das Popup überlagert */}
      <motion.div
        className={`absolute inset-0 bg-slate-500/20 ${bgOpacity} ${backdropBlur} ${zPositionBlur}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose} // Schließt das Popup bei Klick auf den Hintergrund
      ></motion.div>

      {/* Popup-Inhalt, Breite auf Formulargröße beschränkt */}
      <motion.div
        className={`relative overflow-y-auto ${zPositionPopup} ${bgColor} ${className} mx-auto max-h-screen max-w-md`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Verhindert Schließen bei Klick im Formular
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
