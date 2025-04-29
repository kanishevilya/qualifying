import React, { useState } from "react";
import { Group } from "src/data/types";

type GroupFormProps = {
  onSubmit: (group: Omit<Group, "id">) => void;
  onUpdateGroup: (group: Group) => void;
  onRemoveGroup: (groupId: string) => void;
  groups: Group[];
};

const GroupForm: React.FC<GroupFormProps> = ({
  onSubmit,
  onUpdateGroup,
  onRemoveGroup,
  groups,
}) => {
  const [name, setName] = useState("");
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGroup) {
      onUpdateGroup({ ...editingGroup, name });
      setEditingGroup(null);
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
          placeholder="Group name"
          className="w-full p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          {editingGroup ? "Update Group" : "Add Group"}
        </button>
      </form>
      <div className="mt-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between bg-white p-2 rounded-md mb-2"
          >
            <span>{group.name}</span>
            <div>
              <button
                onClick={() => {
                  setEditingGroup(group);
                  setName(group.name);
                }}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onRemoveGroup(group.id)}
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

export default GroupForm;
