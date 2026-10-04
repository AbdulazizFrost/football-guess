# ⚽ FOOTBALL GUESS | FUTBOLCHI TOPISH

> **Modern Bilingual Football Quiz Game** — English 🇬🇧 & O‘zbek (Latin) 🇺🇿

A real, editorial-designed web quiz game about world football icons. Test your football knowledge through authentic portraits, tactical data, and interactive multiple-choice questions.

---

## 🌟 Key Features

* **5-Player Matchday Rounds:** Exactly 5 unique football stars per round — zero duplicate players.
* **5 Distinct Question Types:**
  1. **Country** (*Qaysi davlatdan*)
  2. **Position** (*Qaysi pozitsiyada o‘ynaydi*)
  3. **Current Club** (*Qaysi klubda o‘ynaydi*)
  4. **Jersey Number** (*Futbolka raqami nechchi*)
  5. **League** (*Qaysi ligada o‘ynaydi*)
* **Simultaneous Bilingual Interface:** English is always primary on top; natural Uzbek Latin translation is immediately below it. No language switcher needed.
* **Editorial Sports Aesthetic:** Inspired by modern matchday media and sports journals — clean layout, Archivo & Inter typography, hairline rules, and zero flashy AI gradients or neon clutter.
* **37 Real Footballers Dataset:** Rich database featuring global stars (Messi, Ronaldo, Mbappé, Haaland, Bellingham, De Bruyne, Salah) and national icons (Eldor Shomurodov, Abbosbek Fayzullaev).
* **100% Offline & Self-Contained:** High-res portraits stored locally in `assets/players/`; audio effects powered by a native Web Audio API synthesizer (no external audio files or CORS issues).
* **Keyboard Navigation:** Play with numbers `1`–`4`, proceed with `Space` or `Enter`, toggle sound with `M`.
* **Persistent Records:** Best scores and streaks saved locally via `localStorage`.

---

## 📁 Project Structure

```text
football-guess/
│
├── index.html              # Main application entry point
│
├── css/
│   └── style.css           # Editorial sports design & responsive layout
│
├── js/
│   ├── data.js             # 37 footballers dataset and multilingual dictionaries
│   ├── questions.js        # Question generator (4 options, 1 correct, randomized)
│   ├── audio.js            # Web Audio API sound synthesizer
│   ├── storage.js          # LocalStorage score & settings manager
│   ├── validate.js         # Automated data sanity validator
│   ├── ui.js               # Screen transitions & DOM controller
│   └── game.js             # Game loop, state machine & keyboard events
│
├── assets/
│   └── players/            # 37 local portrait photos + fallback SVG
│
├── test_game.js            # 100-round automated stress test script
└── README.md
```

---

## 🚀 Quick Start

No installation or build steps required. Simply clone the repository and open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/<your-username>/football-guess.git

# Open index.html in your browser
# On Windows:
start index.html
```

Or run with a local static server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

---

## 🧪 Testing

To run the automated verification suite (100 rounds, 500 questions, text encoding audit):

```bash
node test_game.js
```

---

## 📜 License

MIT License — Feel free to use, modify, and build upon this project.
