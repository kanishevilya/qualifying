import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FlipCard from "src/components/Card";
import ProgressBar from "src/components/ProgressBar";
import SlideButton from "src/components/SlideButton";
import SmallCard from "src/components/SmallCard";
import TagFilter from "src/components/TopFilter";
import { Card } from "src/data/types";
import { useAppContext } from "../context";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const Home: React.FC = () => {
  const {
    cards,
    setCards,
    groups,
    setGroups,
    tags,
    setTags,
    setFlipAllCards,
    flipAllCards,
  } = useAppContext();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [contentSearchTerm, setContentSearchTerm] = useState("");
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const filteredCards = useMemo(() => {
    return cards.filter(
      (card) =>
        (!isGroupMode ||
          selectedGroups.some((groupId) => card.groupIds.includes(groupId))) &&
        (selectedTags.length === 0 ||
          card.tags.some((tag) => selectedTags.includes(tag.id))) &&
        (tagSearchTerm === "" ||
          card.tags.some((tag) =>
            tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
          )) &&
        (contentSearchTerm === "" ||
          card.questions.some((q) =>
            q.toLowerCase().includes(contentSearchTerm.toLowerCase())
          ) ||
          card.fact.toLowerCase().includes(contentSearchTerm.toLowerCase()))
    );
  }, [
    cards,
    isGroupMode,
    selectedGroups,
    selectedTags,
    tagSearchTerm,
    contentSearchTerm,
  ]);

  useEffect(() => {
    setCurrentCardIndex(0);
    setFlipAllCards(!flipAllCards);
  }, [selectedTags, contentSearchTerm, tagSearchTerm]);

  const handleNextCard = () => {
    setFlipAllCards(!flipAllCards);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % filteredCards.length);
  };

  const handlePrevCard = () => {
    setFlipAllCards(!flipAllCards);
    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredCards.length) % filteredCards.length
    );
  };

  const handleRememberToggle = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, remembered: !card.remembered } : card
      )
    );
  };

  const handleUpdateCardIndexInRemove = () => {
    if (
      currentCardIndex !== 0 &&
      filteredCards.length - 1 == currentCardIndex
    ) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleRemoveCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleUpdateCard = (updatedCard: Card) => {
    setCards(
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const progress = useMemo(() => {
    const relevantCards = isGroupMode
      ? cards.filter((card) =>
          selectedGroups.some((groupId) => card.groupIds.includes(groupId))
        )
      : cards;
    const val =
      (relevantCards.filter((card) => card.remembered).length /
        relevantCards.length) *
      100;
    return val || 0;
  }, [cards, isGroupMode, selectedGroups]);

  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleForgetAll = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({ ...card, remembered: false }))
    );
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 pt-0">
      <ProgressBar progress={progress} />

      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">FlashCard App</h1>
          <button
            onClick={handleForgetAll}
            className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition-colors duration-300"
          >
            Forget All
          </button>
          <div className="flex items-center gap-6">
            <p className="text-white font-bold text-xl">Group mode</p>
            <SlideButton
              isOn={isGroupMode}
              onToggle={() => setIsGroupMode(!isGroupMode)}
            />
          </div>
        </div>

        {isGroupMode && (
          <div className="flex w-full justify-end flex-wrap gap-2">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => toggleGroup(group.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedGroups.includes(group.id)
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-yellow-600 hover:bg-indigo-100"
                }`}
              >
                {group.name}
              </button>
            ))}
          </div>
        )}

        <input
          type="text"
          placeholder="Search by tag..."
          value={tagSearchTerm}
          onChange={(e) => setTagSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Search card content..."
          value={contentSearchTerm}
          onChange={(e) => setContentSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md"
        />
      </div>

      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {cards.length == 0 && (
        <Alert variant="filled" severity="info">
          Default objects have been restored!
        </Alert>
      )}
      <div className="flex flex-col items-center justify-center flex-grow">
        {filteredCards.length > 0 ? (
          isGroupMode ? (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${
                  filteredCards.length < 4 ? filteredCards.length : 4
                }, minmax(0, 1fr))`,
              }}
            >
              {filteredCards.map((card) => (
                <SmallCard
                  key={card.id}
                  card={card}
                  onRememberToggle={handleRememberToggle}
                />
              ))}
            </div>
          ) : (
            <>
              <FlipCard
                card={filteredCards[currentCardIndex]}
                onRememberToggle={handleRememberToggle}
                onRemove={() => {
                  handleUpdateCardIndexInRemove();
                  handleRemoveCard(filteredCards[currentCardIndex].id);
                }}
                onUpdate={handleUpdateCard}
                groups={groups}
                cardTags={tags}
              />
              <div className="mt-10 flex space-x-4 flex-wrap justify-center">
                <button
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-100 transition-colors duration-300"
                  onClick={handlePrevCard}
                >
                  ← Previous
                </button>
                <button
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-100 transition-colors duration-300"
                  onClick={handleNextCard}
                >
                  Next →
                </button>
              </div>
            </>
          )
        ) : (
          <div className="text-white text-2xl">
            No cards match the selected criteria.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/cards"
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Manage Cards
        </Link>
        <Link
          to="/groups"
          className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-600 transition-colors duration-300"
        >
          Manage Groups
        </Link>
        <Link
          to="/tags"
          className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          Manage Tags
        </Link>
      </div>
    </div>
  );
};

export default Home;
