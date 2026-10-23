# THE PEOPLE VS. TORBOB69: THE MINECRAFT X-RAY TRIAL

An interactive, high-production courtroom parody website presenting forensic evidence that Minecraft player **TorBob69** is utilizing unauthorized X-ray visual modifications.

- **Primary Video Evidence Tape:** [https://youtu.be/JOnVNz0psGA](https://youtu.be/JOnVNz0psGA)
- **Target Custom Domain:** [https://torbob69xray.my.id](https://torbob69xray.my.id)
- **Tech Architecture:** Zero-dependency vanilla HTML5, CSS3, JavaScript, Web Audio API (100% offline-ready with zero external npm dependencies).

---

## ⚖️ Features

1. **Phoenix Wright Courtroom Aesthetic:**
   - Docket header with Judge Blockhead presiding.
   - Dramatic "OBJECTION!" button triggering an orchestral brass sting, screen shake, and full-screen comic blast.
   - Dynamic TorBob69 avatar from `mc-heads.net` / `minotar.net`.
   - "SUS-O-METER" gauge set to 100% guilty.

2. **Exhibit A Video Player with YouTube IFrame API:**
   - Embeds surveillance tape `JOnVNz0psGA`.
   - Clicking any timestamp in the Forensic Evidence Ledger smoothly scrolls the player into view and jumps straight to that exact second.

3. **Deep-Dive Forensic Evidence Ledger:**
   - Filterable tabs: 90° Snaps, Ancient Debris Shafts, Suspect Chat Contradictions, Radar Trajectories.
   - Interactive SVG Trajectory Radars illustrating Minecraft yaw/pitch angles and hidden ore distance.
   - Side-by-side comparison of Torbob69's chat excuses vs. Forensic Prosecution reality checks.

4. **Interactive Verdict Finale:**
   - "SLAM GAVEL: DELIVER VERDICT" button.
   - Synthesizes realistic wooden gavel thuds and iron prison gate crashes using the Web Audio API.
   - Heavy iron bars slide down locking Torbob69 inside a holding cell.
   - Massive red "GUILTY AS CHARGED" rubber stamp slams down with screen tremors.
   - Reveals court sentence and quick-share buttons.

5. **Pure Web Audio API Sound Synthesizer:**
   - Zero external audio files to download or fail loading.
   - Gavel bang, brass objection sting, metallic bars clank, and stamp thud synthesized in real-time.
   - Sound toggle button with localStorage persistence.

---

## 🛠️ How to Customize Evidence & Timestamps

All evidence entries are located in [`evidence.js`](file:///c:/Users/chris/Documents/antigravity/intelligent-newton/evidence.js). You can edit or add items at any time:

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
  status: "CONFIRMED SUS"
}
```

---

## 🚀 Local Preview

Since this project has **zero dependencies**, you can view it instantly:

1. Double click `index.html` to open it in any web browser.
2. Or run a lightweight local static server in PowerShell:
   ```powershell
   # Python 3
   python -m http.server 3000
   
   # Or Node npx
   npx serve .
   ```
   Then open `http://localhost:3000`.

---

## 🌐 Deploying to Vercel with Domain `torbob69xray.my.id`

### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy directly from this directory
vercel --prod
```

### Option 2: Via GitHub + Vercel Dashboard
1. Commit and push this directory to a GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete Torbob69 X-Ray courtroom evidence website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository (Vercel automatically detects static HTML projects).
4. Click **Deploy**.

### Mapping `torbob69xray.my.id` on Vercel:
1. In your Vercel project dashboard, go to **Settings** > **Domains**.
2. Type `torbob69xray.my.id` and click **Add**.
3. In your DNS provider for `.my.id`, add the DNS record specified by Vercel:
   - **Type:** `CNAME`
   - **Name:** `@` (or subdomain)
   - **Value:** `cname.vercel-dns.com`
4. Once DNS propagates, Vercel will automatically provision a free SSL certificate!
