'use client';

import React from 'react';
import { LayoutDashboard, CheckSquare, Target, Settings, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-61px)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 justify-between transition-colors">
      {/* Navigation links */}
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Motivational Bottom Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900 p-4 text-white shadow-md">
        <div className="relative z-10 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-100" />
          </div>
          <p className="text-sm font-semibold leading-snug">
            Small steps today, big dreams tomorrow.
          </p>
          <p className="text-xs text-indigo-100/80">
            Keep building momentum one actionable task at a time.
          </p>
        </div>
        {/* Subtle decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>
    </aside>
  );
}
