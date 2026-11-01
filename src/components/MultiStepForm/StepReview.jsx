import { useState } from 'react';
import {
  User,
  MapPin,
  Eye,
  EyeOff,
  Edit2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const COUNTRY_NAMES = {
  US: 'United States',
  CA: 'Canada',
  GB: 'United Kingdom',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  JP: 'Japan',
  IN: 'India',
  BR: 'Brazil',
  SG: 'Singapore',
  OTHER: 'Other / International',
};

const OCCUPATION_LABELS = {
  software_engineer: 'Software Engineer / Developer',
  designer: 'UI/UX Designer / Creative',
  product_manager: 'Product Manager',
  data_analyst: 'Data Scientist / Analyst',
  student: 'Student / Researcher',
  other: 'Other',
};

const PLAN_INFO = {
  starter: { name: 'Starter', price: 'Free', badge: 'Popular' },
  pro: { name: 'Professional', price: '$29 / mo', badge: 'Recommended' },
  enterprise: { name: 'Enterprise', price: '$99 / mo', badge: 'Scale' },
};

export function StepReview({ formData, onJumpToStep }) {
  const [showPassword, setShowPassword] = useState(false);

  const plan = PLAN_INFO[formData.plan] || { name: formData.plan, price: '', badge: '' };
  const countryName = COUNTRY_NAMES[formData.country] || formData.country || 'Not specified';
  const occupation = OCCUPATION_LABELS[formData.occupation] || formData.occupation || 'Not specified';

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Form Review</h2>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Please verify all your details before final submission. Click "Edit" on any section to make changes.
        </p>
      </div>

      {/* Section 1: Personal Details */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-colors shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base">Personal Information</h3>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6 text-sm">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Full Name</span>
            <span className="font-semibold text-slate-800">
              {formData.firstName} {formData.lastName}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Email Address</span>
            <span className="font-semibold text-slate-800 break-all">{formData.email}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Phone Number</span>
            <span className="font-semibold text-slate-800">{formData.phone}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Date of Birth</span>
            <span className="font-semibold text-slate-800">{formData.dob || '—'}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Occupation</span>
            <span className="font-semibold text-slate-800">{occupation}</span>
          </div>
        </div>
      </div>

      {/* Section 2: Address & Location */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-colors shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base">Address & Location</h3>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6 text-sm">
          <div className="sm:col-span-2">
            <span className="text-xs text-slate-400 block font-medium">Street Address</span>
            <span className="font-semibold text-slate-800">
              {formData.streetAddress} {formData.suite ? `(${formData.suite})` : ''}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">City</span>
            <span className="font-semibold text-slate-800">{formData.city}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">State / Province</span>
            <span className="font-semibold text-slate-800">{formData.state}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">ZIP / Postal Code</span>
            <span className="font-semibold text-slate-800">{formData.zipCode}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Country</span>
            <span className="font-semibold text-slate-800">{countryName}</span>
          </div>
        </div>
      </div>

      {/* Section 3: Account & Subscription */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-colors shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base">Account & Subscription</h3>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6 text-sm">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Username</span>
            <span className="font-semibold text-slate-800 font-mono">@{formData.username}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Password</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 font-mono">
                {showPassword ? formData.password : '••••••••••••'}
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Selected Plan</span>
            <div className="inline-flex items-center gap-1.5 mt-0.5">
              <span className="font-bold text-slate-900">{plan.name}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                {plan.price}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Newsletter Updates</span>
            <span className="font-semibold text-slate-800">
              {formData.newsletter ? 'Subscribed (Email)' : 'Opted Out'}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Terms of Service</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Accepted
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation notice banner */}
      <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-3.5 flex items-start gap-3 text-xs sm:text-sm text-amber-800">
        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          By clicking <strong>Submit Application</strong> below, your registration will be processed immediately. You can review and update your information anytime in your account dashboard.
        </p>
      </div>
    </div>
  );
}
