'use client';

import React from 'react';
import { Target, Edit3, Plus, Sparkles, FolderKanban, Settings, Lightbulb } from 'lucide-react';

export default function QuickActions({
  currentGoal,
  onEditGoal,
  onNewGoalClick,
  onGenerateClick,
  onOpenNewTask,
  onOpenSettings,
}) {
  return (
    <div className="space-y-5">
      {/* Active Goal Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 mb-2">
          <Target className="w-5 h-5" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Goal
          </h3>
        </div>
        <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
          {currentGoal || 'No goal set yet'}
        </p>
        <button
          onClick={onEditGoal}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Goal</span>
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onNewGoalClick}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-50/70 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-medium gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Goal</span>
          </button>
          <button
            onClick={onGenerateClick}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50/70 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-950/70 text-purple-700 dark:text-purple-300 text-xs font-medium gap-1.5 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate</span>
          </button>
          <button
            onClick={onOpenNewTask}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium gap-1.5 transition"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Add Task</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium gap-1.5 transition"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Stay Focused Card */}
      <div className="relative overflow-hidden rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 p-5 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
          <Lightbulb className="w-5 h-5" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Stay Focused
          </h3>
        </div>
        <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
          Progress is built one task at a time. Finish your high priority items first.
        </p>
      </div>
    </div>
  );
}
