import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { Card, Group, Tag } from "../data/types";
import Modal from "./Modal";
import CardForm from "./forms/CardForm";

type FlipCardProps = {
  card: Card;
  onRememberToggle: (cardId: string) => void;
  onRemove: () => void;
  onUpdate: (updatedCard: Card) => void;
  groups: Group[];
  cardTags: Tag[];
};

const FlipCard: React.FC<FlipCardProps> = ({
  card,
  onRememberToggle,
  onRemove,
  onUpdate,
  groups,
  cardTags,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { flipAllCards } = useAppContext();

  useEffect(() => {
    setIsFlipped(false);
  }, [flipAllCards]);

  useEffect(() => {
    if (card && card.questions && !isFlipped) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(
          (prevIndex) => (prevIndex + 1) % card.questions.length
        );
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFlipped, card]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRememberToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRememberToggle(card.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedCard: Omit<Card, "id">) => {
    onUpdate({ ...updatedCard, id: card.id });
    setIsEditModalOpen(false);
  };

  if (!card || !card.questions || card.questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <motion.div
        className="w-full max-w-[60vw] h-[50svh] aspect-[3/2] perspective-1000"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleFlip}
        >
          <div className="absolute w-full h-full backface-hidden">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-1/3 bg-gradient-to-r from-blue-400 to-blue-600" />
              <div className="p-6 flex flex-col justify-between h-2/3">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Question:
                  </h2>
                  <p className="text-xl text-gray-600">
                    {card.questions[currentQuestionIndex]}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col-reverse gap-2">
                    <div className="flex flex-wrap gap-2 w-96">
                      {card.tags?.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    {Array.isArray(card.groups) && (
                      <div className="flex flex-wrap gap-2 w-96">
                        {card.groups.map((group: Group) => (
                          <span
                            key={group.id}
                            className="w-fit bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
                          >
                            {group.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">Tap to reveal answer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-1/3 bg-gradient-to-r from-green-400 to-green-600" />
              <div className="p-6 flex flex-col justify-between h-2/3">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Answer:
                  </h2>
                  <p className="text-xl text-gray-600">{card.fact}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      handleRememberToggle(e);
                    }}
                    className={`px-4 py-2 rounded-full font-semibold text-white ${
                      card.remembered
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } transition-colors duration-300`}
                  >
                    {card.remembered ? "Forget" : "Remember"}
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                  >
                    Edit Card
                  </button>
                  <button
                    onClick={(e) => {
                      handleRemove(e);
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Modal
        isOpen={isEditModalOpen}
        isIncreasedContrast={true}
        onClose={() => setIsEditModalOpen(false)}
      >
        <h2 className="text-2xl font-bold mb-4 text-violet-900">Edit Card</h2>
        <CardForm
          onSubmit={handleUpdate}
          onUpdateCard={handleUpdate}
          groups={groups}
          tags={cardTags}
          card={card}
        />
      </Modal>
    </>
  );
};

export default FlipCard;
