import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../data/types";

interface SmallCardProps {
  card: Card;
  onRememberToggle: (cardId: string) => void;
}

const SmallCard: React.FC<SmallCardProps> = ({ card, onRememberToggle }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="w-64 h-40 perspective-1000" onClick={handleFlip}>
      <motion.div
        className="relative w-full h-full transition-all duration-100 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <h3 className="font-bold text-lg">{card.questions[0]}</h3>
            <p className="text-sm text-gray-500">Click to flip</p>
          </div>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <p className="text-sm">{card.fact}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRememberToggle(card.id);
              }}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                card.remembered
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {card.remembered ? "Forget" : "Remember"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SmallCard;
