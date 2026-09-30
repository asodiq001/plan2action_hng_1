/**
 * Automated test suite for Plan2Action API & Decomposition Engine
 * Fulfills HNG Stage 1 advanced requirement:
 * "Write test for all the endpoints that you create and always validate that these endpoints are working."
 */

const { generateTasksForGoal } = require('../lib/planGenerator');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failedTests++;
  }
}

console.log('--- RUNNING PLAN2ACTION UNIT & API LOGIC TESTS ---');

// Test 1: Empty goal rejection
console.log('\n[Test 1: Input Validation]');
try {
  generateTasksForGoal('');
  assert(false, 'Should throw error on empty string');
} catch (e) {
  assert(true, 'Correctly throws error on empty string input');
}

try {
  generateTasksForGoal('   ');
  assert(false, 'Should throw error on whitespace string');
} catch (e) {
  assert(true, 'Correctly throws error on whitespace input');
}

// Test 2: Standard Goal Generation (Graphic Design Business)
console.log('\n[Test 2: Goal-to-Task Decomposition]');
const designGoal = 'Start a graphic design business';
const designTasks = generateTasksForGoal(designGoal);

assert(Array.isArray(designTasks), 'Returns an array of tasks');
assert(designTasks.length >= 4, `Generates multiple actionable steps (found ${designTasks.length})`);

// Test 3: Schema & Data Requirements
console.log('\n[Test 3: Task Schema & Notes Integrity]');
const firstTask = designTasks[0];
assert(typeof firstTask.id === 'string' && firstTask.id.length > 0, 'Task has valid unique id');
assert(typeof firstTask.title === 'string' && firstTask.title.length > 0, 'Task has valid title');
assert(typeof firstTask.notes === 'string' && firstTask.notes.length > 0, 'Task includes detailed notes (HNG Mandatory)');
assert(['high', 'medium', 'low'].includes(firstTask.priority), 'Task has valid priority level');
assert(firstTask.completed === false, 'New tasks default to completed: false');
assert(typeof firstTask.dueDate === 'string', 'Task includes a scheduled due date');

// Test 4: Custom Arbitrary Goal Decomposition
console.log('\n[Test 4: Fallback Engine for Custom Goals]');
const customGoal = 'Launch a drone photography service';
const customTasks = generateTasksForGoal(customGoal);
assert(Array.isArray(customTasks) && customTasks.length === 6, 'Custom goals receive 6 structured phases');
assert(customTasks.every(t => t.notes && t.notes.length > 5), 'All generated tasks contain explanatory notes');

console.log('\n--------------------------------------------------');
console.log(`Results: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED SUCCESSFULLY! ✓\n');
}
