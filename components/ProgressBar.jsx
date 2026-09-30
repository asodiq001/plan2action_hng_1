'use client';

import React from 'react';

export default function ProgressBar({ completedCount, totalCount }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">
        <span>Overall Progress</span>
        <span className="text-indigo-600 dark:text-indigo-400">
          {completedCount} of {totalCount} tasks ({percentage}%)
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
