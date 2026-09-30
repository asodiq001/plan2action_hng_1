# Plan2Action — UI/UX Specification

**Version:** 1.0  
**Design direction:** Clean, friendly, focused productivity application  
**Primary platforms:** Desktop and mobile

---

# 1. Design Objective

The interface should make one idea immediately obvious:

> **You have a goal. Plan2Action helps you turn it into actions.**

The interface should feel:

- Clean
- Modern
- Friendly
- Calm
- Focused
- Easy for beginners
- Professional enough for a portfolio/demo

The UI should not feel like a complicated enterprise project-management system.

---

# 2. Visual Direction

## Primary visual concept

Use a light interface with a blue/purple primary colour family.

The visual language should include:

- Rounded cards
- Moderate border radius
- Soft shadows
- Generous whitespace
- Clear typography
- Strong primary CTA
- Simple line icons
- Subtle gradients used sparingly

---

# 3. Suggested Colour System

These are starting values and may be adjusted during implementation.

### Primary

`#4F46E5`

Use for:

- Primary buttons
- Active navigation
- Progress indicators
- Important interactive elements

### Primary dark

`#3730A3`

Use for:

- Hover states
- Dark emphasis

### Background

`#F8FAFC`

### Surface

`#FFFFFF`

### Main text

`#0F172A`

### Secondary text

`#64748B`

### Border

`#E2E8F0`

### Success

`#10B981`

### Warning

`#F59E0B`

### Error

`#EF4444`

### High priority badge

Soft red/pink background with dark red text.

### Medium priority badge

Soft amber background with dark amber text.

### Low priority badge

Soft blue/green background with dark text.

---

# 4. Typography

Use a clean sans-serif font.

Preferred direction:

- Inter or a similar modern sans-serif.

### Suggested hierarchy

H1:
- 30–36px desktop
- 26–30px mobile
- Bold

H2:
- 22–26px
- Semibold

H3:
- 18–20px
- Semibold

Body:
- 15–16px

Small:
- 13–14px

The design should prioritize readability rather than decorative typography.

---

# 5. Desktop Layout

The desktop application should use a two-part structure:

```text
┌─────────────────────────────────────────────────────────────┐
│ Sidebar       │ Main content                                │
│               │                                              │
│ Logo          │ Header                                       │
│ Dashboard     │                                              │
│ My Tasks      │ Goal input / hero section                    │
│ Goals         │                                              │
│ Settings      │ Task list + progress                         │
│               │                                              │
│ Motivation    │                                              │
└─────────────────────────────────────────────────────────────┘
```

### Sidebar

Contains:

- Plan2Action logo
- Dashboard
- My Tasks
- Goals
- Settings

The sidebar may contain a small motivational card near the bottom.

### Main area

Contains:

1. Header
2. Goal/hero section
3. Task section
4. Progress indicator
5. Supporting information

---

# 6. Mobile Layout

Mobile should not simply shrink the desktop layout.

Use a mobile-specific arrangement.

```text
┌──────────────────────────┐
│ Logo              Menu   │
├──────────────────────────┤
│ Goal introduction        │
│                          │
│ Goal input               │
│                          │
│ [ Generate Plan ]        │
│                          │
│ Progress                 │
│                          │
│ My Tasks                 │
│                          │
│ Task                     │
│ Task                     │
│ Task                     │
│                          │
├──────────────────────────┤
│ Home Tasks Goals Settings│
└──────────────────────────┘
```

A bottom navigation can be used for the primary mobile navigation.

---

# 7. Main Dashboard

## Hero section

Primary heading:

> **Turn your goals into action**

Supporting text:

> Break down your goals into simple, actionable tasks so you can make real progress.

Goal input placeholder:

> What do you want to accomplish?

Primary button:

> Generate Plan

---

# 8. Example Goal

The visual design can demonstrate:

> I want to start a graphic design business.

This is only demonstration content and should not be hard-coded as the user's permanent goal.

---

# 9. Task Section

Heading:

> My Tasks

Filter controls:

- All
- Pending
- Completed

Sort control:

- Priority
- Due date
- Created date

---

# 10. Task Card

Each task should visually contain:

```text
☐  Create portfolio
   Design a simple portfolio to showcase your work

   HIGH       Due: May 5
```

The task should provide access to:

- Completion checkbox
- Edit
- Delete
- Priority
- Due date

Avoid overcrowding the card.

---

# 11. Progress

Display:

> Overall Progress

Example:

```text
██████████░░░░░░░░░░ 43%

3 of 7 tasks completed
```

Progress should update immediately when the user changes task status.

---

# 12. Add Task Modal / Form

Fields:

### Task title
Placeholder:

> e.g. Create portfolio

### Priority

Options:

- High
- Medium
- Low

### Due date

Optional date field.

Buttons:

- Cancel
- Save task

---

# 13. Empty State

When there are no tasks:

Heading:

> No tasks yet

Supporting text:

> Create a goal and generate your first action plan.

CTA:

> Generate Plan

---

# 14. Loading State

When generating a plan:

Display:

> Creating your action plan...

Use a subtle spinner or animated indicator.

Do not leave the user wondering whether the button worked.

---

# 15. Error State

Heading:

> Something went wrong

Supporting text:

> We couldn't create your plan right now. Please try again.

Button:

> Try Again

---

# 16. Responsive Breakpoints

The exact breakpoints can be adjusted during implementation, but the design should generally consider:

- Small mobile
- Large mobile
- Tablet
- Desktop

Tailwind's responsive utilities may be used to implement this.

---

# 17. Interaction Principles

The UI should follow these principles:

1. Primary actions must be obvious.
2. Destructive actions should be visually distinguishable.
3. Forms should provide clear labels.
4. Feedback should be immediate.
5. Avoid unnecessary popups.
6. Avoid overwhelming the user with options.
7. Keep the main action visible.
8. Use consistent spacing.
9. Maintain consistent button styles.
10. Make mobile interaction comfortable.

---

# 18. MVP Screens

The MVP requires:

1. Dashboard
2. Goal input state
3. Generated task state
4. Add task form
5. Edit task form
6. Empty state
7. Loading state
8. Error state

Settings and additional pages can remain minimal.

---

# 19. Design Reference

The separately generated desktop and mobile visual mockups should be treated as a visual reference, not as an instruction to reproduce every decorative element exactly.

The implementation should prioritize:

- Layout
- Hierarchy
- Responsiveness
- Readability
- Usability
- Consistency

over decorative complexity.

---

# 20. Design Rule

> **If a visual element does not improve understanding or usability, it should not be added merely to make the interface look more complicated.**
