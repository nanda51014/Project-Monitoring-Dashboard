# R2200 SiteTrack — cloud sync setup (Firebase)

One-time setup, about 20 minutes. After this, every device sees everyone's
progress within seconds, and people sign in with a real email and password
instead of picking a name from a list.

**You do not have to do this.** Leave `firebase-config.js` as delivered and the
app stays exactly as it is today (standalone file, or the office-LAN server).

---

## 1. Create the Firebase project

1. Go to <https://console.firebase.google.com> and sign in with a Google account
   (use a company account, not a personal one — this becomes the owner).
2. **Add project** → name it e.g. `r2200-sitetrack` → you can switch Google
   Analytics **off**, it is not needed.
3. Wait for it to finish, then **Continue**.

## 2. Register the web app and copy the config

1. On the project home page click the **web icon `</>`** ("Add app").
2. App nickname: `SiteTrack` → **Register app**. Do **not** tick Firebase Hosting
   (the app is hosted on GitHub Pages).
3. You are shown a `firebaseConfig = { … }` block. Keep this tab open.

## 3. Turn on sign-in

1. Left menu → **Build → Authentication** → **Get started**.
2. **Sign-in method** tab → **Email/Password** → **Enable** (leave the passwordless
   "Email link" option off) → **Save**.

## 4. Create the database

1. Left menu → **Build → Firestore Database** → **Create database**.
2. Location: pick the closest region (`eur3`, or a Middle East / Asia region) —
   **this cannot be changed later**.
3. Start in **production mode** (locked). You will paste proper rules next.

## 5. Publish the security rules  ← do not skip

1. Firestore Database → **Rules** tab.
2. Delete everything there and paste the **entire contents of `firestore.rules`**
   from this package.
3. **Publish**.

> The default "test mode" rules allow anyone on the internet to read and write
> your project. The supplied rules instead require a signed-in account that has a
> profile, and only the planner can change the baseline or the user list.

## 6. Create the accounts

For **each person** (you first):

1. Authentication → **Users** tab → **Add user** → email + a starting password →
   **Add user**. Tell them to change it later via a password reset.

## 7. Bootstrap your own planner profile

The rules only let a *planner* write profiles, and at this point no profile exists —
so create the first one by hand:

1. Firestore Database → **Data** tab → **Start collection**.
2. Collection ID: `users` → **Next**.
3. Document ID: **your email address, all lower case** (e.g. `nanda@amc.ae`).
4. Add these fields, then **Save**:

| Field | Type | Value |
|---|---|---|
| `email` | string | your email, lower case |
| `name` | string | your name as it should show in the app |
| `role` | string | `planner` |
| `areas` | array | *(leave empty)* |
| `rev` | number | `1` |

Everyone else you add from inside the app (step 9) — this hand-made one is only
needed to get started.

## 8. Point the app at the project

1. Open `firebase-config.js` from this package.
2. Uncomment the block and paste your values from step 2.
3. Commit and push to GitHub. Every device picks it up automatically on next load.

```js
window.R2200_FIREBASE = {
  apiKey:            "AIza………",
  authDomain:        "r2200-sitetrack.firebaseapp.com",
  projectId:         "r2200-sitetrack",
  storageBucket:     "r2200-sitetrack.appspot.com",
  messagingSenderId: "000000000000",
  appId:             "1:000000000000:web:………"
};
```

## 9. Add the rest of the team

Open the app → sign in with your email → **Setup → Users & area scoping** →
add each person with **the same email address you created in step 6**, their role
(Planning / Site Engineer / Viewer) and, for engineers, their areas → **Save**.

Someone who signs in without a profile here is refused with a clear message —
that is the intended behaviour, not a fault.

---

## How it behaves once connected

| | |
|---|---|
| **Sync** | Live. A record entered on a phone appears on the other devices in a few seconds — no button to press. |
| **Offline** | Unchanged. Records are captured on the device and go up when signal returns. The pill shows the queue. |
| **No signal at start-up** | The app still opens with the last signed-in profile and keeps capturing; it syncs when back online. |
| **Baseline import** | Import a revised baseline XER on your device and it is pushed to the cloud — every other device adopts it automatically. |
| **Photos** | Delay-event and IR photos sync too. They are stored as separate documents so a record with photos cannot breach Firestore's 1 MB per-document limit. |
| **Deleting** | Nothing is ever hard-deleted; the app voids records and the audit trail is kept. The rules refuse deletes outright. |

## Cost

The free (Spark) plan covers this project comfortably — a handful of engineers,
a few hundred records a day, and photos are the only sizeable items. There is
nothing to enter a card for unless you choose to upgrade.

## If something goes wrong

| Symptom | Cause / fix |
|---|---|
| "No profile for …" on sign-in | The address has an Auth account but no `users/{email}` document. Add it under Setup → Users (or check for a typo / capital letters — profile IDs are lower case). |
| "Missing or insufficient permissions" | The rules were not published, or the signed-in person has no profile. Redo step 5 / step 7. |
| "Could not load the Firebase SDK" | No internet at that moment, or a blocked CDN. The app keeps working offline; it reconnects by itself. If it never connects, set a different `sdkVersion` in `firebase-config.js`. |
| Pill stays "Offline" with a queue | Not signed in, or no connection. Sign in; the queue clears itself. |
| Want to test the rules | Firestore → Rules → **Rules Playground**: simulate a `get` on `/progress/anything` as an authenticated user with and without a profile — it should allow only with one. |

## Turning it off

Delete (or re-comment) `firebase-config.js` and push. Every device falls back to
local/LAN mode on its next load, keeping the records it already holds.
The office-LAN server package is unchanged and still works as before.
