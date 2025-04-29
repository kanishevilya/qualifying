import React, { useState } from "react";
import { Card, Group, Tag } from "src/data/types";

type CardFormProps = {
  onSubmit: (card: Omit<Card, "id">) => void;
  onUpdateCard: (card: Card) => void;
  groups: Group[];
  tags: Tag[];
  card?: Card;
};

const CardForm: React.FC<CardFormProps> = ({
  onSubmit,
  onUpdateCard,
  groups,
  tags,
  card,
}) => {
  const [question, setQuestion] = useState(card?.questions[0] || "");
  const [fact, setFact] = useState(card?.fact || "");
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>(
    card?.groupIds || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    card?.tags.map((t: Tag) => t.id) || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCard = {
      id: card?.id,
      questions: [question],
      fact,
      groupIds: selectedGroupIds,
      groups: selectedGroupIds
        .map((id: string) => groups.find((g) => g.id == id))
        .filter((group): group is Group => group !== undefined),
      tags: tags.filter((t) => selectedTags.includes(t.id)),
      remembered: card?.remembered || false,
    };
    if (card) {
      onUpdateCard(updatedCard as Card);
    } else {
      onSubmit(updatedCard);
    }
    setQuestion("");
    setFact("");
    setSelectedGroupIds([]);
    setSelectedTags([]);
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroupIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
        className="w-full p-2 rounded-md"
        required
      />
      <input
        type="text"
        value={fact}
        onChange={(e) => setFact(e.target.value)}
        placeholder="Fact"
        className="w-full p-2 rounded-md"
        required
      />
      <div className="grid bg-slate-100/50 p-3 rounded-md gap-4">
        <div className="space-y-2">
          <p className="font-semibold">Select Groups:</p>
          {groups.map((group) => (
            <label key={group.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedGroupIds.includes(group.id)}
                onChange={() => toggleGroup(group.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{group.name}</span>
            </label>
          ))}
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Select Tags:</p>
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => {
                  setSelectedTags((prev) =>
                    prev.includes(tag.id)
                      ? prev.filter((id) => id !== tag.id)
                      : [...prev, tag.id]
                  );
                }}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {card ? "Update Card" : "Add Card"}
      </button>
    </form>
  );
};

export default CardForm;
