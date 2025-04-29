import React, { useState } from "react";
import { Tag } from "src/data/types";

type TagFormProps = {
  onSubmit: (tag: Omit<Tag, "id">) => void;
  onUpdateTag: (tag: Tag) => void;
  onRemoveTag: (tagId: string) => void;
  tags: Tag[];
};

const TagForm: React.FC<TagFormProps> = ({
  onSubmit,
  onUpdateTag,
  onRemoveTag,
  tags,
}) => {
  const [name, setName] = useState("");
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTag) {
      onUpdateTag({ ...editingTag, name });
      setEditingTag(null);
    } else {
      onSubmit({ name });
    }
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tag name"
          className="w-full p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
        >
          {editingTag ? "Update Tag" : "Add Tag"}
        </button>
      </form>
      <div className="mt-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between bg-white p-2 rounded-md mb-2"
          >
            <span>{tag.name}</span>
            <div>
              <button
                onClick={() => {
                  setEditingTag(tag);
                  setName(tag.name);
                }}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onRemoveTag(tag.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagForm;
