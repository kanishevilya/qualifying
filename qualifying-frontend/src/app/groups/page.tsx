import { Link } from "react-router-dom";
import GroupForm from "src/components/forms/GroupForm";
import { useAppContext } from "src/context";
import { Group } from "../../data/types";

export default function GroupsPage() {
  const { groups, setGroups } = useAppContext();

  const handleAddGroup = (newGroup: Omit<Group, "id">) => {
    const id = (groups.length + 1).toString();
    setGroups([...groups, { ...newGroup, id }]);
  };

  const handleRemoveGroup = (groupId: string) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 px-96 pt-8">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Groups</h1>
      <Link
        to="/"
        className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-600 transition-colors duration-300"
      >
        Back to Flashcards
      </Link>
      <GroupForm
        onSubmit={handleAddGroup}
        groups={groups}
        onUpdateGroup={handleUpdateGroup}
        onRemoveGroup={handleRemoveGroup}
      />
    </div>
  );
}
