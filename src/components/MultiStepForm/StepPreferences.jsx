import { AtSign, Lock, Check } from 'lucide-react';
import { FormInput } from './FormInput';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    desc: 'Best for personal projects and hobbies',
    badge: 'Popular',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$29/mo',
    desc: 'Advanced tools & team collaboration',
    badge: 'Recommended',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99/mo',
    desc: 'Dedicated support & enterprise security',
    badge: 'Scale',
  },
];

function getPasswordStrength(password = '') {
  let score = 0;
  if (!password) return { score: 0, label: 'None', color: 'bg-slate-200' };
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
  if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
  if (score === 3) return { score: 75, label: 'Good', color: 'bg-blue-500' };
  return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
}

export function StepPreferences({ formData, errors, onChange, onBlur, onPlanSelect, onCheckboxChange }) {
  const strength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Account & Security</h2>
        <p className="text-sm text-slate-500 mt-1">
          Set up your login credentials and select your workspace subscription.
        </p>
      </div>

      <FormInput
        label="Username"
        name="username"
        placeholder="johndoe_99"
        value={formData.username}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.username}
        required
        icon={AtSign}
        helperText="4-20 alphanumeric characters"
        autoComplete="username"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.password}
            required
            icon={Lock}
            autoComplete="new-password"
          />

          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Strength:</span>
                <span className="font-semibold text-slate-700">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.confirmPassword}
          required
          icon={Lock}
          autoComplete="new-password"
        />
      </div>

      {/* Plan Selection Cards */}
      <div className="pt-2">
        <label className="block text-sm font-semibold text-slate-700 mb-2.5">
          Select Subscription Plan <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PLANS.map((plan) => {
            const isSelected = formData.plan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => onPlanSelect(plan.id)}
                className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm shadow-indigo-100 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{plan.name}</h3>
                  <p className="text-xl font-extrabold text-slate-800 mt-1 mb-2">
                    {plan.price}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">{plan.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {errors.plan && (
          <p className="text-xs text-rose-600 font-medium mt-1.5">{errors.plan}</p>
        )}
      </div>

      {/* Checkboxes: Newsletter & Terms */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="newsletter"
            checked={!!formData.newsletter}
            onChange={onCheckboxChange}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
            Keep me updated on product releases, security notices, and company insights.
          </span>
        </label>

        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={!!formData.agreeTerms}
              onChange={onCheckboxChange}
              className={`mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer ${
                errors.agreeTerms ? 'border-rose-400' : 'border-slate-300'
              }`}
            />
            <span className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
              I agree to the{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="text-indigo-600 font-semibold underline hover:text-indigo-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-indigo-600 font-semibold underline hover:text-indigo-700">
                Privacy Policy
              </a>
              . <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-rose-600 font-medium mt-1.5 pl-7">
              {errors.agreeTerms}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
