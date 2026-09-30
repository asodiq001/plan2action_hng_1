'use client';

import React from 'react';
import { X, Moon, Sun, Trash2, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
  onResetData,
  tasks,
}) {
  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `plan2action-tasks-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Application Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Theme Option */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Appearance</p>
              <p className="text-xs text-slate-500">Switch between light and dark themes</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Dark' : 'Light'}</span>
            </button>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Backup / Export */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Export Backup</p>
              <p className="text-xs text-slate-500">Download your tasks as a JSON file</p>
            </div>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Reset / Clear Data */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">Reset Local Data</p>
              <p className="text-xs text-slate-500">Clear all tasks and saved goal from browser</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all tasks and reset to default?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950 text-xs font-semibold text-rose-600 dark:text-rose-400 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
