# R2200 SiteTrack — Setup & Operating Guide

**Project:** R2200 / M-523 — Sharjah
**Programme:** `523-25-Final for Submission.xer` (project **523-25G-9**) · 2,821 activities · 17-Mar-26 → **24-Aug-27**
**Planned curve:** `S Curve-Revised.xlsx` — the issued, accepted curve. **AED 250,604,999.74**
**Rev:** 7.0 · 17-Aug-26

---

## 1. What this is

Two things in one package:

| For | What they get |
|---|---|
| **Site engineers** | A phone/tablet app for the daily record — progress quantities, site diary (manpower, equipment, weather), delay & disruption events, photos, IR/NCR. Works with **no internet on site**. |
| **You (planning)** | A live dashboard on the same data — cost-weighted % complete, slippage vs baseline, SPI Early and Late, resources used vs planned with efficiencies, S-curve, and exports that feed the weekly deck and the P6 update. |

The activity list, dates, cost loading, quantities, productivity rates, trades and equipment all come out of the **XER**; the Planned Early and Planned Late curves come from the **issued S-curve workbook**. Nothing is typed in twice.

---

## 2. Install — 5 minutes, one PC

Put the whole `R2200-SiteTrack` folder anywhere on the office PC that stays on (or the site office PC).

1. Double-click **`START-SERVER.bat`**.
2. A black window opens and prints two addresses:

```
On this PC        :  http://localhost:8080
On the office WiFi:  http://192.168.1.45:8080   <-- give this to the engineers
```

3. Leave that window open. That's the server.

**If it says Node.js and Python were not found:** install either one (both are free, either works) and run the file again.
- Node.js — https://nodejs.org — take the LTS installer, click through.
- Python — https://www.python.org/downloads — tick *Add python.exe to PATH* on the first screen.

**Give the PC a fixed IP** (or a DHCP reservation on the office router). If the IP changes, the engineers' saved link breaks and — more importantly — the browser treats it as a different app and their offline data would sit under the old address. Ask IT for a reservation on this one machine.

**Firewall:** the first run may pop a Windows Firewall prompt. Tick *Private networks* and allow. Without this, phones on the WiFi cannot reach it.

---

## 3. Set up the users — do this first

Open `http://localhost:8080` on the server PC, sign in as **Planning Engineer**, go to **Setup**.

For each site engineer: add a user, set the role to **Site Engineer**, and tick the **areas** they record against (Bridge 2, Zone-A3, Zone-D, and so on). If you tick nothing, they see everything.

- Areas come straight from the baseline codes — bridges from the Bridges code, zones from the Zones code, then Box Culvert / Precast Yard / the service packages.
- A **PIN** is optional. It stops the wrong person entering under someone else's name; it is not real security. Anyone on the office WiFi can reach the app.
- Roles: **Planning/Admin** (everything), **Site Engineer** (capture + their own scope), **Viewer** (read-only, no entry).

---

## 4. Set up each engineer's phone — 2 minutes each

On the phone, connected to the **office WiFi**:

1. Open **Chrome** and go to the WiFi address, e.g. `http://192.168.1.45:8080`
2. Menu (⋮) → **Add to Home screen** → Install.
3. Open the new icon, pick their name, done.

Step 2 is what makes it work offline. It caches the app on the phone. After that the icon opens instantly, on site, with no signal.

**iPhone:** open in **Safari** (not Chrome) → Share → *Add to Home Screen*.

---

## 5. How a day runs

**On site — no signal needed.**
- **Progress Entry** — filter to their area and enter the day's progress. **Every activity takes either form of entry**: quantity-loaded activities open on *Enter quantity* (qty done today; the app shows baseline, cumulative, remaining and the planned rate/day) with an *Enter %* toggle beside it for a cumulative %-complete instead; activities without a baseline quantity take a cumulative % directly. Where both kinds of entry exist on one activity, the **higher reading governs** (progress never silently goes backwards); a cumulative % can be corrected by simply entering the right value — the latest % governs among % entries. **Mistaken entry?** Any entry can be **voided**: open the activity's entry history (ⓘ), hit **Void** on the wrong line and give a reason. The entry is struck out, excluded from every figure (the activity recalculates from the remaining entries), and kept in the register and the exported audit log with who voided it, when and why — nothing is ever hard-deleted. Engineers void their own entries; the planner can void any entry. Voids sync like any other record.
- **Daily Record** — manpower by trade, equipment with working/idle/breakdown hours, weather, stoppages, visitors.
- **Delay Events** — anything that stopped or disrupted work. Facts and references only.
- **IR / NCR** — inspection requests and non-conformances.
- Photos attach to any of the above, straight from the camera.

Everything saves on the phone immediately. The top-right chip shows **`n queued`**.

**Back at the office** — the phone joins the WiFi and the queue pushes itself to the server within a few seconds. The chip turns green: **Synced**. Nothing for anyone to remember to press.

**If an engineer never comes to the office:** Exports → *Full data backup (JSON)* → send you the file on WhatsApp/email → you drop it into Exports → *Import*. Merges by record, newest wins, safe to re-import.

---

## 5a. Filters — Progress Entry, Look-ahead, Dashboard and BOQ / Area

All four views carry the same filter bar, ordered down the WBS:

| Group | Filters |
|---|---|
| **Programme** | Main WBS (Construction / Engineering / Procurement / Pre-Construction / Handing Over) · Section of works (Bridges / Roads & Zones / Services / Structures / General & Enabling) |
| **Structure** | Bridge · Bridge section · Bridge element · Location |
| **Roads & zones** | Zone · Road name · Position on road |
| **Work** | Type of work (66 values — Formwork, Concrete, Reinforcement, Piling, Sub-base, Wet Mix, Asphalt…) · free-text search |
| **+ More filters** | BOQ part · Milestone · Area · Submittal type · Crew · Road type |

They cascade. Pick Bridge 3 and the Location list only offers Span-01 to Span-04, because that is
all Bridge 3's deck slabs have. Branches with nothing left drop out of the bar once you have
narrowed — that absence is the answer. Every option shows its live count.

**On the Dashboard and BOQ / Area the whole page recalculates for the selection** — KPI cards,
slippage, SPI, charts, the milestone table and the behind-plan list. Two things to know:

1. When filtered, the **issued S-curve no longer governs**. It is a project-level curve, so a
   filtered Planned % is the plan for that selection derived from the baseline. The view says so in
   a banner, and the twin column group changes from *w.r.t Project* to *w.r.t Selection*. **Clear the
   filters for the reportable figure.**
2. Engineering, Procurement and milestone-only selections **carry no loaded cost**. Cost-weighting
   them would read 0.00%, so those views switch to **equal weight per activity** and say so. The
   column header changes from *Cost wtg %* to *Activity wtg %*.

---

## 5b. Structures view — bridges & underpass by work stage

The **Structures** tab is styled in the **house progress-deck format** (deep-teal banner with the orange rule and contract line, orange-accented bridge heading bands, highlighted NOTE boxes). **Printing** is set up for **A3 landscape**: the compact work-stage legend repeats at the top of every printed sheet, each bridge prints on its own sheet in bridge-by-bridge mode, and either all-in-one mode prints as a **single A3 landscape sheet with all three bridges + legend** (the underpass follows on its own sheet). Use the Print / PDF button. **Print colours are forced** — the legend swatches, teal banner and orange accents print even with the browser's "Background graphics" option off. The sheet header and every printed sheet carry the **party logos** (Al Marwan Construct · Parsons · Government of Sharjah RTA) on the dark band plus the parties line. Each bridge card also carries the **Progress — Bridges slide block**: big-number element counters (28/28 style), the orange summary table (Total / Actual / Actual % / Remaining %) and the actual-vs-remaining bar graph — counts are whole completed units (piles by nr; extensions floored, never overstated; caps/piers split by reinforcement and casting stage) — edit the `PARTIES` block at the top of `src/js/35-views-struct.js` if any name needs correcting.

The tab has **four view modes** (buttons at the top, the choice is remembered). The fourth is **PLANNED vs ACTUAL — side by side**: for each bridge (and the underpass), the same 3D view twice — LEFT coloured by where the **baseline EARLY dates** say the work should be at the cut-off (computed from the issued programme/S-curve; view-only, no records behind it), RIGHT the live actual from entered progress (clickable as usual). Above each pair: PLANNED % / ACTUAL % / VARIANCE cards (cost-weighted; negative variance in red). Planned member counts (Pile n/N) are floored from the group planned % — never overstated. Printing gives one A3 landscape sheet per bridge with the pair side by side. The other three modes: **3D bridge-by-bridge** (full-size drawings), **3D OVERVIEW — all bridges in one** (per bridge: the big-number counters, the actual-vs-remaining bar graph at readable size, and a large 3D view side by side — the summary table lives only in bridge-by-bridge mode; the whole layout still prints as one A3 landscape sheet), and the **Elevation sheet** — the All-Bridges-In-One Rev.01 presentation layout (deck spans, expansion joints in red, flared piers/hammerheads, pile caps, piles, abutment header beams with pile extensions, falsework verticals, PT section bars) with every element coloured by its live work stage and clickable. The 3D drawings are **3D isometric views** of Bridge 01 (BRAK), Bridge 02
(RG AK) and Bridge 03 (AK RG) in the style of the All-Bridges-In-One sheet — full deck on its
supports, red location pins (A1/P1/…), ground plane at GL — plus the box-culvert underpass, with
**every element coloured by its current work stage** from the entered progress. **Orientation (Rev 5.7) matches the All-Bridges-In-One sheet:** Bridge 01 and Bridge 02 run **A2 → A1 left-to-right** (B1: A2–P1–A1 · B2: A2–P6…P1–A1) and Bridge 03 runs **A1 → A2** — span numbering, PT sections and expansion joints sit accordingly. Stages: excavation, piling, pile
cutting, blinding, membrane & screed (on blinding), scaffolding/gantry, formwork, reinforcement, tendon
ducts, concrete cast, curing, formwork removal, waterproofing, backfilling, post-tensioning, bearings,
expansion joints, finishing.

- **Two waterproofing stages, deliberately:** the underpass footing's *2-ply membrane* and *50 mm
  protection screed* sit **on the blinding, before reinforcement** — they carry their own early
  stage (slate blue), so entering steel fixing after them shows *Reinforcement*, not a jump to the
  late Waterproofing stage. The **external waterproofing after casting** (wall outside / above top
  slab) stays on the late Waterproofing stage. The screed is coded *Concrete* in the programme but
  the app reads it as membrane & screed — marking screed complete no longer shows the footing as cast.

- **Solid colour** = that stage's activity is complete; **hatched** = the stage is running now;
  light grey = not started; dark green = element fully complete.
- The % on an element is the cost-weighted actual of its activities. Click any element for its
  activity list; click a row for the full activity detail.
- **Element breakdown matches the build:** at abutments, **piles stop at GL** (pile-cap level, the
  dashed ground line) and the **pile extension is its own element from GL up to the header-beam
  soffit** — updating piling colours only the below-GL stubs, pile-extension entries colour the
  columns above. Piers are split **shaft / flare** (flare drawn widening up toward the deck), and
  the three piers that carry a **pier head** (B2-P4, B3-P3, B3-P5) show it as a separate block
  above the flare — each updates independently. **Piles and pile extensions are individually
  selectable:** the XER loads them as nr per support (abutment 2 piles + 2 extensions, pier 4
  piles), so each drawn member is its own click target — mark *Pile 1 of 2* complete and only it
  goes green, with its 1-nr share booked on the group's activities automatically (capped at the
  baseline quantity, voidable via *Unmark*, listed in the audit log). Labels read *done/total ·
  group %* (e.g. *Pile 1/2 · 50.00%*). The view carries **construction (CON-) activities
  only**; shop-drawing and design submittals stay in the Engineering register.
- Chips per bridge give the headline counts — piles cast x/y (by quantity), pile caps / piers /
  deck spans complete, PT sections stressed — the same numbers the weekly deck's bridge slides carry.
- **Expansion joints are drawn as joint LINES on the deck plan** (dashed until complete) — the deck stays continuous; tap the line to update the EJ activities.
- Span-to-section mapping was verified against the XER: the expansion-joint groups sit exactly at
  A1/P4/A2 (B2) and A1/P3/P5/A2 (B3), matching the PT layout on the drawing.
- Activities without a span/support code (section-level rollups) are not drawn; the view says how
  many and lists them on click. They still count in every dashboard figure.
- **Print / PDF** on the view prints the whole set for the weekly deck.
- **Entering progress from the layout:** tap any element and its activities appear **in cycle order**
  (blinding → waterproofing → reinforcement → formwork → concrete → curing …). Each row carries
  **both entry boxes side by side — qty today AND cumulative %** — fill either one and **Save**
  (filling both prompts to pick one), or hit **✓** to complete the activity (books the remaining
  quantity, or 100%). The element recolours immediately. Engineers only get entry on activities
  inside their assigned areas. Fastest site method: walk the bridge, tap the pier you're standing
  at, tick what got done today. **Deck spans are drawn as the BOX GIRDER they are** — bottom slab, webs and top slab as
  separate parts, each coloured and tappable on its own (the *Bottom Slab & Web* reinforcement and
  concrete are one monolithic stage-1 pour in the programme, so those activities drive both lower
  parts; tendon ducts sit with the webs). The span label (S1 · %) opens the whole span including
  scaffolding, curing and formwork striking. Every span is drawn **solid** — at both exposed deck
  ends the **true trapezoidal box section** shows the sloped webs, dark hollow cell and PT ducts
  in the webs, and the legend carries a labelled single-cell box girder cross-section. **Scaffolding shows as blue falsework towers** under the span — tinted body, standards with base plates, diagonal bracing, three ledger levels, a **yellow formwork table at the soffit while the bottom-slab formwork is up** (clickable on its own), and a SCAFF % tag under the span
  (ground to soffit, with ledgers) from the moment scaffolding starts until Formwork Striking
  completes — tap the props to update scaffolding/striking; the formwork-stage colour on the
  bottom-slab band on top of them is the formwork table. **The bottom slab's click list also carries
  the span's Scaffolding and Formwork Striking activities** (Rev 5.6), so the FIRST scaffolding
  entry can be made straight from the drawing before the props exist — no need to hunt for the
  span label. The bottom slab's colour still comes only from its own formwork/rebar/pour acts.
- **Underpass — portal view with completed length:** drawn like the VEH-UP progress sheet —
  looking into the box with the **carriageway running through**, both side walls, the top slab
  overhead, **strip footings proud at the base** and approach slabs on top, labelled both sides
  with leader lines. Walls and top slab: once a section has ANY progress, the **whole 18.20 m section
  reads as in-progress** — solid stage colour fills front→back by the completed length (= section % ×
  18.20 m; Section-01 is the near half) and the **rest of that section shows hatched** in the same
  stage colour; grey only where nothing is recorded (Rev 6.1). Chainage ticks at 0.00 / 18.20 / 36.40 m, a
  clickable **cross-section inset**, and a component × section length table. Geometry per
  **IFC SRTA01-POL-PK01-ST-UP-DR-101001 Rev C02**: 36.40 m long × 13.0 m overall, base = **two
  6.0 m strip footings** (not a raft), 1.0 m top slab, 5.0 m approach slabs along both LONG sides of the top slab (AS-LHS / AS-RHS — the road above crosses the box; at the bottom the approach is the carriageway at the portals), two
  18.20 m construction sections. **Footings map per SIDE, not per length-half:** Section-01 is one
  full-length 36.40 m strip (tagged S1 in the view), Section-02 is the other (S2) — each strip is
  **one element: any update recolours its FULL 36.40 m length** (hatched = running, solid = done),
  and the length table reads out of 72.80 m for the footings. Tap any part of the drawing
  to enter progress, same as the bridges.

This replaces the 4-colour (proposed / stage-1 / stage-2 / completed) legend on the old bridge
slides with the full stage breakdown, and it needs no drawing work each week — enter progress once
and the figure updates.

---

## 5c. Roads & Services — strip-map progress (Rev 6.2)

The **Roads & Services** tab does for the linear works what Structures does for the bridges —
progress marked on a drawing, built entirely from the XER codes (no CAD needed). Two modes:

- **🛣 ROAD WORKS** — every road is a strip of **layer bands stacked in the build order** (wearing
  course at the top … formation at the bottom), split Carriageway / Parking / Footpath, plus kerb,
  interlock, barriers, marking, signs and gullies as their own bands. Roads are grouped Main Roads /
  Zone A / Zone B / Zones C·D·E, each road headed with its **A % · P %** (red when behind).
- **🔧 SERVICES** — one band per pipe/cable **run**, grouped by service (Storm, Sewerage, SEWA Water
  & Electricity, Etisalat, DU/ITS, Irrigation, Lighting, Gas — each card carries the service's accent
  colour) and by **zone**, coloured by the service stage cycle: traffic diversion → excavation →
  bedding → laying → chambers/manholes → backfilling → testing → connection → reinstatement.

**Reading a band:** SOLID stage colour from the left = % complete (cost-weighted) · HATCHED = under
work · grey = nothing recorded · the slate **▼ tick** = where the baseline EARLY dates say it should
be at the cut-off · red % = behind plan. **Click any band** to open its activities and enter progress
— same records as Progress Entry, everything reconciles.

Segmenting is by **ZONE** (that is how the XER is coded). Side-wise LHS / C-M / RHS tracking needs
new activity codes at the next XER revision — flagged, planner's call. A geographic overlay on the
real layout plan (colouring the actual DXF polylines) is a planned later step for the showcase
layouts (roads plan + storm/sewer network).

Prints on A3 landscape with the legend and party logos repeating per sheet.

---

## 6. What you do weekly

1. **Dashboard** — set the **Data date** to the cut-off. Everything recalculates.
2. Read the first-look in order: overall % complete → slippage against baseline → resources used vs planned with efficiencies. That is the order the deck wants.
3. **Exports → Weekly progress feed** — one CSV with the headline block, cost-weighted tables by BOQ part / area / work group / milestone (twin *w.r.t Item* and *w.r.t Project* columns), the monthly S-curve, and the resource comparison. This is what drives the deck.
4. **Exports → P6 update sheet** — Activity ID, physical % complete, actual start, actual finish, remaining duration. Straight into a P6 update layout.
5. **Delay Events** — check the time-bar banner before anything else (see §8).

---

## 7. How the numbers are calculated

| Figure | Basis |
|---|---|
| **Reported budget** | **AED 250,604,999.74** — the issued `S Curve-Revised.xlsx` figure. (The XER exports 250,604,999.67; the 7-fils difference is rounding and does not move any percentage.) |
| **Weight of an activity** | Its loaded XER cost ÷ the XER total. Weights sum to exactly 1.0000 — checked. The XER is the only source of activity-level cost, so weights stay on it. |
| **Planned % — Early and Late** | **Read from `S Curve-Revised.xlsx`**, interpolated linearly within the month. This governs the headline, both SPI figures, the slippage measure, the S-curve view and every export. |
| **Planned % at activity level** | The workbook has no activity detail, so the app aligns on **time, not amplitude**. It finds the date at which the XER's own cost spread reaches the same cumulative % as the issued curve, and reads every activity at that date. An activity therefore still runs a true 0 → 100 across its own span — only the point it is read at moves. A residual factor (measured 0.9950–1.0062, i.e. under one day's worth of curve) closes the last gap. |
| **How close the roll-up lands** | Within **0.08 percentage points** of the issued curve at worst, tested at seven cut-off dates across the programme; exact at most of them. No activity is ever pushed above 100% or below 0%. Every breakdown — BOQ part, area, work group, milestone — re-totals to the roll-up figure. |
| **Actual %** | Quantity entered ÷ baseline quantity, capped at 100. Where the baseline has no quantity, the engineer's % is used directly. |
| **Roll-up** | Cost-weighted sum of activity %. Every breakdown (BOQ / area / milestone / group) re-totals to the project figure — nothing is dropped into an "other" bucket. |
| **SPI** | Actual % ÷ Planned %, reported against **both** the Early and the Late curve. |
| **Slippage (days)** | The date on the **issued** planned-early curve where the plan equalled today's actual, measured back from the data date. A real time measure, not a % converted to days. |
| **Earned-value labour efficiency** | (Baseline labour hours × actual %) ÷ actual man-hours booked in the diaries. 1.00 = on the planned rate. |
| **Field productivity** | Actual quantity ÷ days worked, against the activity's rate/day. Rate comes from the XER *Rate of Prod.* field where it exists (1,624 activities), otherwise quantity ÷ duration. |
| **S-curve** | The issued monthly Early and Late series, unmodified — Sep-26 early peak AED 34,670,070.07, both curves converging on AED 250,604,999.74 at Aug-27. The final month is treated as complete at the scheduled finish (24-Aug-27) rather than at month end. Actual earned is overlaid from the captured progress. |

**Over-quantity is never capped silently.** If an entry pushes cumulative quantity past the baseline, the app stops, says so, and only saves after the engineer confirms — flagged in the audit log for you.

---

## 8. The delay register and the 20.1 clock

Every delay event carries a suggested FIDIC sub-clause, the correspondence reference, and a notice status. The register runs a **28-day Sub-Clause 20.1 clock** from the date of the event:

- Amber banner when an event has under 7 days left in the window.
- Red banner once an event is past 28 days with no notice recorded.
- Events whose cause is a Contractor risk are marked *n/a* — no false alarms.

**Concurrency is surfaced, not hidden.** The engineer can tick *a Contractor-risk delay may be running at the same time*, and those events are shown to you on the register and carried through into every export. They are never filtered out to make a position look better.

The sub-clause mapping is a starting point from the FIDIC base wording. **The particular conditions vary by client — confirm the sub-clause per project before it goes into a notice.** The field is editable for that reason.

---

## 9. Backups

- The server saves continuously to `data\db.json` and takes a **dated snapshot every day** into `data\backups\`.
- `data\journal.ndjson` records every push — who, from which device, how many records.
- `http://localhost:8080/api/backup` downloads the whole database as one file any time.
- Copy the `data` folder into your normal project backup.

---

## 10. Open items — flagged, not silently resolved

| # | Item | Why it matters | Suggested action — **your call** |
|---|---|---|---|
 | **F-01** | The revised XER now splits **P6-RW at AED 40.35M — exactly matching the issued deck.** But **P1-Gen is 40.20M against the deck's 45.95M**, and **P7-BW is 114.77M against the deck's 109.02M** — the same **AED 5.75M**, sitting in Bridge Works in the XER and in General Items in the deck. It moved there with the gantry re-costing (the six gantry activities roughly halved, e.g. `CON-GAN-BR3-1010` 3.11M → 1.52M). | The BOQ-part table in every weekly export uses the XER coding, so it will read P7-BW 45.80% / P1-Gen 16.04%. The deck reads 43.50% / 18.34%. | Confirm which is current. If the corrected cost loading is right, the **deck's BOQ table is the stale one** and should be reissued — not the app. |
| **F-02** | Milestone split is now **M-01 61.95M / M-02 142.43M / M-03 45.45M** against the deck's **59.49 / 147.28 / 43.07M**. Much closer than the previous XER (which was 59.40 / 162.59 / 27.85M) but still 2–5M apart per milestone. | Milestone-level % will not tie to the deck exactly. | Same call as F-01 — most likely the deck predates the cost-loading correction. |
| **F-08** | **All three milestones are now at zero total float.** MS-02 moved 24-Jun-27 → **30-Jun-27** and lost its 6 days of float; MS-03 moved 23-Aug-27 → **24-Aug-27** and lost its 1 day. MS-01 holds at 01-Nov-26 TF 0. | There is no float anywhere on the milestone chain. Any slippage on any of the three is immediately a completion-date issue from the first update. | Not an app issue — a programme risk you may want visible in the narrative and the first progress report. |
| **F-09** | **727 activities changed dates and 1,862 changed total float** between 523-25G and this revision; **350 changed cost**. `CON-GEN-TP-1000` Test piling moved from 01-Jul → 08-Jul-26 to **03-Aug → 07-Sep-26** (duration 8 d → 36 d). `GEN-MS-1020` "GENERAL ITEMS-Time related items" was deleted. | Expected on a re-cost and re-schedule, but the test-piling move is large and sits early in the chain. | Confirm the test-piling change is intended before the first progress report is issued against it. |
| **F-10** | **Two activities are span-miscoded in the XER:** `CON-BR2-AK1-S1-DS-1040` (*Web Formwork-B2.RG.AK-1.S-1*) and `CON-BR2-AK1-S2-DS-1040` (*…S-2*) both carry Element Location **Span-03**, though their IDs and names say S-1 / S-2. | The app maps deck activities by the ID's span token, so the layouts show them on the correct span regardless — but any P6 grouping/filter by the Element Location code will misplace them. | Correct the two Element Location code assignments at the next programme revision. |
| ~~F-03~~ | **CLOSED 29-Jul-26.** The app reads Planned Early and Late straight from `S Curve-Revised.xlsx`. | — | Nothing further. |
| **F-04** | **AED 768,784** of loaded cost (0.31%) carries no milestone code. It appears as *Not milestone-coded*. | Small, but it keeps the milestone table at a true 100%. | Code it in P6 if you want a clean three-milestone table. |
| **F-05** | Two activities carry a non-numeric quantity — `CON-A2-SWGL-1000` ("240m/3nr") and `CON-TEMP-SWGL-R01-1000` ("158m/2nr"). | They fall back to %-entry instead of quantity-entry. | Split each into two activities (m and nr) at the next revision, or leave on % entry. |
| **F-06** | 916 activities have **no baseline quantity** — engineering, procurement, milestones and some construction lines. | These are entered as a straight %, so they are more subjective than the quantity-driven lines. | Nothing needed for engineering/procurement. Worth checking whether any construction lines should carry a quantity. |
| **F-07** | Anyone on the office WiFi can open the app. The PIN is a name-picker, not authentication. | Fine on a private office network; not fine if the WiFi is shared with visitors. | If the network is shared, put the server on a separate VLAN or ask IT for a device-restricted SSID. |

---

## 10b. Cloud sync & real sign-in — optional (Rev 7.0)

The app can run three ways. Nothing here changes unless you choose to switch.

| Mode | Sync | Sign-in | Use when |
|---|---|---|---|
| **Standalone file** | none | name picker | one PC, quick look, demos |
| **Office LAN server** (this package) | automatic on the office WiFi | name picker + optional PIN | current setup — no internet needed |
| **Cloud (Firebase)** | live, anywhere with internet | **real email + password, roles enforced** | team spread across site/office, or hosting on GitHub Pages |

Cloud mode is set up once from the GitHub deploy package (`FIREBASE-SETUP.md` in it):
create a Firebase project, publish the supplied `firestore.rules`, add the accounts,
and fill in `firebase-config.js`. Then:

- **Records sync live** — an entry on a phone reaches the other devices in seconds.
- **Sign-in is real** — this closes flag F-07. Each person has their own login; roles
  (Planning / Site Engineer / Viewer) are enforced by the database rules, not just the UI.
  Someone without a profile is refused.
- **Imported baselines are distributed automatically** to every device, exactly as the
  LAN server does it.
- **Offline is unchanged** — capture continues with no signal, including on a cold start,
  and syncs when the connection returns.
- **Photos sync too**, stored as separate documents so a delay-event or IR record with
  photos cannot breach the 1 MB per-document limit and lose EOT evidence.

**Setup → Cloud sync & sign-in** shows the status on the current device and lets a
single device be connected or disconnected without touching the rest.

---

## 11. Moving to the next baseline revision — in-app XER import (Rev 6.0)

**Setup → Import XER** (planner only) reads a raw `.xer` straight in the browser — no rebuild needed. Two importers:

**⬆ Import REVISED BASELINE XER** — replaces the whole baseline register: activities, planned Early/Late dates, total float, cost/qty/resource loading, activity codes.
- A **diff report** shows first: activities added/removed, dates moved, cost changed, total cost old vs new, progress records on activities not in the new file (kept in the register but they stop counting), and the GEN-MS-1170 cost for the known export-defect check.
- The **planned-curve basis is asked on every import**: *from this XER* (planned %, curves and Planned-vs-Actual computed from the revised programme's own dates + cost loading) or *keep the issued S-curve workbook*.
- On Apply, the new baseline takes effect on that device and is **pushed to the server — every engineer's device adopts it automatically on its next sync**. Site records are never deleted; they keep matching by Activity ID (renumbered IDs start clean).
- A **Revert** button returns a device to the built-in baseline.

**⬆ Import PROGRESS-UPDATED XER** — reads **Physical %** for every activity at the XER's data date and books it as ordinary progress records; drawings, dashboards and layouts update immediately, and the app's data date moves to the XER data date.
- Rule: the **HIGHER of site reading vs XER governs**, and **every mismatch is flagged** in a conflict table before anything is written (rows where site is higher are shaded).
- Tick **Force XER** on a row to make the XER value authoritative — it then corrects the reading **down** as well; site entries dated after the XER data date build on top of it. One button ticks all site-higher rows at once.
- Nothing is deleted — every imported line sits in the audit log marked "Imported from <file>".

**All captured site data stays** — it is keyed on Activity ID and lives in `data\db.json`, not in the app file. Activity IDs that disappear in the new revision keep their history but stop rolling up; new IDs start empty.

*(If a revision comes with a freshly ISSUED S-curve workbook that must govern the curves exactly, that workbook still needs a rebuild of the app file — the importer's "issued workbook" option keeps the currently embedded curve.)*

---

## 12. If something goes wrong

| Symptom | Fix |
|---|---|
| Phone shows **Offline** on the office WiFi | Check the black server window is still open. Check the PC's IP hasn't changed. Check the Windows Firewall prompt was allowed for Private networks. |
| Engineer's entries not on the dashboard | Ask them to open the app on the office WiFi and tap the status chip — that forces a sync. Or have them export the JSON backup and send it to you. |
| **"This browser is not saving data locally"** warning | The app was opened by double-clicking the HTML file instead of through the server. Data will not survive closing the tab. Use the server address. |
| Server window closed by accident | Nothing is lost — it saves every 4 seconds. Just run `START-SERVER.bat` again. |
| Phone storage full warning | Photos are the cause. Sync to the server, then Setup → clear captured data on that device. |

---

*Rev 7.0 built 17-Aug-26 from `Rev.0-Baseline Program Submission\Revised\523-25-Final for Submission.xer` and `...\Revised\S Curve-Revised.xlsx`. Palette, table structure and first-look metric order follow the house progress-deck standard.*
