import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { StepPersonal } from './StepPersonal';
import { StepAddress } from './StepAddress';
import { StepPreferences } from './StepPreferences';
import { StepReview } from './StepReview';
import { SubmissionSuccess } from './SubmissionSuccess';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Address' },
  { id: 3, title: 'Account' },
  { id: 4, title: 'Review' },
];

const INITIAL_FORM_DATA = {
  // Step 1
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  occupation: 'software_engineer',

  // Step 2
  streetAddress: '',
  suite: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',

  // Step 3
  username: '',
  password: '',
  confirmPassword: '',
  plan: 'starter',
  newsletter: true,
  agreeTerms: false,
};

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('multistep_form_data');
      return saved ? JSON.parse(saved) : INITIAL_FORM_DATA;
    } catch {
      return INITIAL_FORM_DATA;
    }
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRefId, setSubmissionRefId] = useState('');

  // Sync draft to local storage
  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem('multistep_form_data', JSON.stringify(formData));
      } catch (err) {
        console.error('Failed to save to local storage', err);
      }
    }
  }, [formData, isSubmitted]);

  // Validation function per step
  const validateStep = (stepNumber, data = formData) => {
    const stepErrors = {};

    if (stepNumber === 1) {
      if (!data.firstName.trim()) {
        stepErrors.firstName = 'First name is required';
      } else if (data.firstName.trim().length < 2) {
        stepErrors.firstName = 'Must be at least 2 characters';
      }

      if (!data.lastName.trim()) {
        stepErrors.lastName = 'Last name is required';
      } else if (data.lastName.trim().length < 2) {
        stepErrors.lastName = 'Must be at least 2 characters';
      }

      if (!data.email.trim()) {
        stepErrors.email = 'Email address is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email.trim())) {
          stepErrors.email = 'Please enter a valid email address';
        }
      }

      if (!data.phone.trim()) {
        stepErrors.phone = 'Phone number is required';
      } else {
        const cleanPhone = data.phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length < 7) {
          stepErrors.phone = 'Please enter a valid phone number (at least 7 digits)';
        }
      }

      if (!data.dob) {
        stepErrors.dob = 'Date of birth is required';
      } else {
        const birthDate = new Date(data.dob);
        const today = new Date();
        if (birthDate >= today) {
          stepErrors.dob = 'Date of birth cannot be in the future';
        }
      }
    }

    if (stepNumber === 2) {
      if (!data.streetAddress.trim()) {
        stepErrors.streetAddress = 'Street address is required';
      } else if (data.streetAddress.trim().length < 5) {
        stepErrors.streetAddress = 'Please enter a complete address';
      }

      if (!data.city.trim()) {
        stepErrors.city = 'City is required';
      }

      if (!data.state.trim()) {
        stepErrors.state = 'State / Province is required';
      }

      if (!data.zipCode.trim()) {
        stepErrors.zipCode = 'ZIP / Postal code is required';
      } else if (data.zipCode.trim().length < 3) {
        stepErrors.zipCode = 'Invalid postal code format';
      }

      if (!data.country) {
        stepErrors.country = 'Please select a country';
      }
    }

    if (stepNumber === 3) {
      if (!data.username.trim()) {
        stepErrors.username = 'Username is required';
      } else if (!/^[a-zA-Z0-9_]{4,20}$/.test(data.username.trim())) {
        stepErrors.username = 'Username must be 4-20 alphanumeric characters (or _)';
      }

      if (!data.password) {
        stepErrors.password = 'Password is required';
      } else if (data.password.length < 8) {
        stepErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(data.password)) {
        stepErrors.password = 'Must include at least one letter and one number';
      }

      if (!data.confirmPassword) {
        stepErrors.confirmPassword = 'Confirmation password is required';
      } else if (data.confirmPassword !== data.password) {
        stepErrors.confirmPassword = 'Passwords do not match';
      }

      if (!data.plan) {
        stepErrors.plan = 'Please select a plan';
      }

      if (!data.agreeTerms) {
        stepErrors.agreeTerms = 'You must agree to the Terms of Service to continue';
      }
    }

    return stepErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    const stepErrors = validateStep(currentStep);
    if (stepErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: stepErrors[name] }));
    }
  };

  const handlePlanSelect = (planId) => {
    setFormData((prev) => ({ ...prev, plan: planId }));
    if (errors.plan) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.plan;
        return next;
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Mark all fields of this step as touched
      return;
    }

    // Step is valid
    setErrors({});
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepNumber) => {
    // Only allow jump if going backwards or if all previous steps are valid
    if (stepNumber < currentStep) {
      setErrors({});
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If jumping forward, validate each step in between
    for (let s = 1; s < stepNumber; s++) {
      const stepErrors = validateStep(s);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setCurrentStep(s);
        return;
      }
    }

    setErrors({});
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    // Validate all steps from 1 to 3 before final submission
    for (let s = 1; s <= 3; s++) {
      const stepErrors = validateStep(s);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setCurrentStep(s);
        return;
      }
    }

    const generatedId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionRefId(generatedId);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.removeItem('multistep_form_data');
      } catch {
        // Ignore
      }
    }, 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setCompletedSteps([]);
    setCurrentStep(1);
    setIsSubmitted(false);
    try {
      localStorage.removeItem('multistep_form_data');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Container Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 px-6 sm:px-10 py-7 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Account Registration
                </h1>
                <p className="text-xs sm:text-sm text-indigo-200 mt-0.5">
                  Complete each step to activate your workspace profile
                </p>
              </div>
            </div>

            {!isSubmitted && (
              <span className="hidden sm:inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-indigo-100 border border-white/10">
                Step {currentStep} of {STEPS.length}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10">
          {!isSubmitted ? (
            <>
              {/* Stepper Progress Indicator */}
              <StepIndicator
                steps={STEPS}
                currentStep={currentStep}
                onStepClick={handleJumpToStep}
                completedSteps={completedSteps}
              />

              {/* Step Forms */}
              <div className="min-h-[380px]">
                {currentStep === 1 && (
                  <StepPersonal
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                )}

                {currentStep === 2 && (
                  <StepAddress
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                )}

                {currentStep === 3 && (
                  <StepPreferences
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onPlanSelect={handlePlanSelect}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}

                {currentStep === 4 && (
                  <StepReview
                    formData={formData}
                    onJumpToStep={handleJumpToStep}
                  />
                )}
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1 || isSubmitting}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentStep === 1
                      ? 'invisible'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-sm shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <SubmissionSuccess
              formData={formData}
              onReset={handleReset}
              referenceId={submissionRefId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
