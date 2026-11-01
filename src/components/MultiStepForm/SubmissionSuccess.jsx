import { useState } from 'react';
import { CheckCircle, RotateCcw, Download, Copy, Check } from 'lucide-react';

export function SubmissionSuccess({ formData, onReset, referenceId = 'APP-748291' }) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const sanitizedData = {
      ...formData,
      password: '***PROTECTED***',
      confirmPassword: '***PROTECTED***',
      referenceId,
      submittedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(sanitizedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-submission-${referenceId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center py-6 px-2 sm:px-6 animate-fadeIn">
      {/* Success Badge */}
      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 ring-8 ring-emerald-50 shadow-sm animate-bounce">
        <CheckCircle className="w-10 h-10 stroke-[2.5]" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Form Submitted Successfully!
      </h2>
      <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-2">
        Thank you, <span className="font-semibold text-slate-800">{formData.firstName}</span>. Your details have been securely recorded.
      </p>

      {/* Reference Card */}
      <div className="my-6 max-w-sm mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Reference ID
            </span>
            <p className="text-base font-mono font-bold text-slate-800">{referenceId}</p>
          </div>
          <button
            type="button"
            onClick={handleCopyId}
            className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-white transition-colors"
            title="Copy ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200/60 flex justify-between text-xs text-slate-500">
          <span>Target Email:</span>
          <span className="font-medium text-slate-700">{formData.email}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleDownloadJSON}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Summary (JSON)</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Fill Another Form</span>
        </button>
      </div>
    </div>
  );
}
