# TORBOB69 CHEATING EVIDENCE DOSSIER

A direct, high-impact forensic evidence dossier documenting Minecraft player **TorBob69** utilizing unauthorized X-ray visual modifications and exploiting operator commands to spawn 63 Enchanted Golden Apples.

- **Primary Video Evidence Tape:** [https://youtu.be/JOnVNz0psGA](https://youtu.be/JOnVNz0psGA)
- **Live Custom Domain:** [https://torbob69xray.my.id](https://torbob69xray.my.id)
- **Repository:** [https://github.com/DaLonelyCat/TORBOB69xray](https://github.com/DaLonelyCat/TORBOB69xray)
- **Architecture:** Zero-dependency static HTML5, CSS3, and JavaScript with interactive full-screen image zoom lightbox.

---

## 🔍 Documented Evidence

1. **Section 1: Video Surveillance Tape (`JOnVNz0psGA`)**
   - Embedded with YouTube IFrame API.
   - Click-to-seek synchronization: Clicking any timestamp in the evidence ledger smoothly scrolls the video into view and jumps straight to that exact second.

2. **Section 2: Server Console Logs & 63 God Apple Seizure**
   - **Exhibit 2-A (Inventory Inspection):** Web panel audit capturing TorBob69 holding **63 Enchanted Golden Apples** in his active survival hotbar alongside full Netherite gear.
   - **Exhibit 2-B (Command Logs):** Server console records showing `[TorBob69: Set own game mode to Creative Mode]` multiple times.
   - **Exhibit 2-C (Disciplinary Logs):** Console logs showing `Made TorBob69 no longer a server operator`, `Kicked TorBob69: First Warning`, and his response: `laggy ass server`.
   - **Interactive Lightbox:** Click any screenshot to open a full-resolution zoom overlay with keyboard (`Esc`) dismissal.

3. **Section 3: Timestamped Mining Telemetry (X-Ray Snaps)**
   - Timestamped breakdown of unnatural mining turns directly into hidden ore veins.
   - Interactive SVG trajectory radars illustrating yaw snap degrees and distance through solid deepslate stone.
   - Direct comparison between TorBob69's chat excuses and reality.

4. **Section 4: Evidence Summary & Verification**
   - Concise itemized overview of confirmed violations.
   - One-click copy evidence link with toast notification and social sharing.

---

## 🛠️ How to Customize Evidence & Timestamps

All evidence entries are located in [`evidence.js`](file:///c:/Users/chris/Documents/antigravity/intelligent-newton/evidence.js):

```javascript
{
  id: 1,
  time: 14,                         // Jump second in the YouTube video
  timeDisplay: "0:14",              // Label displayed on the button
  title: "The Unprovoked 90° Right Angle Snap",
  category: "snap",                 // 'snap' | 'debris' | 'quote' | 'radar'
  angle: 92,                        // Yaw turn angle in degrees for radar
  pitch: -18,                       // Pitch angle in degrees
  distance: "12 blocks",
  torbobQuote: "Bro I just had a hunch...",
  realityCheck: "Human eyes cannot intuition-mine through 12 deepslate blocks.",
  guiltRating: "99.8%",
  status: "PROVEN X-RAY"
}
```

---

## 🚀 Local Preview

Double click `index.html` to open in any web browser, or run a local static server:
```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## 🌐 Deployment to Vercel

Configured via `vercel.json` for static zero-config hosting on `torbob69xray.my.id`. Push to the GitHub repository and Vercel automatically deploys the latest build!
