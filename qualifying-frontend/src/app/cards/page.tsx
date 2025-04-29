import { Link } from "react-router-dom";

import CardForm from "src/components/forms/CardForm";
import { useAppContext } from "src/context";
import { Card } from "../../data/types";

export default function CardsPage() {
  const { cards, setCards, groups, tags } = useAppContext();

  const handleAddCard = (newCard: Omit<Card, "id">) => {
    const id = (cards.length + 1).toString();
    setCards([...cards, { ...newCard, id }]);
  };

  const handleUpdateCard = (updatedCard: Card) => {
    setCards(
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 px-96 pt-8">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Cards</h1>
      <Link
        to="/"
        className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-600 transition-colors duration-300"
      >
        Back to Flashcards
      </Link>
      <CardForm
        onSubmit={handleAddCard}
        groups={groups}
        tags={tags}
        onUpdateCard={handleUpdateCard}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Existing Cards</h2>
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-4 rounded-md shadow-md mb-4">
            <h3 className="font-bold">{card.questions[0]}</h3>
            <p>{card.fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
