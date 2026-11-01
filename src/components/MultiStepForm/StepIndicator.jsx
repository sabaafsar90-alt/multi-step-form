import { Check, User, MapPin, ShieldCheck, ClipboardCheck } from 'lucide-react';

const STEP_ICONS = [User, MapPin, ShieldCheck, ClipboardCheck];

export function StepIndicator({ steps, currentStep, onStepClick, completedSteps }) {
  const progressPercentage = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full mb-8">
      {/* Mobile progress summary */}
      <div className="md:hidden flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Step {currentStep} of {steps.length}</span>
        <span className="text-indigo-600 font-bold">{steps[currentStep - 1].title}</span>
      </div>

      {/* Progress line indicator (Desktop & Tablet) */}
      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-slate-200 rounded-full z-0">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps navigation buttons */}
        <div className="relative z-10 flex justify-between items-center">
          {steps.map((step, idx) => {
            const stepNumber = idx + 1;
            const isCompleted = completedSteps.includes(stepNumber) || currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;
            const isClickable = isCompleted || stepNumber < currentStep;
            const Icon = STEP_ICONS[idx] || User;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable && !isCurrent}
                onClick={() => isClickable && onStepClick(stepNumber)}
                className={`group flex flex-col items-center focus:outline-none transition-all duration-200 ${
                  isClickable ? 'cursor-pointer' : isCurrent ? 'cursor-default' : 'cursor-not-allowed opacity-75'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm
                    ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-emerald-200 ring-4 ring-emerald-100 hover:scale-105'
                        : isCurrent
                        ? 'bg-indigo-600 text-white shadow-indigo-200 ring-4 ring-indigo-100 scale-110'
                        : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="mt-2 text-center hidden md:block">
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isCurrent
                        ? 'text-indigo-600 font-bold'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    Step {stepNumber}
                  </p>
                  <p
                    className={`text-sm font-medium transition-colors ${
                      isCurrent
                        ? 'text-slate-900 font-bold'
                        : isCompleted
                        ? 'text-slate-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
