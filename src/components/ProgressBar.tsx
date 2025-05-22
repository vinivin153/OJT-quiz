import useStepStore from 'store/useStepStore';
import Connector from './Connector';
import Star from './Star';
import { TOTAL_STEPS } from 'constants/constant';

function ProgressBar() {
  const currentStep = useStepStore((state) => state.step);

  return (
    <div className="w-full h-32 flex items-center justify-center z-10">
      {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
        const stepNumber = idx + 1;
        const isSolved = stepNumber < currentStep;
        const isSolving = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <Star isSolved={isSolved} isSolving={isSolving} step={stepNumber} />
            {stepNumber < TOTAL_STEPS && <Connector isSolved={currentStep > stepNumber} />}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
