# R2200 SiteTrack — M-523 Sharjah (Rev 6.2 · 07-Aug-26)

Offline site-progress dashboard for project **R2200 / M-523**: progress entry, site diary,
delay & IR/NCR registers, cost-weighted dashboards, S-curves, and drawings coloured by work
stage (Structures 3D + Roads & Services strip-map), built from the baseline programme
`523-25-Final for Submission.xer` and the issued S-curve.

> ## ⚠️ Commercial sensitivity — read before enabling GitHub Pages
> This app **embeds the full cost loading (AED 250.6M), quantities and programme float**.
> On Free/Pro GitHub plans a **Pages site is publicly reachable even when the repository is
> private** — access-restricted Pages needs GitHub Enterprise Cloud.
> - **Safest:** keep the repo **private**, do **not** enable Pages; users download
>   `index.html` from the repo and open it in Chrome/Edge (it is fully self-contained).
> - If you do enable Pages, treat the URL as public and share it accordingly.
> The sign-in screen is a name picker, **not** authentication.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | The complete app — baseline, S-curve, all views compiled in (~470 KB, self-contained) |
| `sw.js` | Service worker — caches the app shell so it works offline after the first visit |
| `manifest.json`, `icon-*.png` | PWA manifest + icons ("Add to Home Screen" on phones) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

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

GitHub Pages is **static hosting — there is no server**, so:

- **No device-to-device sync.** Each phone/PC keeps its own records in its own browser
  (IndexedDB). The status pill will show *Offline/queued* — that is normal here.
- To consolidate, use the built-in workflow: each engineer sends the **Exports → Full data
  backup (JSON)**, and the planner merges it via **Exports → Import — merge an engineer's
  daily file** on the master device. (The office-LAN package with `START-SERVER.bat`
  remains the recommended multi-user setup — this Pages copy is best for a single master
  device, viewers, or demos.)
- **In-app XER import** works normally on each device, but the imported baseline is
  **not** distributed to other devices (that push needs the LAN server). Import on each
  device, or ship a new `index.html`.
- **Clearing browser site data deletes the records on that device** — export the JSON
  backup regularly.

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
