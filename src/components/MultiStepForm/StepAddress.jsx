import { MapPin, Building, Home, Globe } from 'lucide-react';
import { FormInput, FormSelect } from './FormInput';

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
  { value: 'SG', label: 'Singapore' },
  { value: 'OTHER', label: 'Other / International' },
];

export function StepAddress({ formData, errors, onChange, onBlur }) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Address & Location</h2>
        <p className="text-sm text-slate-500 mt-1">
          Where should we send billing statements, notices, or physical goods?
        </p>
      </div>

      <FormInput
        label="Street Address"
        name="streetAddress"
        placeholder="1234 Main Boulevard, Apt 4B"
        value={formData.streetAddress}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.streetAddress}
        required
        icon={MapPin}
        autoComplete="street-address"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Apartment / Suite / Unit"
          name="suite"
          placeholder="Suite 500, Floor 3 (Optional)"
          value={formData.suite}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.suite}
          icon={Building}
        />

        <FormInput
          label="City"
          name="city"
          placeholder="San Francisco"
          value={formData.city}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.city}
          required
          icon={Home}
          autoComplete="address-level2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormInput
          label="State / Province"
          name="state"
          placeholder="California"
          value={formData.state}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.state}
          required
          autoComplete="address-level1"
        />

        <FormInput
          label="ZIP / Postal Code"
          name="zipCode"
          placeholder="94103"
          value={formData.zipCode}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.zipCode}
          required
          autoComplete="postal-code"
        />

        <FormSelect
          label="Country"
          name="country"
          value={formData.country}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.country}
          options={COUNTRY_OPTIONS}
          required
          icon={Globe}
        />
      </div>
    </div>
  );
}
