# Backend Follow-Up

> **Later phase:** Current work is frontend-only. Do not start backend implementation until the frontend phase is reviewed and approved.

This is a reminder for when backend work begins. The current frontend is a prototype using demo data; it is not connected to a real LIS and is not approved for clinical use.

## Before starting

- [ ] Review the current frontend workflows and agree on the first narrow backend use case.
- [ ] Confirm intended users, roles, data access, hosting, and applicable privacy/security requirements with qualified professionals.
- [ ] Keep development and testing on synthetic data. Do not use real patient information in development.
- [ ] Decide and document the backend framework, database, migrations, deployment, backup, and recovery approach.

## Backend work to plan

- [ ] Add a server-side API and health check.
- [ ] Design persistent models for users, patients, orders, specimens, tests, and results.
- [ ] Enforce input validation, authorization, and workflow transitions on the server.
- [ ] Add individual authentication, role-based permissions, and audit history for sensitive actions.
- [ ] Integrate the frontend with the API; remove mock-only success states once equivalent server behavior exists.
- [ ] Add automated tests for permissions, validation, workflow transitions, errors, and persistence.
- [ ] Plan operational monitoring, backup/restore drills, security review, and controlled releases.

## Clinical and integration safeguards

- [ ] Do not invent reference intervals, critical limits, or interpretation rules. Obtain test-specific requirements and qualified laboratory review before implementing them.
- [ ] Keep analyzer and EHR integrations in a sandbox until message mapping, retries, duplicate handling, error handling, and downtime behavior are tested.
- [ ] Define how critical-value communication, acknowledgment, corrections, and result release are handled and audited.
- [ ] Get qualified laboratory, privacy, security, and regulatory review before considering any clinical use.

## Completion note

Adding backend code does not by itself make the system clinically validated, compliant, or production-ready. Track requirements, approvals, and test evidence separately before any real-world use.