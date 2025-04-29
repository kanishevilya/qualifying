import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { Card, Group, Tag } from "src/data/types";
import { mockCards, mockGroups, mockTags } from "./data/mock";

import axios from "axios";

const API_URL = "http://localhost:8000";

interface AppContextProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  flipAllCards: boolean;
  setFlipAllCards: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [flipAllCards, setFlipAllCards] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const isInitialized = useRef(false);

  const saveDataToServer = async (dataType: string, data: string) => {
    try {
      await axios.post(`${API_URL}/save_${dataType}`, {
        [dataType]: data,
      });
    } catch (error) {
      console.error("Error saving data to server:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const cards_ =
          (await axios.get(`${API_URL}/get_cards`)).data["cards"] || [];
        const tags_ =
          (await axios.get(`${API_URL}/get_tags`)).data["tags"] || [];
        const groups_ =
          (await axios.get(`${API_URL}/get_groups`)).data["groups"] || [];

        setCards(
          cards_ && cards_ != "[]" && cards_.length > 0
            ? JSON.parse(cards_)
            : mockCards
        );
        setTags(
          tags_ && tags_ != "[]" && cards_.length > 0
            ? JSON.parse(tags_)
            : mockTags
        );

        setGroups(
          groups_ && groups_ != "[]" && cards_.length > 0
            ? JSON.parse(groups_)
            : mockGroups
        );

        isInitialized.current = true;
      } catch (error) {
        console.error("Error loading data:", error);
        setCards(mockCards);
        setTags(mockTags);
        setGroups(mockGroups);
      }
    }

    if (!isInitialized.current) {
      loadData();
    }
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      console.log(cards);
      saveDataToServer("cards", JSON.stringify(cards));
    }
  }, [cards]);

  useEffect(() => {
    if (isInitialized.current) {
      saveDataToServer("groups", JSON.stringify(groups));
    }
  }, [groups]);

  useEffect(() => {
    if (isInitialized.current) {
      saveDataToServer("tags", JSON.stringify(tags));
    }
  }, [tags]);
  return (
    <AppContext.Provider
      value={{
        flipAllCards,
        setFlipAllCards,
        cards,
        setCards,
        groups,
        setGroups,
        tags,
        setTags,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
