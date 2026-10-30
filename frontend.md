# Frontend Implementation Plan

> Current scope: frontend design and functionality only. Backend work is tracked separately in `BACKEND_FOLLOW_UP.md` and should wait until the frontend phase is reviewed.

## Working Rules

- Inspect the existing screen and nearby components before changing them.
- Implement one focused phase or feature at a time; review it before starting the next.
- Preserve the current React, TypeScript, Tailwind, and Vite setup unless a change is approved.
- Use synthetic/demo data only. Make mock behavior clear in the interface.
- Keep clinical values and interpretation rules as demo fixtures; do not treat them as medically validated.
- For each change, check desktop and mobile layouts, keyboard/accessibility behavior, and relevant empty, loading, success, and error states.
- Run the frontend build and any relevant tests after implementation.

## Phases

### Phase 1 — Frontend Review

- [ ] Review the existing pages, navigation, shared components, and styles.
- [ ] List current demo-only behavior and the highest-priority design or usability gaps.
- [ ] Agree on the first screen or workflow to improve.

### Phase 2 — Design Foundation

- [ ] Establish consistent typography, color, spacing, borders, and focus states using the existing styling approach.
- [ ] Improve shared layout and navigation without changing workflow behavior.
- [ ] Check responsive layouts and accessibility.

### Phase 3 — Screen Design

- [ ] Update one selected screen at a time.
- [ ] Ensure forms, tables, statuses, and actions are clear and usable.
- [ ] Include appropriate loading, empty, validation, success, and error states.
- [ ] Verify desktop and mobile presentation.

### Phase 4 — Frontend Functions

- [ ] Implement the agreed client-side interactions using the existing app patterns.
- [ ] Validate user input and show actionable errors.
- [ ] Keep mock/demo operations clearly labeled and avoid implying data is persisted when it is not.
- [ ] Add or update focused tests for the changed interactions.

### Phase 5 — Review and Finish

- [ ] Run the production build and relevant tests.
- [ ] Manually verify the updated workflow in the browser at desktop and mobile sizes.
- [ ] Review changed files and note remaining frontend limitations.
- [ ] Stop for review before selecting the next phase or feature.

## Feature Request Template

- Screen or workflow:
- Design changes:
- User interactions/functions:
- Required states and validation:
- Acceptance checks:
- Out of scope: