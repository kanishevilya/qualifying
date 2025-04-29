import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/cn";

interface ModalProps {
  isOpen: boolean;
  isIncreasedContrast?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  isIncreasedContrast = false,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={cn(
            !isIncreasedContrast ? "bg-white" : "bg-indigo-300",
            "p-6 rounded-lg shadow-xl max-w-md w-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
