import React from "react";

interface SlideButtonProps {
  isOn: boolean;
  onToggle: () => void;
}

const SlideButton: React.FC<SlideButtonProps> = ({ isOn, onToggle }) => {
  return (
    <button
      className={`relative inline-flex items-center h-8 rounded-full w-14 focus:outline-none ${
        isOn ? "bg-yellow-400" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <span className="sr-only">Toggle group selection</span>
      <span
        className={`inline-block w-6 h-6 transform transition-transform bg-white rounded-full ${
          isOn ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default SlideButton;
