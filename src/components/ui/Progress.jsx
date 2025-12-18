export const Progress = ({ currentStep, totalSteps }) => {
  // Ensure the step never exceeds the total count for the display
  const displayStep = Math.min(currentStep + 1, totalSteps);
  const progress = (displayStep / totalSteps) * 100;

  return (
    <div className="mb-8 w-full">
      <div className="flex justify-between text-sm mb-2 font-bold text-gray-600">
        <span>Step {displayStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner" role="progressbar" aria-valuenow={progress}>
        <div 
          className="bg-blue-600 h-full transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};