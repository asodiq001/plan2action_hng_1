'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import HeroGoalInput from '@/components/HeroGoalInput';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import NotesModal from '@/components/NotesModal';
import GoalModal from '@/components/GoalModal';
import SettingsModal from '@/components/SettingsModal';
import QuickActions from '@/components/QuickActions';
import ProgressBar from '@/components/ProgressBar';
import { Plus, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const DEFAULT_GOAL = 'Start a graphic design business';

const INITIAL_TASKS = [
  {
    id: 't-1',
    title: 'Create Fiverr profile',
    notes: 'Set up your profile and complete your seller information with high quality gig images.',
    priority: 'high',
    dueDate: '2026-10-15',
    completed: true,
    createdAt: '2026-09-30T10:00:00Z',
  },
  {
    id: 't-2',
    title: 'Create portfolio',
    notes: 'Design a simple portfolio website to showcase your work and case studies.',
    priority: 'high',
    dueDate: '2026-10-20',
    completed: false,
    createdAt: '2026-09-30T10:05:00Z',
  },
  {
    id: 't-3',
    title: 'Create sample designs',
    notes: 'Make 3-5 sample designs in your niche to display your typography and layout skills.',
    priority: 'medium',
    dueDate: '2026-10-25',
    completed: false,
    createdAt: '2026-09-30T10:10:00Z',
  },
  {
    id: 't-4',
    title: 'Set service pricing',
    notes: 'Research and set competitive prices for beginner, standard, and pro tiers.',
    priority: 'medium',
    dueDate: '2026-10-28',
    completed: false,
    createdAt: '2026-09-30T10:15:00Z',
  },
  {
    id: 't-5',
    title: 'Publish first service',
    notes: 'List your first gig on Fiverr with focused keywords and clear deliverables.',
    priority: 'high',
    dueDate: '2026-11-02',
    completed: false,
    createdAt: '2026-09-30T10:20:00Z',
  },
  {
    id: 't-6',
    title: 'Start marketing',
    notes: 'Share your work on LinkedIn, Twitter, and Instagram to build early awareness.',
    priority: 'medium',
    dueDate: '2026-11-08',
    completed: false,
    createdAt: '2026-09-30T10:25:00Z',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(DEFAULT_GOAL);
  const [tasks, setTasks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'title'

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [activeNotesTask, setActiveNotesTask] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 1. Initial Load from localStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('plan2action_tasks');
      const savedGoal = localStorage.getItem('plan2action_goal');
      const savedTheme = localStorage.getItem('plan2action_theme');

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(INITIAL_TASKS);
      }

      if (savedGoal) {
        setCurrentGoal(savedGoal);
      }

      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch (err) {
      console.error('Error loading state from localStorage:', err);
      setTasks(INITIAL_TASKS);
    }
  }, []);

  // 2. Persist to localStorage on changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('plan2action_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (currentGoal) {
      localStorage.setItem('plan2action_goal', currentGoal);
    }
  }, [currentGoal]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('plan2action_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('plan2action_theme', 'light');
    }
  }, [darkMode]);

  // Goal decomposition via API
  const handleGeneratePlan = async (newGoal) => {
    setIsGenerating(true);
    setCurrentGoal(newGoal);

    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: newGoal }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        alert(data.error || 'Failed to decompose goal.');
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Network error while generating plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle completion
  const handleToggleComplete = (taskId) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Save new / edited task
  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      // Edit existing
      setTasks(prev =>
        prev.map(t => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
    } else {
      // Create new
      const newTask = {
        ...taskData,
        id: 'task_' + Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  // Save task notes
  const handleSaveNotes = (taskId, newNotes) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, notes: newNotes } : t))
    );
  };

  // Reset data
  const handleResetData = () => {
    localStorage.removeItem('plan2action_tasks');
    localStorage.removeItem('plan2action_goal');
    setTasks(INITIAL_TASKS);
    setCurrentGoal(DEFAULT_GOAL);
  };

  // Filtering & Sorting
  const filteredTasks = tasks
    .filter(t => {
      if (filter === 'pending') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.notes && t.notes.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const order = { high: 1, medium: 2, low: 3 };
        return (order[a.priority] || 2) - (order[b.priority] || 2);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16 md:pb-0">
      {/* Top Navbar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          {/* Hero Goal Input Section */}
          <HeroGoalInput
            onGeneratePlan={handleGeneratePlan}
            isGenerating={isGenerating}
          />

          {/* Grid Layout: Main Tasks Column (8 cols) + Side Widgets (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Task List Card */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
              {/* Tasks Header: Title, Filters, Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    My Tasks
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Breakdown for: <span className="font-medium text-slate-700 dark:text-slate-300">{currentGoal}</span>
                  </p>
                </div>

                {/* Filter Pills & Add Button */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        filter === 'all'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      All ({totalCount})
                    </button>
                    <button
                      onClick={() => setFilter('pending')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        filter === 'pending'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Pending ({pendingCount})
                    </button>
                    <button
                      onClick={() => setFilter('completed')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        filter === 'completed'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Completed ({completedCount})
                    </button>
                  </div>

                  {/* Add Task Button */}
                  <button
                    onClick={() => {
                      setTaskToEdit(null);
                      setIsTaskModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Task</span>
                  </button>
                </div>
              </div>

              {/* Sort selector bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <span className="hidden sm:inline">
                  Showing {filteredTasks.length} of {totalCount} total actions
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <label htmlFor="sort-select" className="text-slate-500">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="dueDate" className="dark:bg-slate-900">Due Date</option>
                    <option value="priority" className="dark:bg-slate-900">Priority</option>
                    <option value="title" className="dark:bg-slate-900">Title</option>
                  </select>
                </div>
              </div>

              {/* Task Items List */}
              <div className="space-y-3 min-h-[220px]">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onEditTask={(t) => {
                        setTaskToEdit(t);
                        setIsTaskModalOpen(true);
                      }}
                      onDeleteTask={handleDeleteTask}
                      onOpenNotes={(t) => {
                        setActiveNotesTask(t);
                        setIsNotesModalOpen(true);
                      }}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No tasks found matching your filter.</p>
                    <p className="text-xs text-slate-500 mt-1">Try generating a new plan or add a task manually.</p>
                  </div>
                )}
              </div>

              {/* Progress Bar Footer */}
              <ProgressBar
                completedCount={completedCount}
                totalCount={totalCount}
              />
            </div>

            {/* Right 4 Cols: Quick Actions & Goal Widgets */}
            <div className="lg:col-span-4">
              <QuickActions
                currentGoal={currentGoal}
                onEditGoal={() => setIsGoalModalOpen(true)}
                onNewGoalClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  document.querySelector('input[placeholder*="accomplish"]')?.focus();
                }}
                onGenerateClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  document.querySelector('input[placeholder*="accomplish"]')?.focus();
                }}
                onOpenNewTask={() => {
                  setTaskToEdit(null);
                  setIsTaskModalOpen(true);
                }}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Task Add / Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Dedicated Task Notes Modal (HNG Requirement) */}
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        task={activeNotesTask}
        onSaveNotes={handleSaveNotes}
      />

      {/* Active Goal Edit Modal */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        currentGoal={currentGoal}
        onSaveGoal={(newGoal) => setCurrentGoal(newGoal)}
      />

      {/* Settings & Export Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onResetData={handleResetData}
        tasks={tasks}
      />
    </div>
  );
}
