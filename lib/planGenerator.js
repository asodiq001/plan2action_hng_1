/**
 * Plan2Action - Goal Decomposition Engine
 * Breaks down any user goal into structured, actionable tasks with notes and priorities.
 */

// Formats a date relative to today (e.g. today + X days)
function getRelativeDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

// Generate simple unique ID
export function generateId() {
  return 'task_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
}

/**
 * Pre-defined blueprints for common goals
 */
const BLUEPRINTS = [
  {
    keywords: ['graphic design', 'design business', 'freelance design'],
    tasks: [
      {
        title: 'Create Fiverr & Upwork profiles',
        notes: 'Set up your profile, write a compelling bio, and complete your seller information.',
        priority: 'high',
        daysOffset: 2,
      },
      {
        title: 'Build a design portfolio',
        notes: 'Design a simple portfolio website or Behance page to showcase your best 4-6 pieces of work.',
        priority: 'high',
        daysOffset: 5,
      },
      {
        title: 'Create niche sample designs',
        notes: 'Make 3-5 sample design mockups targeting your chosen industry (e.g., logos, social templates).',
        priority: 'medium',
        daysOffset: 8,
      },
      {
        title: 'Set service pricing & packages',
        notes: 'Research competitors and define basic, standard, and premium pricing packages.',
        priority: 'medium',
        daysOffset: 12,
      },
      {
        title: 'Publish first gig / service listing',
        notes: 'Write clear gig titles, upload eye-catching gig images, and detail package deliverables.',
        priority: 'high',
        daysOffset: 15,
      },
      {
        title: 'Start outreach & social marketing',
        notes: 'Share case studies and design tips on LinkedIn, Twitter, and Instagram to attract inbound leads.',
        priority: 'medium',
        daysOffset: 20,
      },
    ],
  },
  {
    keywords: ['job', 'interview', 'hired', 'resume', 'cv', 'career'],
    tasks: [
      {
        title: 'Update and polish resume/CV',
        notes: 'Highlight quantifiable achievements, relevant tech stack, and clear project outcomes.',
        priority: 'high',
        daysOffset: 2,
      },
      {
        title: 'Optimize LinkedIn and portfolio links',
        notes: 'Ensure your headline is clear, add your latest projects, and turn on Open To Work.',
        priority: 'high',
        daysOffset: 4,
      },
      {
        title: 'Identify target companies & roles',
        notes: 'List 15-20 companies actively hiring for your target position and review their requirements.',
        priority: 'medium',
        daysOffset: 6,
      },
      {
        title: 'Apply to top 5 job postings',
        notes: 'Customize your cover letter and submit applications with tailored resumes.',
        priority: 'high',
        daysOffset: 9,
      },
      {
        title: 'Practice behavioral & technical interview questions',
        notes: 'Use the STAR method for behavioral answers and practice coding/case problems.',
        priority: 'high',
        daysOffset: 12,
      },
      {
        title: 'Network with recruiters and peers',
        notes: 'Send 5 friendly connection notes on LinkedIn to peers or alumni at your target firms.',
        priority: 'medium',
        daysOffset: 15,
      },
    ],
  },
  {
    keywords: ['portfolio', 'website', 'personal site'],
    tasks: [
      {
        title: 'Select top 3-4 showcase projects',
        notes: 'Choose projects that demonstrate diverse skills, problem solving, and clean code.',
        priority: 'high',
        daysOffset: 2,
      },
      {
        title: 'Draft project case studies & summaries',
        notes: 'Write the problem, your solution, tech stack used, and live demo / repo links.',
        priority: 'high',
        daysOffset: 5,
      },
      {
        title: 'Build responsive web layout',
        notes: 'Use Next.js and Tailwind CSS to create clean hero, about, projects, and contact sections.',
        priority: 'high',
        daysOffset: 9,
      },
      {
        title: 'Deploy to Vercel and verify live link',
        notes: 'Connect your GitHub repo to Vercel, verify custom domain, and test on mobile browsers.',
        priority: 'medium',
        daysOffset: 12,
      },
    ],
  },
  {
    keywords: ['exam', 'study', 'course', 'learn'],
    tasks: [
      {
        title: 'Gather syllabus and study materials',
        notes: 'Download textbooks, lecture slides, and organize notes by week/topic.',
        priority: 'high',
        daysOffset: 1,
      },
      {
        title: 'Break syllabus into daily study sessions',
        notes: 'Allocate 1-2 hours per session focusing on highest-weight topics first.',
        priority: 'high',
        daysOffset: 3,
      },
      {
        title: 'Complete first practice test / flashcards',
        notes: 'Identify weak areas and note down concepts needing reinforcement.',
        priority: 'medium',
        daysOffset: 7,
      },
      {
        title: 'Review mistakes and consult study guides',
        notes: 'Re-solve problems answered incorrectly and clarify lingering questions.',
        priority: 'high',
        daysOffset: 10,
      },
      {
        title: 'Final timed mock test',
        notes: 'Simulate real exam conditions with strict timing and no distractions.',
        priority: 'medium',
        daysOffset: 14,
      },
    ],
  },
];

/**
 * Intelligent general fallback decomposition for any arbitrary goal
 */
function createGeneralPlan(goalText) {
  const cleanGoal = goalText.trim();
  return [
    {
      title: `Define scope & success criteria for: "${cleanGoal.slice(0, 40)}"`,
      notes: 'Clarify exact outcomes, budget, deadlines, and what "done" looks like.',
      priority: 'high',
      daysOffset: 2,
    },
    {
      title: 'Conduct initial research & collect resources',
      notes: 'Study 2-3 successful examples, gather tutorials, tools, or templates needed.',
      priority: 'medium',
      daysOffset: 4,
    },
    {
      title: 'Set up tools and workspace foundation',
      notes: 'Prepare the environment, software, or accounts necessary to begin work.',
      priority: 'medium',
      daysOffset: 7,
    },
    {
      title: 'Execute core MVP milestone',
      notes: 'Focus on producing the first functional prototype or tangible first draft.',
      priority: 'high',
      daysOffset: 11,
    },
    {
      title: 'Review progress, test, and refine details',
      notes: 'Identify gaps or bottlenecks, ask for feedback, and polish the work.',
      priority: 'medium',
      daysOffset: 15,
    },
    {
      title: 'Finalize deliverable and celebrate completion',
      notes: 'Publish, submit, or launch your finished work and review key learnings.',
      priority: 'high',
      daysOffset: 18,
    },
  ];
}

/**
 * Main plan generator function
 */
export function generateTasksForGoal(goalText) {
  if (!goalText || typeof goalText !== 'string' || !goalText.trim()) {
    throw new Error('Goal text must be a non-empty string.');
  }

  const normalized = goalText.toLowerCase();

  // Find matching blueprint
  const matchedBlueprint = BLUEPRINTS.find(bp =>
    bp.keywords.some(kw => normalized.includes(kw))
  );

  const rawTasks = matchedBlueprint
    ? matchedBlueprint.tasks
    : createGeneralPlan(goalText);

  return rawTasks.map((t, index) => ({
    id: generateId(),
    title: t.title,
    notes: t.notes || '',
    priority: t.priority || 'medium',
    dueDate: getRelativeDate(t.daysOffset),
    completed: false,
    createdAt: new Date().toISOString(),
  }));
}
