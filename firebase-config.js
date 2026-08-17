/* ============================================================
   R2200 SiteTrack — cloud sync configuration
   ------------------------------------------------------------
   Project: project-monitoring-dashb-f0284
   Configured 17-Aug-26.

   This config is NOT a secret. It identifies the Firebase project; it
   does not grant access to anything. Access is controlled by the
   sign-in and by the rules in firestore.rules — which must be published
   in the Firebase console for this project to be protected.

   To go back to local / LAN mode: comment the whole block out (or delete
   this file) and push. Every device falls back on its next load.
   ============================================================ */

window.R2200_FIREBASE = {
  apiKey:            "AIzaSyDR6fMjswASN7_Wqp7NWLfh3IypQdvESxg",
  authDomain:        "project-monitoring-dashb-f0284.firebaseapp.com",
  projectId:         "project-monitoring-dashb-f0284",
  storageBucket:     "project-monitoring-dashb-f0284.firebasestorage.app",
  messagingSenderId: "219693319830",
  appId:             "1:219693319830:web:ae89b01135ce165561e4b7"

  // Optional: pin the Firebase JS SDK version loaded from gstatic.
  // Leave it out to use the default (10.12.2). Only change this if the
  // app reports "Could not load the Firebase SDK".
  // , sdkVersion: "10.12.2"
};
