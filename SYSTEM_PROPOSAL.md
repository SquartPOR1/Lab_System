# Laboratory Information Management System (LIMS) — System Proposal

## Project Name
Laboraty System — Clinical Laboratory Information Management System

## Overview
A production-grade LIMS for a clinical diagnostic laboratory. Manages the full specimen lifecycle from order entry to result reporting, supports multiple testing departments, enforces regulatory compliance (CLIA, CAP, ISO 15189, HIPAA), and integrates with laboratory analyzers and hospital EMR/EHR systems.

## Laboratory Departments Supported

| Department | Specimen Types | Common Tests |
|------------|----------------|--------------|
| Hematology | Whole blood (EDTA, citrate), bone marrow | CBC, differential, ESR, reticulocyte, PT/INR, aPTT |
| Clinical Chemistry | Serum, plasma, urine, CSF | Glucose, electrolytes, lipids, liver panel, renal panel, HbA1c |
| Immunoassay / Serology | Serum, plasma | Hormones, tumor markers, infectious disease serology, TSH, vitamin D |
| Microbiology | Swabs, urine, sputum, blood cultures, stool | Gram stain, culture & sensitivity, PCR, antigen detection |
| Histopathology / Cytology | Tissue biopsies, FNA, Pap smears | H&E stains, immunohistochemistry, Pap cytology |
| Blood Bank / Transfusion | Whole blood (EDTA), clotted blood | ABO/Rh typing, antibody screen, crossmatch, unit issue |
| Urinalysis / Urine Chemistry | Urine (random, 24-hour) | Dipstick, microscopy, protein/creatinine ratio |

## Core Modules

### 1. Order Entry & Specimen Reception
- Physician/clinic order entry (manual and HL7 ORM from EMR)
- Specimen collection labeling with barcode (Code 128 / QR)
- Receipt verification: patient ID, test menu, specimen type, collection time, fasting status
- Rejection rules: hemolyzed, clotted, insufficient quantity (QNS), wrong tube, mislabeled, expired
- Priority assignment: STAT, routine, timed, draw-and-hold

### 2. Specimen Tracking (Chain of Custody)
- Barcode scan at every touchpoint: reception → accessioning → processing → analyzer → storage → disposal
- Location tracking: storage refrigerator/freezer shelf, aliquot tracking
- Aliquot management: parent specimen → child aliquots for send-out testing
- Turnaround time (TAT) monitoring with breach alerts

### 3. Test Management & Result Entry
- Test catalog with LOINC codes, CPT codes, reference ranges (age/sex/pregnancy-adjusted)
- Manual result entry with validation rules (range, delta check, critical limits)
- Auto-flagging: normal, low, high, critical, abnormal
- Reflex testing rules (e.g., positive ANA → dsDNA automatically)
- Result correction/amendment with audit trail and reason code

### 4. Analyzer Integration (Instrument Interface)
- Bidirectional LIS-ASTM / HL7 LAL interfaces with chemistry, hematology, immunoassay, and coagulation analyzers
- Result auto-verification rules (auto-release normal results, hold abnormal for review)
- Instrument QC upload and calibration tracking
- Send-out testing: reference lab orders, tracking, result import

### 5. Validation & Release Workflow
- Multi-level result review: Technician → Technologist → Pathologist (for critical/abnormal)
- Electronic signature sign-off
- Critical value notification: phone call log, read-back verification, time-stamped
- Amended/corrected report generation with version history

### 6. Reporting & Distribution
- Patient result reports (PDF, HL7 ORU to EMR, patient portal)
- Critical value alert reports
- Panic value logs
- Custom reference intervals per location/clinic
- Daily/weekly/monthly workload and TAT reports
- Certificate of Analysis (CoA) for send-out and corporate clients

### 7. Quality Control (QC) & Quality Assurance (QA)
- Daily QC: Levy-Jennings charts, Westgard multi-rule violations (1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10x)
- QC lot management and expiry tracking
- Proficiency testing (PT) enrollment, sample testing, result submission
- Equipment preventive maintenance scheduling and logs
- Non-conformance / incident reporting and CAPA tracking

### 8. Inventory & Reagent Management
- Reagent and consumable stock levels with par alerts
- Reagent lot-to-specimen linkage (traceability)
- Expiry monitoring and auto-blocking of expired reagents on analyzers
- Purchase order and receiving workflow

### 9. Users, Roles & Access Control
- Roles: Lab Director, Pathologist, Supervisor, Technologist, Technician, Phlebotomist, Billing, IT Admin, Read-only
- Role-based permissions (result entry, validation, release, correction, admin)
- Two-factor authentication, session timeout, password policy
- Full audit trail: who, what, when, before/after values (21 CFR Part 11 / HIPAA audit requirements)

### 10. Billing & Revenue Cycle (Optional)
- Test pricing, insurance/CPT coding, claim generation
- Patient co-pay and balance tracking
- Medicare/Medicaid billing rules and ABN (Advance Beneficiary Notice) tracking

## Regulatory & Compliance Requirements
- **CLIA '88** — proficiency testing, personnel qualifications, QC
- **CAP (College of American Pathologists)** — checklist compliance, specimen integrity
- **ISO 15189** — medical laboratory quality and competence
- **HIPAA** — PHI protection, access controls, audit logs, BAAs
- **21 CFR Part 11** — electronic records and electronic signatures
- **CLSI** — CLSI guidelines for QC, reference ranges, TAT

## Web vs Desktop Application Recommendation

### Recommendation: Web Application (Client-Server / Cloud or On-Premise)

| Factor | Web Application | Desktop Application |
|--------|-----------------|---------------------|
| Multi-station access (reception, bench, office) | Browser from any workstation | Installed per PC |
| Central database | Single source of truth | Sync required between machines |
| Updates | Deploy once | Push to every workstation |
| Remote access (pathologist off-site, doctor portal) | Yes | No / complex VPN |
| Mobile result review | Responsive web / PWA | No |
| Offline operation | Limited (PWA cache) | Strong native offline |
| Analyzer serial/LAL interface | Via middleware/API | Easier direct COM port |
| IT overhead | Low (server + browsers) | High (per-machine install/patch) |
| Disaster recovery / backups | Centralized | Decentralized, error-prone |

### Recommended Architecture
**Web application** hosted on-premise or in a HIPAA-compliant cloud, accessed via Chrome/Edge/Firefox at every lab workstation. Use a lightweight **middleware service** for direct analyzer serial/USB communication if instruments lack network LAL/HL7 support. Optional **PWA** for offline specimen receipt and result viewing when network is down.

## Chosen Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Backend | Python (FastAPI) |
| Database | MySQL |
| Auth | Session-based auth (sessions stored in MySQL tables) |
| PDF Generation | Puppeteer / wkhtmltopdf / ReportLab |
| HL7/ASTM Interface | Python HL7 / MLLP listener |
| Container | Docker + Docker Compose |
| Deployment | On-premise VM or HIPAA-compliant cloud |

### Authentication Approach
- **Session-based auth stored in MySQL** (not JWT)
- `users` table: credentials, roles, MFA settings
- `sessions` table: session ID, user ID, expiry timestamp, IP, user agent
- Each request validates the session against MySQL before processing
- Fits your MySQL knowledge and keeps auth state database-connected


## Suggested Folder Structure

```
Laboraty System/
├── docs/                    # SOPs, regulatory docs, architecture diagrams
├── src/
│   ├── frontend/            # React/Vue SPA (order entry, results, QC, admin)
│   ├── backend/             # API, business rules, HL7/ASTM listeners
│   ├── middleware/          # Analyzer serial/USB interface service
│   └── shared/              # Types, constants, LOINC/CPT code tables
├── database/
│   ├── migrations/          # Schema migrations
│   └── seed/                # Reference ranges, test catalog, default users
├── reports/                 # Report templates (PDF/HTML)
├── tests/                   # Unit, integration, E2E (Cypress/Playwright)
├── docker-compose.yml
├── .env.example
└── README.md
```

## Database Core Entities (High-Level)
- `patients` — demographics, MRN, DOB, sex
- `orders` — test orders, ordering physician, priority, collection time
- `specimens` — barcode, specimen type, source, volume, receipt status, location
- `tests` — test catalog (LOINC, CPT, reference ranges, method, instrument)
- `results` — result values, units, flags, instrument ID, technician, validated by
- `qc_results` — daily QC values, lot numbers, Westgard violations
- `audit_log` — user, action, table, old value, new value, timestamp
- `users` / `user_roles` — RBAC, credentials, MFA
- `sessions` — session ID, user ID, expiry, IP, user agent (DB-connected auth)
- `inventory` — reagents, lots, expiry, par levels
- `instruments` — analyzer ID, calibration due, interface config

## Implementation Phases

### Phase 1 — MVP (Weeks 1–6)
- User auth & RBAC
- Order entry and specimen reception with barcode labeling
- Hematology & Chemistry test catalog with reference ranges
- Manual result entry with flagging and critical value alerts
- Basic PDF patient report
- Audit trail

### Phase 2 — Analyzer Integration & QC (Weeks 7–12)
- HL7/ASTM instrument interfaces
- Auto-verification rules
- Daily QC tracking and Levy-Jennings charts
- Rejection rules and specimen tracking

### Phase 3 — Reporting & Compliance (Weeks 13–18)
- HL7 ORU result messages to EMR
- Amended reports and electronic signatures
- Critical value notification log
- TAT and workload dashboards
- Inventory and reagent expiry alerts

### Phase 4 — Advanced (Optional)
- Send-out testing and reference lab integration
- Patient portal
- Blood bank crossmatch module
- Histopathology slide/image tracking
- Billing module

## Next Steps
1. Confirm lab departments, test menu, and analyzer makes/models
2. Validate regulatory requirements (CLIA, CAP, state lab license)
3. Select tech stack and hosting model (on-prem vs cloud)
4. Scaffold project structure and database schema
5. Build Phase 1 MVP: order entry → specimen → result → PDF report
