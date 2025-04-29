import React from "react";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="bg-black/80 backdrop-blur-md top-0 z-10 sticky pt-8 mb-5 rounded-b-3xl w-full">
      <div className="w-[95%] mx-auto h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-white mt-2 font-semibold pb-2">
        Progress: {progress.toFixed(1)}%
      </p>
    </div>
  );
};

export default ProgressBar;
