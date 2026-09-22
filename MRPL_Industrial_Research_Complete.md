# 🏭 Complete Industrial Research Report
## Sovereign On-Premise Agentic AI Workbench for MRPL / Indian PSU Refineries

> **SIH Problem Statement ID: SIH26117**
> *"Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work"*
> — Mangalore Refinery and Petrochemicals Limited (MRPL)

---

# PART 1: MRPL COMPANY PROFILE & THE PROBLEM

## 1.1 Company Overview

| Parameter | Details |
|:---|:---|
| **Full Name** | Mangalore Refinery and Petrochemicals Limited (MRPL) |
| **Classification** | CPSE, Schedule "A", Miniratna Category-I |
| **Parent** | ONGC (71.88%), HPCL (16.96%), Public (~11.16%) |
| **Location** | Mudapadav, Kuthethoor, Mangaluru, Karnataka - 575030 |
| **Refining Capacity** | 15.0 MMTPA (operates at 17-18 MMTPA = 110-120% utilization) |
| **Nelson Complexity Index** | ~10.6–11.3 (among the most complex in Asia) |
| **Revenue** | ₹1,05,155–₹1,09,280 Crore (~$12.5–13.1B USD) |
| **Employees** | ~2,450 permanent + several thousand contract workers |
| **Retail Network** | 252+ "HiQ" branded fuel stations across southern India |

### Product Portfolio
- **BS-VI Fuels:** Motor Spirit (RON 91/95), High-Speed Diesel (<10 ppm S), ATF Jet A-1
- **LPG & Kerosene:** Domestic cylinder & pipeline dispatch
- **Heavy Products:** Fuel Oil, LSHS, Bitumen (VG-10/30/40)
- **Petrochemicals:** Polypropylene ("Mangpol" brand, 440 KTPA), Polymer Grade Propylene
- **Aromatics:** Para-xylene, Benzene (post-OMPL merger)
- **Others:** Elemental Sulphur, Petroleum Coke

### Strategic Infrastructure
- **SPM (Single Point Mooring):** Offshore deep-water terminal handling VLCCs up to 300,000 DWT
- **Subsea Pipeline:** 17 km crude transfer pipeline from SPM to refinery
- **ISPRL Link:** Direct pipeline to India's Strategic Petroleum Reserve caverns (1.5 MMT Mangalore + 2.5 MMT Padur)
- **Product Pipeline:** PMHBL (Petronet Mangalore-Hassan-Bangalore) for white oil dispatch
- **Water Security:** 30 MLD Seawater RO Desalination Plant at Tannirbhavi

---

## 1.2 Organizational Structure

```
                            Board of Directors
                       (Chairman: Chairman of ONGC)
                                    │
                         Managing Director (MD)
              ┌─────────────────────┴─────────────────────┐
    Director (Refinery)                         Director (Finance) & CFO
              │                                           │
  ┌───────────┼───────────┐                         ┌─────┴─────┐
Operations Maintenance Technical                   Finance &  Legal &
 & HSE        & Eng.   Services,                    Accounts  Company Sec.
                      IT & Projects
```

### Key Departments

| Department | Sub-divisions | Key Functions |
|:---|:---|:---|
| **Operations** | Refinery-I, II, III; Offsites & Utilities; Movement & Storage; CPP | 24x7 unit operation, shift management, production reporting |
| **Maintenance & Inspection** | Mechanical, Electrical, Instrumentation, Civil, Asset Integrity | Work orders, PM schedules, RBI, NDT, turnaround planning |
| **HSE** | Fire & Safety, PSM, Environmental Cell, Occupational Health | PTW system, HAZOP, MOC, CEMS monitoring, mock drills |
| **Quality Control Lab** | NABL-accredited (ISO 17025:2017) | Crude assays, product certification, BS-VI compliance testing |
| **Technical Services** | Process Eng., Planning (Aspen PIMS), Energy Cell, APC/Digital | Yield monitoring, LP optimization, energy audits, REVEAL AI suite |
| **Projects & Engineering** | EPCM, design, commissioning | Revamps, BS-VI upgrades, new unit construction |
| **Materials / Supply Chain** | Procurement, warehouse, vendor management | GeM portal procurement, spare parts, catalyst/chemicals |
| **IT & OT** | Enterprise IT, Industrial OT, Cybersecurity | SAP ERP, PI Historian, air-gap compliance, ISO 27001 |
| **HR & Corporate** | Talent, IR, CSR, communications | Recruitment, contractor compliance, safety culture |
| **Finance & Legal** | Accounts, treasury, legal | Cost accounting, crude hedging, GST/customs, governance |

---

## 1.3 Digital Maturity & Automation Architecture

MRPL has a sophisticated Purdue Model automation stack:

```
 LEVEL 4: Enterprise Network (IT)
 ┌─────────────────────────────────────────────────────────────┐
 │ SAP ERP (ECC 6.0 → S/4HANA), SAP BTP, GeM Procurement      │
 └──────────────────────────────┬──────────────────────────────┘
                                │ SECURE INDUSTRIAL DMZ & FIREWALLS
 LEVEL 3: Operations & Process Management (OT)
 ┌─────────────────────────────────────────────────────────────┐
 │ AVEVA / OSIsoft PI Historian, Aspen PIMS (LP Planning),      │
 │ LIMS (Lab Data), "REVEAL" AI Optimization Suite              │
 └──────────────────────────────┬──────────────────────────────┘
                                │ PROPRIETARY BUS / REDUNDANT NETWORK
 LEVEL 2: Supervisory & Control (OT)
 ┌─────────────────────────────────────────────────────────────┐
 │ DCS: Yokogawa CENTUM VP / CS 3000, Honeywell Experion PKS,  │
 │ Emerson DeltaV | SIS/ESD: Schneider Triconex (SIL-3 TMR)   │
 └──────────────────────────────┬──────────────────────────────┘
                                │ HARDWIRED / FIELDBUS / HART
 LEVEL 1 & 0: Field Devices & Sensing
 ┌─────────────────────────────────────────────────────────────┐
 │ Pressure/Temp/Flow Transmitters, Smart Control Valves,       │
 │ Bently Nevada 3500 Machinery Protection, CEMS Gas Analyzers │
 └─────────────────────────────────────────────────────────────┘
```

### MRPL's In-House AI: "REVEAL" Suite
MRPL has already built proprietary AI tools internally:

| Tool | Function | Achievement |
|:---|:---|:---|
| **PolyOptima** | Real-time polymer quality prediction (MFI, XS) in PP unit | Won Govt. of India Best Innovation Award 2022 |
| **Rotary Sentinel AI** | Multi-agent vibration monitoring & prescriptive diagnostics | Deployed on critical pumps & compressors |
| **CPP Optimizer** | Digital twin for steam balance & turbine heat rate optimization | Minimizes fuel gas consumption |
| **PFCC Real-Time Optimizer** | Hybrid AI for catalyst circulation & propylene selectivity | Maximizes petrochemical yield |

> **Key Insight:** MRPL already has internal AI capability. SIH26117 asks for a *general-purpose agentic workbench* that goes beyond specialized optimizers — they want Claude/ChatGPT-level capabilities but on-premise.

---

## 1.4 The Exact SIH Problem Statement: SIH26117

### Background (What MRPL Stated)
Refinery operations involve enormous volumes of **confidential, highly technical, proprietary data**:
- Engineering Drawings & P&IDs
- Unit SOPs and Emergency Operating Procedures (EOPs)
- Statutory Safety Standards (OISD, API, PESO)
- Plant Maintenance Records (failure logs, vibration spectra, UT records)
- Daily Operational Documents (DPR, Shift Handover, PTW logs, crude assays)

**No confidential operational data can leave the refinery premises** — violates CERT-In cybersecurity mandates, MoPNG data residency guidelines, and ISO 27001 policies.

### What MRPL Demands

| Requirement | Details |
|:---|:---|
| **100% Air-Gapped** | Must execute on local GPU servers with zero outbound network calls |
| **Open-Weight Models** | Qwen2.5, Qwen2.5-VL, Llama-3.2/3.3, Mistral, DeepSeek |
| **Multi-Agent ("Agentic AI")** | Not a chatbot — coordinated autonomous agents |
| **Multimodal** | Must read P&IDs, scanned drawings, photos of equipment |
| **Deterministic & Auditable** | No hallucination — traceable citations to exact document/page/clause |

### Specific Agent Types MRPL Wants

| Agent | Role |
|:---|:---|
| **Operations & Shift Agent** | Summarize shift handovers, extract anomaly patterns from DPRs |
| **Safety & Compliance Agent** | Cross-reference PTW requests against OISD-105, PSM protocols |
| **Reliability & Maintenance Agent** | Interpret vibration spectra, thermal imaging, recommend API seal plans |
| **Multimodal P&ID Reader** | Parse scanned engineering schematics, identify tagged instruments, trace isolation paths |

### Other MRPL SIH Problem Statements

| ID | Title | Track |
|:---|:---|:---|
| **SIH26118** | Passive Colorimetric H2S Wristband Dosimeter with AI Reading | Hardware |
| **SIH26119** | Indigenous GPU-Accelerated LP/MILP Solver (CPLEX Alternative) | Software |

---

## 1.5 MRPL's Key Pain Points

### 1. The Air-Gapped Data Sovereignty Paradox
OT systems are completely air-gapped. Engineers **cannot use** ChatGPT, Claude, Copilot, or any cloud AI for drafting memos, synthesizing HAZOP studies, or querying equipment history.

### 2. Manual Cognitive Load & Unstructured Data Silos
- Hundreds of field rounds recorded on **paper clipboards**
- Shift handovers are **verbal + manual typed notes** — human fatigue risks
- P&IDs, vendor manuals, inspection records spread across **isolated repositories** (30 years of accumulated documents)

### 3. Equipment Degradation from Sour Crude Processing
- Processing 30+ crude grades (heavy sour Arabian, high-TAN Latin American) accelerates naphthenic acid corrosion, HTHA, and stress cracking
- Turnaround management with 5,000-8,000 contractors requires **tens of thousands of work permits**

### 4. Aging Workforce (The Great Crew Change)
- Mass retirements of experienced Grade E-H officers who joined in 1980s-90s
- Deep institutional knowledge (how a vacuum column behaves during monsoon humidity) exists only in operators' minds
- Young GETs lack historical context for startups, upsets, and emergencies

### 5. Document Retrieval Bottleneck
- Historical drawings stored as physical blueprints, microfilms, or **unindexed raster PDF scans**
- During emergency leaks, engineers spend **hours or days** searching for the right P&ID revision
- Multiple conflicting revisions circulate between maintenance, operations, and EPC contractors

---

# PART 2: ALL AUTOMATABLE TASKS (Department-wise)

> **Key Statistic:** Engineers and operations personnel spend an estimated **32% to 45% of their active working hours** re-keying data between field clipboards, DCS screens, Excel spreadsheets, and SAP modules.

## 2.1 OPERATIONS DEPARTMENT

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 1 | **Shift Handover Log Writing** | Manual longhand diary entries in physical logbooks; transcribing DCS parameters, pump status, active LOTOs, bypassed alarms | 45-60 min/shift (2.5-3 hrs/day per unit across 3 shifts) | 3x daily | AI agent connects to DCS/PI Historian, detects all setpoint changes, trips, alarm bypasses; generates OISD-compliant structured handover draft; speech-to-text for field observations |
| 2 | **Daily Production Report (DPR)** | Pull flow totals from PI Historian, call dispatch terminals, manually calculate yields in linked Excel sheets | 2.5-4 hours every morning | Daily (365 days/year) | Autonomous agent ingests mass flow data, reconciles mass balances, flags unaccounted losses, compiles formatted DPR by 7:00 AM |
| 3 | **Tank Dipping & Level Recording** | Physically climb tanks (20m), brass dipping tapes, water-finding paste, manual strapping table lookups for volume conversion | 3-4 hrs/shift across 100+ tanks | 2-3x daily per tank | Connect to radar gauges, auto-calculate net standard volume; for mandatory manual dips, CV reads paste color on photo |
| 4 | **Field Instrument Readings (Round Sheets)** | Walk units with clipboards, record local Bourdon gauges, sight-glass levels, dial thermometers | 1.5-2 hrs/round (6 hrs/shift per operator) | Every 2-4 hours | ATEX tablet + Vision-Language Model reads analog gauges, validates against normal operating bands |
| 5 | **Panel Operator Log Entries** | Write alarm events, trip descriptions, tag numbers in physical registers | 1-1.5 hrs distributed across shift | 20-50 entries/shift | Agent parses DCS alarm/SOE stream, groups cascading alarms into single process events, auto-generates structured logs |
| 6 | **Process Deviation Reports** | Pull historian trends, past lab data, manually draft 3-5 page narrative | 3-5 hours per incident | 3-10x/month per unit | Agent auto-extracts excursion data, identifies correlations, drafts deviation narrative with automated trend charts |
| 7 | **Crude Assay Data Entry** | Manually enter 30-50 assay parameters from PDF/paper lab certificates into Excel/HYSYS crude databases | 1.5-2 hrs per crude parcel | 15-30x/month | OCR/LLM parses assay certificates, extracts properties, converts units, populates LP model |
| 8 | **Blending Ratio Calculations** | Heuristic Excel spreadsheets, iterative manual solver for octane/RVP/sulfur compliance | 2 hrs per blend batch | 15-20x/week | Physics-Informed Neural Network calculates optimal recipe in milliseconds, downloads setpoints to DCS blending skid |
| 9 | **Energy Consumption Tracking** | Manually collect fuel gas, steam, BFW data from unit logs, calculate MBN in Excel, prepare BEE PAT reports | 2 hrs daily + 3 days at month-end | Daily + Monthly | Agent streams metrics from smart meters/PI, computes dynamic MBN, pinpoints inefficiencies, drafts statutory reports |

---

## 2.2 MAINTENANCE DEPARTMENT

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 10 | **Work Order Creation (SAP PM)** | Paper defect notification → SAP IW21/IW31, manually lookup functional locations, equipment masters, cost centers | 20-30 min/WO × 15-25 WOs/day = 4-6 hrs/day | Daily | Voice/NLP: technician speaks, agent auto-identifies location, pulls equipment BOM, drafts SAP PM WO |
| 11 | **Equipment History Cards** | Record overhauls, clearances, alignments in physical cards or SAP long text — heavily neglected | 30 min - 1 hr per job | 5-15 interventions/day | Agent parses completed job sheets, alignment PDFs, extracts dimensions/serial numbers, appends to SAP PM |
| 12 | **PM Schedule Management** | Review SAP PM IP30, manually filter overdue PMs, negotiate shutdown windows in morning meetings | 2-3 hrs/day for planners | Daily + Monthly | Dynamic risk-based planner analyzes real-time health indicators, auto-reprioritizes PMs based on condition |
| 13 | **Spare Parts Inventory Tracking** | Cross-reference exploded diagrams, SAP MM, manually calculate reorder points | 1.5-2 hrs/day | Daily + Weekly | Predictive failure models + supply chain lead times → dynamic safety stocks, semantic matching of obsolete part codes |
| 14 | **Maintenance Procedure Docs (SMP)** | Copy from OEM manuals (500+ pages), merge with OISD/API guidelines, format in company Word templates | 10-20 hrs per SMP | Monthly updates | RAG-driven generator ingests OEM manuals, OISD guidelines, incident records → step-by-step checklist in seconds |
| 15 | **Root Cause Analysis (RCA)** | Committee manually compiles historian data, lab reports, operator statements into 20-40 page Fishbone/5-Why report | 15-30 engineering hours per RCA | 2-5 major RCAs/month | Multi-agent ingests events, trends, metallography, checks global failure databases, drafts comprehensive RCA |
| 16 | **Turnaround Planning** | 6-9 months of massive work-pack building: scope lists, ITPs, blind lists, crane plans, Primavera P6 charts across 25,000+ activities | Thousands of hours over 6-9 months | Every 3-5 years/unit | Agent ingests inspection findings, open WOs, equipment drawings → builds work packs, blind lists from P&IDs, optimizes P6 schedule |
| 17 | **Vibration Analysis Data Logging** | Walk plant with portable collectors (CSI/Bently), download FFT spectra, manually tag peaks, write monthly reports | 3-4 days/week data collection + 1.5 days report writing | Weekly/Fortnightly | Deep learning analyzes raw FFT spectra, distinguishes cavitation vs bearing defect vs looseness, auto-generates reports |
| 18 | **Corrosion Monitoring & NDT** | UT thickness at hundreds of TMLs → paper pads → Excel → calculate corrosion rates under API 570/510 | 2 hrs/day for data entry + calculation | Daily inspections | Bluetooth UT probes → auto-plot degradation curves, flag unexpected thinning, recalculate remaining life |

---

## 2.3 HSE (HEALTH, SAFETY, ENVIRONMENT)

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 19 | **Permit to Work (PTW)** | Multi-part carbon-copy paper forms (30+ check items), physical walk for 4 signatures, manual gas test recording | 45-75 min/permit × 40-100 permits/day = 10-20 man-hrs/morning | Daily | Digital PTW agent: verify isolations against P&IDs, check hazard databases, detect spatial/temporal clashes, ingest BLE gas detector data |
| 20 | **Safety Audit Checklists** | Paper checklists (OISD-STD-145/154/166) → walk → clipboard → transcribe to Excel | 2-3 hrs audit + 1.5 hrs report | Weekly + Monthly | CV from ATEX phone auto-tags non-conformances (missing fire extinguisher pins, corroded earthing), categorizes by OISD clause |
| 21 | **Incident/Near-Miss Reports** | Tedious paper forms or clunky intranet portals → operators avoid reporting → safety officer manually classifies | 45 min - 1.5 hrs per report | 15-40/month | Conversational bot in Hindi/Kannada/Tamil via voice/chat → LLM translates, extracts entities, categorizes under OISD taxonomy |
| 22 | **HAZOP Study Documentation** | Scribe manually types discussion in PHA-Pro/Excel: guide words, causes, consequences, safeguards, recommendations | 4-8 hrs/day for 2-6 weeks per project | Every MOC + capital project | Real-time HAZOP co-pilot: listens to meeting audio, auto-populates worksheet, queries CCPS databases for overlooked failure scenarios |
| 23 | **SDS/MSDS Management** | Manually collect 16-section SDS docs from suppliers, file in binders, check for updates | 10-15 hrs/month | Monthly + new chemical arrivals | Auto-extract 16 sections from PDFs, verify against MSIHC Rules, flag OEL changes, make searchable via voice |
| 24 | **Emergency Drill Documentation** | Stopwatch + manual milestone recording → compile Word report for OISD/District Emergency Authority | 4-6 hrs per drill report | Monthly drills + Quarterly exercises | Aggregate RFID/CCTV muster data, fire water sensors, radio logs → second-by-second timeline with OISD benchmark comparison |
| 25 | **OCEMS Environmental Monitoring** | Verify sensor data, reconcile drift, log calibrations, explain exceedances, submit to CPCB/SPCB portals | 1.5-2 hrs/day | Daily + Monthly/Quarterly reporting | Agent analyzes stack analyzer telemetry alongside firing conditions, detects drift, filters spurious spikes, prepares compliance summaries |
| 26 | **Hazardous Waste Tracking** | Manual Form 10 manifests (7 copies), track vehicle transport numbers, verify TSDF disposal | 1-2 hrs per dispatch | 2-5 dispatches/week | Auto-populate Form 10, track GPS transit, cross-check generation vs authorization limits, generate annual returns |

---

## 2.4 QUALITY CONTROL / LABORATORY

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 27 | **Lab Test Result Entry** | Write in paper bench notebooks → type into LIMS/SAP QM (QE51N) | 2-3 hrs/shift per chemist | Continuous (3 shifts, hundreds of samples/day) | Smart benchtop cameras read analyzer displays/strip charts, OCR extracts values, auto plausibility checks, publishes to LIMS |
| 28 | **Certificate of Analysis (COA)** | Pull LIMS results, cross-check against BIS specs, manually sign/stamp paper certificate | 20-30 min per batch | 20-50 certificates/day | Auto-check vs BIS/defence/export specs → generate digitally signed COA with QR verification → release SAP dispatch lock |
| 29 | **Off-Spec Product Reports** | Pull operating data, identify responsible blend component, coordinate re-processing/re-blending | 2-4 hrs per event | 5-15x/month | Detect spec violation in LIMS → trace upstream conditions → calculate exact re-blend recipe and minimum diluent volume |
| 30 | **Calibration Records** | Execute calibration routines, calculate R² curves, write logbook entries, schedule external NABL re-cals | 1-2 hrs/day across lab team | Daily checks + Monthly/Annual master | Auto-ingest calibration data, verify linearity against ISO 17025 criteria, flag failing slopes, log certificates |
| 31 | **SOP Updates** | Read 20-page updated ASTM/BIS method, compare word-by-word with internal SOP, re-draft | 8-16 hrs per SOP revision | 3-6 revisions/month | Semantic diff comparing new standard PDFs with existing SOPs, highlights procedural changes, drafts updated version |

---

## 2.5 TECHNICAL SERVICES / ENGINEERING

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 32 | **Engineering Calculations** | Mathcad/Excel with manual property inputs, compute pressure drops, heat duty, relief valve sizing | 4-8 hrs per calculation package | 5-10 packages/week | NL input → agent interfaces with HYSYS thermodynamics, executes under API 520/ISO 5167, outputs verified calc sheet |
| 33 | **Piping Stress Documentation** | CAESAR II model → manually extract nozzle loads → compare vendor limits → type into reports | 8-16 hrs per package | 2-4 reviews/week | Agent parses CAESAR II output files, evaluates stress ratios, checks nozzle loads vs API limits, generates report |
| 34 | **Equipment Datasheets** | Copy process conditions from HMB tables, lookup metallurgy guidelines, fill 3-5 page Excel/Word sheets | 3-6 hrs per datasheet | 10-20/month | Pull stream data from HYSYS simulation, query metallurgy specs, auto-populate API datasheets |
| 35 | **Technical Bid Evaluation (TBE)** | Read 500+ page vendor bids (3-6 vendors), cross-check compliance, build side-by-side Excel matrices | 30-60 engineering hours per tender | 2-6 major evaluations/month | Document AI ingests tender doc + all vendor PDFs, auto-populates compliance matrix, detects hidden deviations |
| 36 | **P&ID Review & Markup** | Red ink on A1/A0 prints or PDF markup: check line numbers, valve types, spec breaks, instrument tags | 4-8 hrs per drawing package | Ongoing daily during projects | CV parses P&ID symbols, cross-references against line lists, PFDs, drafting standards, flags missing isolation valves |
| 37 | **As-Built Documentation** | Red-line markups from field → junior engineers manually update AutoCAD/MicroStation months later → severe backlogs | 4-6 hrs per drawing | 20-50 drawings/month | CV recognizes hand-drawn changes on scanned redlines → converts to CAD modifications → updates EDMS |
| 38 | **Material Selection Reports** | Evaluate stream corrosivity, consult API 571/NACE MR0175, write lengthy justification reports | 12-24 hrs per study | 1-2x/month | RAG agent queries process compositions against NACE corrosion models, drafts report with cited standards |

---

## 2.6 PROJECTS DEPARTMENT

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 39 | **DPR (Detailed Project Report)** | 3-6 months compiling 200-400 page report from feasibility studies, clearance docs, cost indices | 150-300 engineering hours | 2-6 DPRs/year | Agent connects project scope with cost databases, standard specs, regulatory templates, drafts initial sections |
| 40 | **Vendor Bid Comparison** | Manually build commercial comparison spreadsheets (pricing, delivery, duties, payment terms) | 15-25 hrs per package | 4-8 packages/month | Extract pricing, tax, Incoterms from PDFs → normalize to common NPV/TCO baseline → comparative analysis |
| 41 | **Progress Reports (S-Curves)** | Collect field progress from contractors, input % completion to Primavera P6, plot S-curves, write narrative | 1.5-2 days/week | Weekly + Monthly | Drone 3D scans / site photos → CV calculates physical progress → auto-updates P6 WBS → generates report |
| 42 | **Bill of Quantities (BOQ)** | Manually measure pipe lengths, count valves, calculate concrete volumes from 2D/3D drawings | 20-40 hrs per package | 2-4 packages/month | Parse 3D CAD/BIM models → extract exact MTO → apply wastage/contingency → generate categorized BOQ |
| 43 | **Contractor Invoice Verification** | Physically inspect field work → manual MB register entries → cross-check invoice vs tender rates | 3-5 hrs/invoice × 20-50/month | Monthly billing | Match invoices against digitized MBs, PO rates, verified progress → detect over-billing, duplicate entries, GST errors |

---

## 2.7 FINANCE & PROCUREMENT

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 44 | **Purchase Requisition Processing** | Check specs, budget allocation, material classification, procurement mode (GeM/open tender) | 20-30 min/PR × 30-60 PRs/day | Daily | Screen PRs: verify spec completeness, check for duplicate inventory, validate budget, suggest optimal procurement route |
| 45 | **Three-Way Invoice Matching** | Cross-verify invoice vs PO vs GRN/SES, manual email exchanges for discrepancies | 15-25 min/invoice × thousands/month | Daily | OCR extracts invoice data → line-item matching against SAP PO + GRN → auto-clear matches, flag true exceptions |
| 46 | **Budget Variance Analysis** | Extract SAP FICO data → Excel → calculate variances → chase dept heads for justifications | 3-5 full working days at month-end | Monthly + Quarterly | Real-time budget monitoring → auto-analyze deviation drivers → draft variance commentaries for CFO |
| 47 | **Customs Documentation** | Reconcile Bills of Lading, Ullage Surveys, Commercial Invoices → file Bills of Entry on ICEGATE | 3-6 hrs per crude tanker | 20-60 shipments/month | Parse shipping documents via OCR, auto-calculate BCD/AIDC/IGST, populate ICEGATE filings |
| 48 | **Insurance Claims** | Compile equipment failure evidence, maintenance records, financial impact assessment | 15-30 hrs per claim | 3-6 claims/year | Agent assembles failure timeline from historian/SAP PM, calculates business interruption impact, drafts claim documentation |

---

## 2.8 HR, LEGAL & ADMINISTRATION

| # | Task | Current Method | Time Spent | Frequency | AI Automation Strategy |
|:---|:---|:---|:---|:---|:---|
| 49 | **Training Record Maintenance** | Track course completion, competency assessments, statutory certification renewals in spreadsheets | 10-15 hrs/month | Monthly | Auto-extract completion certificates, track renewal deadlines, generate compliance gap reports |
| 50 | **Contract Labour Management** | Verify contractor qualifications, track gate passes, monitor BOCW compliance | 2-3 hrs/day during turnarounds | Daily during TA | RFID/biometric data → auto-verify qualifications, generate real-time headcounts, flag expired certifications |
| 51 | **Regulatory Filing Preparation** | Compile data for OISD/PESO/CPCB/PNGRB statutory returns | 20-30 hrs/filing | Monthly/Quarterly/Annual | Agent aggregates data from multiple systems (DCS, SAP, LIMS) → auto-populates regulatory templates |
| 52 | **Contract Review & Abstraction** | Legal team manually reads 100+ page contracts, extracts key clauses, obligations, deadlines | 8-15 hrs per contract | 5-10 contracts/month | LLM extracts key terms, obligations, penalty clauses, generates structured summary with risk flags |

---

## 2.9 SUMMARY: TOTAL PRODUCTIVITY IMPACT

| Department | Tasks Identified | Avg Hours Saved/Month | Current Method |
|:---|:---|:---|:---|
| Operations | 9 major tasks | ~400-600 hours | Paper logs, Excel, manual DCS reads |
| Maintenance | 9 major tasks | ~500-800 hours | Paper WOs, manual SAP entry, clipboard rounds |
| HSE | 8 major tasks | ~200-350 hours | Carbon-copy permits, paper checklists, Word reports |
| QC Laboratory | 5 major tasks | ~300-450 hours | Paper notebooks, manual LIMS entry |
| Technical Services | 7 major tasks | ~400-600 hours | Manual calculations, red-ink markups |
| Projects | 5 major tasks | ~200-400 hours | Manual progress tracking, Excel BOQs |
| Finance & Procurement | 5 major tasks | ~300-500 hours | Manual SAP matching, Excel analysis |
| HR/Legal/Admin | 4 major tasks | ~100-200 hours | Spreadsheet tracking, manual filing |
| **TOTAL** | **52 major tasks** | **~2,400-3,900 hours/month** | **Primarily manual/paper-based** |

> **Key Insight:** MRPL's ~2,450 permanent employees collectively spend an estimated **2,400-3,900 hours per month** on repetitive, low-value knowledge work that AI can automate — equivalent to **15-25 full-time employees** doing nothing but data transcription.

---

# PART 3: TECH GADGETS CONNECTABLE VIA MCP

## 3.1 Integration Architecture Overview

```
[Level 4 / Enterprise]
       ▲  AI Agent Orchestrator (Agentic AI Workbench)
       │  MCP Client (JSON-RPC over stdio / SSE / WebSockets)
───────┼──────────────────────────────────────────────────────
[Level 3.5 / DMZ & Edge]
       ▼  Industrial MCP Servers (Python FastMCP / Node.js)
          ├── Hardware Bridges (pymodbus, asyncua, pycomm3)
          ├── Protocol Gateways (Kepware, Ignition, Node-RED)
          └── Edge Storage / Cache (Redis, InfluxDB, File Watchers)
───────┼──────────────────────────────────────────────────────
[Level 2-3 / Supervisory & DCS/SCADA/Historian]
          ├── DCS: Yokogawa CENTUM VP, Honeywell Experion PKS
          ├── SCADA: Ignition (WebDev/Sparkplug B)
          └── Historians: AVEVA PI Web API, Aspen InfoPlus.21
───────┼──────────────────────────────────────────────────────
[Level 1 / Basic Control (PLCs & RTUs)]
          ├── Siemens S7 (OPC-UA), Allen-Bradley (CIP)
          └── Safety Systems: Triconex (READ-ONLY ONLY!)
───────┼──────────────────────────────────────────────────────
[Level 0 / Field Equipment & Physical Hardware]
          ├── Process Sensors, Vision Cameras, Thermal Cameras
          ├── Handhelds, RFID, Gas Detectors, UT Gauges
          ├── Lab Instruments (GC, HPLC, Flash Point Testers)
          ├── IT Infrastructure (Printers, NAS, GPU, UPS)
          └── Communications (PBX, Radio, PAGA, SMS)
```

---

## 3.2 Category 1: Industrial Process Sensors

| Device | Examples | Protocol | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **Temperature (RTD/TC)** | Rosemount 3144P, Yokogawa YTA610 | 4-20mA HART, WirelessHART | HART Mux → Modbus TCP → `pymodbus` → FastMCP | PV (°C), sensor drift flags, burnout status | Cross-sensor anomaly triangulation |
| **Pressure** | Rosemount 3051S, Yokogawa EJX | HART, Profibus-PA, Modbus | Same as above | Process pressure (barg), diaphragm health | Correlate with flow/level for leak detection |
| **Flow (Coriolis/Ultrasonic)** | Emerson Micro Motion, E+H Promass | Modbus RTU/TCP, EtherNet/IP | `pymodbus` / `pycomm3` → FastMCP | Mass flow (kg/h), totalizer, empty pipe flag | Material balance reconciliation |
| **Level (Radar/GWR)** | Rosemount 5408, Vega VEGAPULS | HART, Modbus, Foundation FF | Gateway → OPC-UA → `asyncua` → FastMCP | Tank level (%), inventory volume | Auto-calculate net standard volume |
| **Gas Detectors (LEL/H2S)** | Honeywell Sensepoint XCD, Det-Tronics | Modbus RTU (RS-485), 4-20mA | Moxa NPort → `pymodbus` → FastMCP | Gas ppm/% LEL, alarm flags, sensor drift | Emergency zone muster alerts |
| **Vibration Sensors** | Emerson AMS 9420, SKF Enlight | WirelessHART, BLE/LoRaWAN | WirelessHART Gateway → FastMCP | RMS velocity (mm/s), FFT spectra | Draft SAP PM work orders on anomaly |
| **Corrosion Probes** | Emerson Permasense, Cosasco | WirelessHART, Modbus | Same as vibration | Wall thickness (mm), corrosion rate (mpy) | Recalculate remaining life per API 570 |
| **Flame Detectors** | Det-Tronics X3301 | Modbus RS-485, 4-20mA | NPort serial-to-ethernet → FastMCP | Flame/no-flame, optics dirty flag | Cross-ref with gas detectors for response |

---

## 3.3 Category 2: DCS / SCADA / PLC Systems

| System | Products at MRPL | Native Interface | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **DCS** | Yokogawa CENTUM VP, Honeywell Experion, Emerson DeltaV | OPC-UA, Exaopc, CDA | `asyncua` Client → FastMCP | PV, SP, OP, controller mode, alarm stream | Supervisory setpoint optimization (clamped) |
| **SIS/ESD** | Schneider Triconex | ⚠️ READ-ONLY via diagnostic port | Restricted `asyncua` → FastMCP (read-only) | Permissive states, interlock status | **NEVER WRITE** — report only |
| **SCADA** | Ignition (if deployed) | WebDev REST, Sparkplug B MQTT | REST/MQTT client → FastMCP | Process tags, alarm priorities, SOE | Alarm flooding rationalization (EEMUA 191) |
| **Historian** | AVEVA/OSIsoft PI | PI Web API (REST) | `requests` → FastMCP | Historical trends (1s - 1min resolution) | Trend analysis, deviation detection |
| **PLCs** | Siemens S7, Allen-Bradley | OPC-UA / S7comm / CIP | `python-snap7` / `pycomm3` → FastMCP | Register values, I/O states, faults | Control loop health diagnostics |

> ⚠️ **CRITICAL SAFETY RULE:** AI agents must NEVER write to Safety Instrumented Systems (Triconex). All SIS access is strictly READ-ONLY with hardware-enforced interlocks.

---

## 3.4 Category 3: Document Scanners & Cameras

| Device | Examples | Protocol | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **Document Scanners** | Fujitsu ScanSnap, Epson WorkForce | Scan-to-Folder (SMB/FTP) | `watchdog` file monitor → OCR pipeline → FastMCP | Text from permits, P&IDs, MTRs, vendor manuals | Index in vector DB, extract signatures |
| **Machine Vision** | Cognex In-Sight, Basler ace 2 | GigE Vision, GenICam | `pypylon` / OpenCV → FastMCP | Defect detection, dimensional measurements | Flag non-conformances in inspection |
| **Thermal Cameras** | FLIR A400/A700, Hikvision HeatPro | RTSP, FLIR Atlas SDK, Modbus | RTSP grab / SDK → FastMCP | Per-pixel temperature matrix, hotspot °C | Classify severity per NETA guidelines |
| **Inspection Drones** | DJI Matrice 350 RTK + Zenmuse H20T | DJI Cloud API, RTSP, MQTT | REST/MQTT → FastMCP | Aerial photos, 3D point clouds, thermal | Tank roof inspection, flare stack survey |
| **CCTV/IP Cameras** | Axis, Bosch, Hanwha | ONVIF Profile S/G, RTSP | ONVIF + OpenCV → FastMCP | Motion events, PPE detection, zone intrusion | Safety enforcement alerts |

---

## 3.5 Category 4: Handheld Devices

| Device | Examples | Protocol | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **Rugged Tablets** | Samsung Tab Active 5, Panasonic Toughbook | HTTPS, WebSocket, MQTT | PWA → WebSocket → FastMCP | Field photos, voice notes, form data | Push context-aware SOPs to technician |
| **Barcode/QR Scanners** | Zebra TC57, Honeywell CT60 | Zebra DataWedge (Android Intent) | DataWedge → PWA → WebSocket → FastMCP | Scanned equipment tag IDs | Return equipment history, active permits |
| **RFID Readers** | Impinj Speedway R420, Zebra FX9600 | LLRP (EPCglobal) | Python `sllurp` → FastMCP | EPC tag IDs, worker badge IDs | Emergency muster reconciliation |
| **Portable Gas Detectors** | Honeywell BW Ultra, Dräger X-am 5800 | BLE GATT | BLE Gateway → MQTT → FastMCP | Real-time H2S/LEL/O2 exposure per worker | Immediate evacuation alerts if LEL >20% |
| **UT Thickness Gauges** | Olympus 38DL Plus, Baker Hughes DMS Go+ | USB/CSV export, RS-232 | CSV parser / `pyserial` → FastMCP | Wall thickness at TMLs (mm) | Calculate corrosion rate, remaining life (API 570) |
| **Vibration Analyzers** | SKF CMXA 80, Emerson AMS 2140 | USB docking, SD card, ODBC | File parser / ODBC → FastMCP | FFT spectra, time waveforms, PeakVue | Auto-diagnose bearing defects, misalignment |

---

## 3.6 Category 5: Laboratory Instruments

| Device | Examples | Protocol | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **Chromatographs (GC/HPLC)** | Agilent 8890, Waters ACQUITY, Shimadzu | CDS REST (Empower/OpenLab), AnIML | LIMS REST → FastMCP | Component concentrations, retention times | Quality feedforward to DCS, trigger retests |
| **Physical Analyzers** | Anton Paar DMA 4500, Koehler Flash Point | RS-232, USB, LabX API | `pyserial` / REST → FastMCP | Density, viscosity, flash point values | Auto-release COA if within spec |
| **pH/Conductivity Meters** | Mettler Toledo SevenExcellence | RS-232 ASCII stream | `pyserial` → FastMCP | pH, ORP (mV), conductivity (µS/cm) | Detect electrode drift, schedule cleaning |
| **Spectrophotometers** | PerkinElmer FTIR, Shimadzu UV | CSV/JCAMP-DX export | File parser → FastMCP | Absorption spectra, compound identification | Flag contamination in process streams |
| **LIMS System** | LabWare, SampleManager | Native REST/OData API | `requests` → FastMCP | All validated lab results + QC status | Generate COAs, trigger off-spec alerts |

---

## 3.7 Category 6: Office & IT Infrastructure

| Device | Examples | Protocol | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **Network Printers** | HP LaserJet Enterprise, Xerox AltaLink | IPP (RFC 8011), CUPS | `pycups` → FastMCP | Printer status, toner, paper level, queue | Print shift reports, permits, COAs |
| **NAS Storage** | Synology RackStation, TrueNAS | REST Web API, SMB/NFS | `requests` / mount → FastMCP | Storage pool space, RAID status, S.M.A.R.T. | Archive generated documents |
| **GPU Workstations** | Dell Precision 7960, HP Z8 G5 | `pynvml`, Redfish, Docker/Ollama API | `pynvml` / REST → FastMCP | GPU temp, VRAM, utilization, inference queue | Route workloads away from throttling GPUs |
| **UPS Systems** | APC Smart-UPS, Eaton 9PX | SNMP v2c/v3 | `pysnmp` → FastMCP | Battery %, runtime minutes, AC status | Initiate graceful shutdown if <10 min runtime |
| **Network Switches** | Cisco Catalyst, Moxa EDS-500 | SNMP, RESTCONF/NETCONF | `pysnmp` / REST → FastMCP | Port status, CRC errors, bandwidth | Isolate port on unauthorized MAC detection |

---

## 3.8 Category 7: Communication Devices

| Device | Examples | Protocol | MCP Bridge | Agent Reads | Agent Acts |
|:---|:---|:---|:---|:---|:---|
| **IP PBX/Phones** | Cisco CUCM, Asterisk, FreeSWITCH | SIP, Asterisk ARI/AMI | Asterisk ARI → FastMCP | Call state, extension status, DTMF responses | Auto-dial on-call engineer for unacknowledged alarms |
| **Walkie-Talkies** | Motorola MOTOTRBO | DMR radio → RoIP Gateway → SIP | RoIP Gateway → SIP/RTP → FastMCP | Radio ID, talkgroup, GPS, man-down alerts | Synthesize voice announcements on operations channel |
| **PAGA Systems** | Zenitel, Bosch Praesensa | Digital I/O, SIP, Modbus | Relay/SIP → FastMCP | Speaker line health, zone status | Targeted zone evacuation broadcast on verified gas leak |
| **SMS Gateways** | Teltonika, MultiTech, GSM modems | AT commands (serial), HTTP REST | `pyserial` / REST → FastMCP | Delivery receipts, incoming replies | Send batch SMS alerts to maintenance crew |

---

## 3.9 MCP Bridge Count Summary

| Category | Devices | MCP Servers Needed |
|:---|:---|:---|
| Process Sensors | 8 device types | 1 (unified sensor bridge via Modbus/OPC-UA) |
| DCS/SCADA/PLC | 5 system types | 1 (OPC-UA client bridge) |
| Scanners & Cameras | 5 device types | 2 (document watcher + vision/thermal) |
| Handhelds | 6 device types | 1 (WebSocket/BLE/RFID bridge) |
| Lab Instruments | 5 device types | 1 (LIMS + serial instrument bridge) |
| IT Infrastructure | 5 device types | 1 (SNMP + printing bridge) |
| Communications | 4 device types | 1 (PBX + radio + SMS bridge) |
| **TOTAL** | **38 device types** | **~8 MCP servers** |

> **Key Insight:** With just **~8 MCP server implementations**, the AI agent gains read/write access to the entire physical plant — from individual pressure transmitters to the PA system.

---

# PART 4: END-TO-END REFINERY PROCESS FLOW

## 4.1 The Complete Refinery Value Chain

```
[Crude Tankers: VLCC/Suezmax]
         │
         ▼
[SPM → Subsea Pipeline → Crude Tank Farm (ATG/Radar)]
         │ (LP Model-based Blending)
         ▼
[Electrostatic Desalter (2-Stage)]
         │
         ▼
[CDU — Crude Distillation Unit]
    ├── Light Naphtha → [Isomerization] → Gasoline blend
    ├── Heavy Naphtha → [NHT → CCR Reformer] → High-octane Reformate + H₂
    ├── Kerosene → [Merox/Hydrotreater] → ATF Jet A-1
    ├── Diesel → [DHDT/DHDS] → BS-VI HSD (<10 ppm S)
    └── Atmospheric Residue
              │
              ▼
        [VDU — Vacuum Distillation Unit]
            ├── LVGO/HVGO → [Hydrocracker] → Premium Diesel + ATF
            │                [PFCC] → Gasoline + Propylene → [PPU] → Polypropylene
            └── Vacuum Residue → [Delayed Coker] → Coker Gas Oils + Petcoke
                                                     │
                                    ┌────────────────┴────────────────┐
                              [Amine Treating]                  [Sulphur Recovery]
                              [Sour Water Stripping]            [TGTU → 99.9% recovery]
                                                     │
                                              [Product Blending]
                                    ├── In-Line Blending (ILB) with NIR analyzers
                                    ├── Additive injection (lubricity, detergent, ethanol)
                                    └── Final Tank Farm Storage
                                              │
                              ┌───────────────┼───────────────┐
                        [Pipeline]      [Rail Gantry]    [Road TLF]    [Coastal Jetty]
```

## 4.2 Document-Heavy Engineering Workflow Lifecycle

```
[Plant Need / Failure / Debottleneck]
         │
         ▼
[Management of Change (MOC)] ──► [HAZOP / LOPA / SIL Assessment]
         │                                    │
         ▼                                    ▼
[Engineering Deliverables]          [Material Requisition (MR)]
  • PFD / P&ID Redlines              • Technical Bid Eval (TBE)
  • Equipment Datasheets              • Vendor Doc Review (VDR)
  • Loop Diagrams / C&E Matrix              │
         │                                    ▼
         ▼                         [Fabrication & Inspection]
[Field Modification]                 • ITP / NDT / Mill Certs
         │                                    │
         └──────────────┬─────────────────────┘
                        │
                        ▼
         [Pre-Startup Safety Review (PSSR)]
           • OISD-GDN-206 Walkthrough
           • Punchlist (Cat-A: must fix / Cat-B: can defer)
           • Interlock & Relief Valve Certification
                        │
                        ▼
         [Hydrocarbon Introduction & Commissioning]
                        │
                        ▼
         [Reliability & Integrity Management]
           • API 510/570/653 Inspections
           • API 580/581 Risk-Based Inspection
           • API 579 Fitness-for-Service
           • RCM / FMEA Strategy Loop
```

---

# PART 5: SAFETY & GOVERNANCE GUARDRAILS FOR AI

## 5.1 Absolute Rules for Industrial AI

| Rule | Details |
|:---|:---|
| **SIS is UNTOUCHABLE** | AI agents can NEVER write to Safety Instrumented Systems (Triconex). READ-ONLY with hardware enforcement. |
| **Deterministic Clamps** | Every supervisory setpoint write tool must enforce hard-coded min/max bounds in MCP server code, regardless of LLM request |
| **Human-in-the-Loop** | All valve actuations, setpoint changes, and work order releases require operator approval token before execution |
| **Full Audit Trail** | Every MCP tool invocation logged to append-only, tamper-resistant audit log with ms timestamps |
| **No Hallucination** | All AI outputs must provide traceable citations (document name, page, clause) — this is MRPL's explicit requirement |
| **Purdue Model Compliance** | MCP servers must reside in Level 3/3.5 DMZ. No direct LLM connection to Level 0/1 field devices |
| **IEC 62443 Zones** | Proper industrial cybersecurity zone segmentation per IEC 62443 |

---

# APPENDIX: MRPL-SPECIFIC CERTIFICATIONS

| Standard | Scope |
|:---|:---|
| ISO 9001:2015 | Quality Management (Refining, Petrochemicals, Supply) |
| ISO 14001:2015 | Environmental Management |
| ISO 45001:2018 | Occupational Health & Safety |
| ISO 50001:2018 | Energy Management |
| ISO/IEC 27001:2022 | Information Security Management (ISMS) |
| ISO/IEC 17025:2017 | NABL Lab Accreditation |
| AS9100:D | Aviation, Space & Defense (ATF manufacturing) |
