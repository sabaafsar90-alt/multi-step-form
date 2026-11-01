import './App.css';
import { MultiStepForm } from './components/MultiStepForm/MultiStepForm';
import { Layers, Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-100 text-lg tracking-tight">
                StepCraft
              </span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded-full">
                Multi-Step Form
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>256-bit SSL Encrypted</span>
            </span>
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <span className="inline-flex items-center gap-1 text-slate-300 font-medium bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Validation Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <MultiStepForm />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} StepCraft Forms. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Clean UI</span>
            <span>•</span>
            <span>Step-by-Step Validation</span>
            <span>•</span>
            <span>Form Review Output</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
