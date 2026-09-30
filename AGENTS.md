# Plan2Action — AGENTS.md

## 1. Project Identity

Plan2Action is a beginner-friendly web application that helps users turn broad goals into actionable tasks.

Tagline:

> Turn your goals into action.

---

## 2. Developer Context

The developer is learning modern web/product development and has limited experience with:

- JavaScript
- React
- Next.js
- Tailwind CSS
- localStorage
- APIs

The AI coding agent must therefore operate in **teaching mode**.

Do not assume advanced knowledge.

---

## 3. Technology Stack

Use the following unless explicitly instructed otherwise:

- JavaScript
- React
- Next.js
- Tailwind CSS
- Browser localStorage
- Git/GitHub
- Vercel

Do not introduce TypeScript, PostgreSQL, Supabase, Django, Express or authentication unless there is a documented reason and the developer approves it.

---

## 4. Core Product Requirements

The MVP must support:

1. Goal input
2. Goal-to-task generation
3. Task display
4. Task completion
5. Task uncompletion
6. Manual task creation
7. Task editing
8. Task deletion
9. Priority
10. Optional due date
11. Task filtering
12. Progress calculation
13. localStorage persistence
14. Responsive desktop/mobile UI

---

## 5. AI Development Behaviour

### Important

Do not generate the entire application in one response or one operation.

Work incrementally.

Before a significant implementation:

1. Explain what is being built.
2. Explain why it is needed.
3. Identify the files involved.
4. Explain the important concepts.
5. Implement the smallest reasonable change.
6. Test the change.
7. Explain what changed.
8. Wait for the next development step when appropriate.

---

## 6. Teaching Mode

The developer wants to understand the code.

For important code:

- Explain what it does.
- Explain important syntax.
- Explain the data flow.
- Explain why the code is structured that way.
- Point out concepts that are new to a beginner.

Do not provide explanations so long that they prevent progress, but do not hide important concepts.

---

## 7. Comments

Use comments where they improve understanding.

Comments should explain:

- Non-obvious logic
- Important React concepts
- localStorage behaviour
- Data transformations
- Important event handling
- API boundaries

Do not comment every trivial line.

Avoid comments such as:

```javascript
// Set x to 5
const x = 5;
```

Prefer comments that explain why something is being done.

---

## 8. Simplicity Rule

Prefer:

> Simple, readable and understandable

over:

> Clever, abstract and unnecessarily scalable.

Do not introduce an abstraction unless it provides a clear benefit.

---

## 9. Dependencies

Do not install a new package without:

1. Explaining what it does.
2. Explaining why it is needed.
3. Explaining whether the project can work without it.
4. Getting developer approval.

Avoid unnecessary dependencies.

---

## 10. File Changes

Before changing multiple files:

- List the files that will change.
- Explain why each file needs to change.

Do not rewrite unrelated files.

Do not remove working code merely to use a different style unless there is a clear reason.

---

## 11. UI/UX Rules

Follow `UI_UX_SPEC.md`.

The UI must be:

- Responsive
- Clean
- Accessible
- Consistent
- Mobile-friendly

Do not invent major new UI patterns without discussing them.

---

## 12. Requirements Rules

Follow:

- `PRD.md`
- `SYSTEM_REQUIREMENTS.md`
- `UI_UX_SPEC.md`

If instructions conflict, identify the conflict before making a major decision.

---

## 13. Persistence

Use localStorage for the MVP.

Do not introduce a database unless explicitly approved.

Do not store sensitive information in localStorage.

---

## 14. AI API

The MVP must not depend on a paid external LLM API.

If an external AI API is proposed:

1. Explain the API.
2. Explain whether it costs money.
3. Explain API-key security.
4. Explain how it would fit into the existing architecture.
5. Do not expose API keys in client-side code.
6. Obtain approval before implementation.

---

## 15. Security

Never hard-code secrets.

Never place private API keys in frontend source code.

Use environment variables for secrets when an external service is introduced.

---

## 16. Testing

After implementing a feature:

- Write tests for all endpoints and core logic functions that you create and always validate that these endpoints and logic are working.
- Test the normal path.
- Test obvious invalid input.
- Test edge cases appropriate to the feature.
- Check the browser console.
- Check mobile responsiveness where relevant.

Do not assume that generated code works merely because it compiles.

---

## 17. Development Sequence

Prefer this order:

1. Project setup
2. Basic layout
3. Static UI
4. Goal input
5. Task data structure
6. Task rendering
7. Task completion
8. Add/edit/delete
9. Filtering
10. Progress
11. localStorage
12. Empty/loading/error states
13. Responsive refinement
14. Testing
15. Deployment
16. Optional AI/API enhancement

---

## 18. Learning Log

When a significant new concept is introduced, provide a short entry suitable for `LEARNING_LOG.md`.

Do not automatically rewrite the entire learning log.

---

## 19. Definition of Done

A feature is not considered complete until:

- It works.
- It has been tested.
- The developer understands its basic purpose.
- It does not unnecessarily break existing features.
- Its UI follows the project design.

---

## 20. Agent Principle

> Help the developer build the application while teaching the developer how the application works.

The objective is not merely to produce code.
