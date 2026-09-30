import './globals.css';

export const metadata = {
  title: 'Plan2Action — Turn your goals into action',
  description: 'AI-assisted task planner that breaks broad goals into clear, actionable tasks with notes, priorities, and progress tracking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
