'use client';

import React from 'react';
import { Calendar, Edit3, Trash2, FileText, Check } from 'lucide-react';

export default function TaskCard({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onOpenNotes,
}) {
  const priorityStyles = {
    high: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900',
    medium: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900',
    low: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900',
  };

  const priorityLabel = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  // Format date readable
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No due date';

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all ${
        task.completed
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-80'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 shadow-sm'
      }`}
    >
      {/* Left: Checkbox + Title + Notes preview */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0 pr-4">
        {/* Checkbox button */}
        <button
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-800'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Title and Notes summary */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`text-sm font-semibold truncate transition ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {task.title}
            </h3>
            {task.notes && (
              <button
                onClick={() => onOpenNotes(task)}
                title="View full notes"
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {task.notes ? (
            <p
              onClick={() => onOpenNotes(task)}
              className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 cursor-pointer hover:underline"
            >
              {task.notes}
            </p>
          ) : (
            <button
              onClick={() => onOpenNotes(task)}
              className="text-xs text-indigo-500 hover:underline mt-0.5 inline-block"
            >
              + Add notes
            </button>
          )}
        </div>
      </div>

      {/* Right meta: Priority, Due Date, Status, Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-3 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
        {/* Priority Badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            priorityStyles[task.priority] || priorityStyles.medium
          }`}
        >
          {priorityLabel[task.priority] || 'Medium'}
        </span>

        {/* Due Date */}
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 min-w-[85px]">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Status Pill */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            task.completed
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
              : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={() => onOpenNotes(task)}
            title="View & Edit Notes"
            className="p-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEditTask(task)}
            title="Edit Task"
            className="p-1.5 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            title="Delete Task"
            className="p-1.5 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
