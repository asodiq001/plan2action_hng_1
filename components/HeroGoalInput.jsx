'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

export default function HeroGoalInput({ onGeneratePlan, isGenerating }) {
  const [goalText, setGoalText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalText.trim() || isGenerating) return;
    onGeneratePlan(goalText);
    setGoalText('');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/60 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-700/80 p-6 sm:p-8 shadow-sm">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Heading, description, input */}
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Goal Decomposer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Turn your goals into action
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            Plan2Action helps you break down your broad goals into simple, actionable tasks so you can make real progress without overwhelm.
          </p>

          {/* Goal Input form */}
          <form onSubmit={handleSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="What do you want to accomplish? (e.g. Start a graphic design business)"
                className="flex-1 px-4 py-3 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white shadow-sm placeholder-slate-400"
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={!goalText.trim() || isGenerating}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm shadow-md shadow-indigo-500/25 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Planning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Stylized Target & Checklist Graphic */}
        <div className="hidden lg:flex lg:col-span-4 justify-end">
          <div className="relative w-44 h-44 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/20 dark:from-indigo-600/20 dark:to-purple-600/30 flex items-center justify-center p-4">
            <div className="w-28 h-28 rounded-full border-4 border-dashed border-indigo-400/50 flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/40">
                <TargetIcon className="w-8 h-8" />
              </div>
            </div>
            {/* Checklist sticker badge */}
            <div className="absolute -bottom-2 -left-2 bg-white dark:bg-slate-800 rounded-xl p-2.5 shadow-lg border border-slate-100 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[10px]">✓</span>
                <span>Break into steps</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                <span className="w-3.5 h-3.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[10px]">✓</span>
                <span>Execute daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TargetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
