import { NextResponse } from 'next/server';
import { generateTasksForGoal } from '@/lib/planGenerator';

/**
 * POST /api/generate-plan
 * Request Body: { goal: string }
 * Response: { success: boolean, goal: string, tasks: Array }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { goal } = body || {};

    if (!goal || typeof goal !== 'string' || !goal.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid goal description.',
        },
        { status: 400 }
      );
    }

    const tasks = generateTasksForGoal(goal.trim());

    return NextResponse.json({
      success: true,
      goal: goal.trim(),
      tasks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error while generating plan.',
      },
      { status: 500 }
    );
  }
}
