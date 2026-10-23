/**
 * TORBOB69 X-RAY TRIAL: FORENSIC EVIDENCE LEDGER
 * ===============================================
 * You can easily customize these evidence items, timestamps, quotes, and radar angles!
 *
 * Each item contains:
 * - id: unique identifier
 * - time: timestamp in seconds (where YouTube player will jump)
 * - timeDisplay: human-readable timestamp (e.g. "0:14")
 * - title: forensic allegation
 * - category: 'snap' | 'debris' | 'quote' | 'radar'
 * - angle: yaw turn angle in degrees (e.g. 88, 120) for the trajectory radar
 * - pitch: pitch angle in degrees (e.g. -42 for looking down)
 * - distance: distance to ore in blocks
 * - torbobQuote: suspect's excuse in chat / voice
 * - realityCheck: the forensic prosecution counter-argument
 * - guiltRating: percentage rating of guilt
 */

const EVIDENCE_DATA = [
  {
    id: 1,
    time: 14,
    timeDisplay: "0:14",
    title: "The Unprovoked 90° Right Angle Snap",
    category: "snap",
    angle: 92,
    pitch: -18,
    distance: "12 blocks",
    torbobQuote: "Bro I just had a hunch, my mining intuition was tingling.",
    realityCheck: "Human eyes cannot intuition-mine through 12 solid blocks of deepslate straight into a 7-vein of diamonds.",
    guiltRating: "99.8%",
    status: "CONFIRMED SUS"
  },
  {
    id: 2,
    time: 45,
    timeDisplay: "0:45",
    title: "The Gravel Bypass Maneuver",
    category: "debris",
    angle: 45,
    pitch: -32,
    distance: "6 blocks",
    torbobQuote: "I didn't want the gravel to fall on me, obviously.",
    realityCheck: "Digs precisely 3 blocks to the left to avoid a gravel pocket he could not possibly see without transparent block textures.",
    guiltRating: "99.9%",
    status: "EXHIBIT A+"
  },
  {
    id: 3,
    time: 80,
    timeDisplay: "1:20",
    title: "The 'I Heard The Diamonds Breathing' Defense",
    category: "quote",
    angle: 110,
    pitch: -55,
    distance: "18 blocks",
    torbobQuote: "Bro I literally heard the ore breathing through my studio monitor headphones.",
    realityCheck: "In Minecraft Java Edition, diamond ore produces ZERO decibels of sound. Diamonds are not lungs, Torbob.",
    guiltRating: "100.0%",
    status: "PERJURY DETECTED"
  },
  {
    id: 4,
    time: 135,
    timeDisplay: "2:15",
    title: "The Blind Nether Debris Staircase",
    category: "debris",
    angle: 175,
    pitch: -48,
    distance: "14 blocks",
    torbobQuote: "I always dig random staircases at Y=14 in the Nether.",
    realityCheck: "Stairs down at an exact 45° angle, hits 3 Ancient Debris, immediately stops digging stairs and heads home.",
    guiltRating: "99.7%",
    status: "PURE XRAY"
  },
  {
    id: 5,
    time: 172,
    timeDisplay: "2:52",
    title: "The 1-Block Lava Pocket Reflex",
    category: "snap",
    angle: 68,
    pitch: 12,
    distance: "1 block",
    torbobQuote: "I felt the heat coming through my monitor screen.",
    realityCheck: "Ceases mining straight forward exactly 1 block before opening a lethal lava lake. No sound cue, no visible particles.",
    guiltRating: "100.0%",
    status: "SIXTH SENSE OR CHEAT"
  },
  {
    id: 6,
    time: 210,
    timeDisplay: "3:30",
    title: "The Rapid Strip-Mine Abandonment",
    category: "radar",
    angle: 0,
    pitch: -2,
    distance: "0 blocks",
    torbobQuote: "The vibes in that tunnel were off, so I left.",
    realityCheck: "Leaves a 50-block untouched branch the exact second all nearby ores within 32-block ESP render range were exhausted.",
    guiltRating: "99.9%",
    status: "CASE CLOSED"
  },
  {
    id: 7,
    time: 0,
    timeDisplay: "EXHIBIT B",
    title: "The 63 God Apple Creative Mode Heist",
    category: "quote",
    angle: 0,
    pitch: 0,
    distance: "Creative Tab",
    torbobQuote: "laggy ass server",
    realityCheck: "Server console logs catch TorBob69 using /gamemode creative to place 63 Enchanted Golden Apples directly into his survival hotbar.",
    guiltRating: "100.0%",
    status: "CONFIRMED FRAUD"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVIDENCE_DATA };
}
