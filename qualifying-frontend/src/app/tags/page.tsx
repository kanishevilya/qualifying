import { Link } from "react-router-dom";
import TagForm from "src/components/forms/TagForm";
import { useAppContext } from "src/context";
import { Tag } from "src/data/types";

export default function TagsPage() {
  const { tags, setTags } = useAppContext();

  const handleAddTag = (newTag: Omit<Tag, "id">) => {
    const id = (tags.length + 1).toString();
    setTags([...tags, { ...newTag, id }]);
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleUpdateTag = (updatedTag: Tag) => {
    setTags(tags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag)));
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 px-96 pt-8">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Tags</h1>
      <Link
        to="/"
        className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-600 transition-colors duration-300"
      >
        Back to Flashcards
      </Link>
      <TagForm
        onSubmit={handleAddTag}
        tags={tags}
        onUpdateTag={handleUpdateTag}
        onRemoveTag={handleRemoveTag}
      />
    </div>
  );
}
