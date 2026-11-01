import { User, Mail, Phone, Calendar, Briefcase } from 'lucide-react';
import { FormInput, FormSelect } from './FormInput';

const OCCUPATION_OPTIONS = [
  { value: 'software_engineer', label: 'Software Engineer / Developer' },
  { value: 'designer', label: 'UI/UX Designer / Creative' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'data_analyst', label: 'Data Scientist / Analyst' },
  { value: 'student', label: 'Student / Researcher' },
  { value: 'other', label: 'Other' },
];

export function StepPersonal({ formData, errors, onChange, onBlur }) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Personal Details</h2>
        <p className="text-sm text-slate-500 mt-1">
          Please provide your legal contact details so we can verify your identity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          name="firstName"
          placeholder="e.g. John"
          value={formData.firstName}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.firstName}
          required
          icon={User}
          autoComplete="given-name"
        />

        <FormInput
          label="Last Name"
          name="lastName"
          placeholder="e.g. Doe"
          value={formData.lastName}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.lastName}
          required
          icon={User}
          autoComplete="family-name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.email}
          required
          icon={Mail}
          helperText="We'll send your confirmation here"
          autoComplete="email"
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.phone}
          required
          icon={Phone}
          autoComplete="tel"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.dob}
          required
          icon={Calendar}
          helperText="Must be 18 or older"
        />

        <FormSelect
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.occupation}
          options={OCCUPATION_OPTIONS}
          icon={Briefcase}
          helperText="Optional"
        />
      </div>
    </div>
  );
}
