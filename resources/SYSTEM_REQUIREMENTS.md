# Plan2Action — System Requirements Specification

**Version:** 1.0  
**Status:** MVP Specification  
**Platform:** Web  
**Deployment target:** Vercel

---

# 1. System Overview

Plan2Action is a client-focused web application that allows users to create goals, generate actionable tasks, manage those tasks and track progress.

The initial system is intentionally designed without authentication or a cloud database.

### Initial architecture

```text
User
  |
  v
Next.js / React interface
  |
  +--> Task management logic
  |
  +--> Goal-to-task generation logic
  |
  +--> localStorage
  |
  v
Browser
  |
  v
Vercel deployment
```

A future version may introduce a backend service, database and external LLM API.

---

# 2. Technology Requirements

## 2.1 Required technologies

- JavaScript
- React
- Next.js
- Tailwind CSS
- Browser localStorage
- Git/GitHub
- Vercel

## 2.2 Not required for MVP

- TypeScript
- PostgreSQL
- Supabase
- Django
- Express
- Authentication provider
- External LLM API
- Payment provider

The project may adopt these technologies later if there is a clear requirement.

---

# 3. Functional Requirements

## FR-01: Goal Input

The system shall provide a text input through which the user can enter a goal.

### Requirements

- Input must accept normal text.
- Empty submissions must be rejected.
- The interface should provide a clear example.
- The user must be able to edit the goal before generating a plan.

---

## FR-02: Task Generation

The system shall generate a list of actionable tasks from a submitted goal.

### Requirements

- Generated tasks must have meaningful titles.
- The system should avoid duplicate tasks.
- Tasks should be reasonably specific.
- The task-generation system should produce a manageable number of tasks.
- Generated tasks should be editable.

---

## FR-03: Task Display

The system shall display tasks in an organized list.

Each task should support:

- Title
- Completion status
- Priority
- Optional due date
- Edit action
- Delete action

---

## FR-04: Complete Task

The user shall be able to mark a task as completed or incomplete.

The interface shall visually distinguish completed tasks.

---

## FR-05: Add Task

The user shall be able to manually add a task.

Required information:

- Task title

Optional information:

- Priority
- Due date

---

## FR-06: Edit Task

The user shall be able to modify an existing task.

---

## FR-07: Delete Task

The user shall be able to remove an existing task.

A confirmation step may be used if appropriate.

---

## FR-08: Filtering

The user shall be able to view:

- All tasks
- Pending tasks
- Completed tasks

---

## FR-09: Progress

The system shall calculate task completion progress.

Example:

```text
Completed: 3
Total: 7
Progress: 43%
```

The progress indicator shall update when task status changes.

---

## FR-10: Persistence

The system shall save the current task state in browser localStorage.

The application shall retrieve saved data when the user returns to the application in the same browser.

---

## FR-11: Empty State

If no tasks exist, the application shall show a helpful empty-state message and provide an obvious way to create a plan.

---

## FR-12: Loading State

If a task-generation operation takes time, the interface shall provide feedback to the user.

---

## FR-13: Error State

If task generation fails, the system shall show a clear error message and provide an appropriate recovery action.

---

# 4. Data Requirements

A task should follow a simple structure similar to:

```javascript
{
  id: "unique-id",
  title: "Create portfolio",
  completed: false,
  priority: "high",
  dueDate: null
}
```

The goal may be represented as:

```javascript
{
  id: "unique-id",
  title: "Start a graphic design business",
  createdAt: "date/time"
}
```

The exact implementation may change during development.

---

# 5. Persistence Requirements

localStorage shall be used for MVP persistence.

The application should:

1. Save task data when tasks change.
2. Read saved task data when the application loads.
3. Handle the absence of saved data.
4. Handle invalid saved data safely.
5. Avoid storing unnecessary sensitive information.

---

# 6. Responsive Requirements

The application shall support:

### Mobile

Target starting width:

- approximately 320px and above

### Desktop

The interface should work comfortably on:

- laptops
- desktop monitors

The design should use responsive layouts rather than maintaining separate applications.

---

# 7. Accessibility Requirements

The MVP should:

- Use readable text sizes.
- Maintain sufficient contrast.
- Provide visible button labels where appropriate.
- Ensure interactive controls can be identified.
- Use form labels or accessible descriptions.
- Avoid relying only on colour to communicate status.

---

# 8. Performance Requirements

The MVP should:

- Load quickly.
- Avoid unnecessary dependencies.
- Avoid unnecessary network requests.
- Keep JavaScript reasonably simple.
- Avoid large assets where possible.

---

# 9. Security Requirements

For MVP:

- Do not store passwords.
- Do not request unnecessary personal information.
- Do not expose secret API keys in frontend code.
- If an external API is added later, secrets must be stored as environment variables.
- User-provided text must be handled safely.

---

# 10. Browser Requirements

The application should work on modern versions of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Testing should prioritize Chrome and a mobile browser because of the project deadline.

---

# 11. Deployment Requirements

The application shall be deployable to Vercel.

The final deployment should:

- Build successfully.
- Load without console-breaking errors.
- Preserve client-side functionality.
- Work on mobile and desktop.
- Provide a shareable public URL.

---

# 12. Testing Requirements

Before submission, test:

### Goal generation
- Normal goal
- Very short goal
- Empty goal
- Long goal

### Task management
- Add
- Edit
- Delete
- Complete
- Uncomplete

### Persistence
- Refresh browser
- Close/reopen browser
- Clear localStorage

### Responsive behaviour
- Mobile
- Tablet-sized viewport
- Desktop

### Error handling
- Invalid input
- Unexpected data
- Generation failure

---

# 13. Future Architecture

A future version could become:

```text
User
 |
 v
Next.js Frontend
 |
 v
Next.js Backend/API
 |
 +------> Database
 |
 +------> LLM API
 |
 v
Response
```

Authentication and cloud persistence can be added when the product requires multiple users or cross-device synchronization.
