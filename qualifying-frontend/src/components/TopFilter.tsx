import React from "react";
import { Tag } from "../data/types";

type TagFilterProps = {
  tags: Tag[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => toggleTag(tag.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
            selectedTags.includes(tag.id)
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
