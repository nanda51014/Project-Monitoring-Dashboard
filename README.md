# R2200 SiteTrack — M-523 Sharjah (Rev 7.0 · 17-Aug-26)

Offline site-progress dashboard for project **R2200 / M-523**: progress entry, site diary,
delay & IR/NCR registers, cost-weighted dashboards, S-curves, and drawings coloured by work
stage (Structures 3D + Roads & Services strip-map), built from the baseline programme
`523-25-Final for Submission.xer` and the issued S-curve.

> ## Note on what is published
> A GitHub Pages site is publicly reachable on Free/Pro plans, even from a private
> repository. The app embeds the programme, quantities and the **contract-value cost
> loading** — reviewed and accepted as publishable; **no internal rates are in this
> app or its data**. Programme float is present.
> The **records** (progress, diary, delay events, IR/NCR) are not public once cloud
> sync is set up — they sit behind sign-in and the Firestore rules.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | The complete app — baseline, S-curve, all views compiled in (~490 KB, self-contained) |
| `firebase-config.js` | Cloud sync config. Delivered **commented out** = local/LAN mode. Fill it in to switch the whole team to cloud sync + real sign-in |
| `firestore.rules` | Security rules — paste into the Firebase console (see `FIREBASE-SETUP.md`) |
| `FIREBASE-SETUP.md` | Step-by-step: create the project, publish the rules, add the accounts |
| `sw.js` | Service worker — caches the app shell so it works offline after the first visit |
| `manifest.json`, `icon-*.png` | PWA manifest + icons ("Add to Home Screen" on phones) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Two ways to run it

**A — Static only (as delivered).** Push and enable Pages. Everyone gets the app
and works offline, but **each device keeps its own records** — consolidate with
Exports → JSON backup → Import on the master device.

**B — With cloud sync (recommended for a live team).** Follow `FIREBASE-SETUP.md`,
fill in `firebase-config.js`, push. Then: real email/password sign-in, roles
enforced by security rules, live cross-device sync, and imported baselines
distributed to every device automatically.

## Deploy — GitHub Pages

```bash
git clone https://github.com/<you>/<repo>.git
cd <repo>
# copy ALL files from this package into the repo root (including .nojekyll)
git add -A
git commit -m "R2200 SiteTrack Rev 6.2"
git push
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save.**
The dashboard appears at `https://<you>.github.io/<repo>/` after a minute or two.
All paths are relative, so it works at the repo sub-path as-is. Phones can then
"Add to Home Screen" and the app keeps working offline.

## What is different from the office-LAN installation

**Without** cloud sync configured, GitHub Pages is static hosting — there is no server, so:

- **No device-to-device sync.** Each phone/PC keeps its own records in its own browser
  (IndexedDB). The status pill will show *Offline/queued* — that is normal here.
- To consolidate, use the built-in workflow: each engineer sends the **Exports → Full data
  backup (JSON)**, and the planner merges it via **Exports → Import — merge an engineer's
  daily file** on the master device.
- **In-app XER import** works on each device, but the imported baseline is **not**
  distributed to the others. Import on each device, or ship a new `index.html`.
- **Clearing browser site data deletes the records on that device** — export the JSON
  backup regularly.

**With** cloud sync configured (`FIREBASE-SETUP.md`), all four of those go away: records
sync live, the baseline is distributed automatically, and the data lives in Firestore
rather than only in each browser. The office-LAN server package is unchanged and remains
a perfectly good option where there is no internet on site.

## Updating to a new revision

Replace `index.html` with the new revision's file, commit and push.
The service worker serves cache-first, so a device may need **one extra refresh**
(or close & reopen) to pick up the new version.

## Requirements

Chrome or Edge 80+ (the app uses `DecompressionStream`). Safari/iOS 16.4+ also works.

---
*R2200 / M-523 — Employer: Sharjah Roads & Transport Authority (SRTA) · Engineer: Parsons ·
Main Contractor: Al Marwan General Contracting (party names per project records).
Internal project tool — do not redistribute.*
