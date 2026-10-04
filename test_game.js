const { PLAYERS_DATA, QUESTION_TYPES, POSITIONS_POOL, RATING_TIERS } = require('./js/data.js');
const { QuestionGenerator } = require('./js/questions.js');
const { Storage } = require('./js/storage.js');
const { Validator } = require('./js/validate.js');

console.log("=== STARTING QA AUTOMATED AUDIT ===");

// Mock localStorage for node environment
const memStore = {};
global.localStorage = {
  getItem: (k) => memStore[k] || null,
  setItem: (k, v) => { memStore[k] = v.toString(); },
  removeItem: (k) => { delete memStore[k]; },
  clear: () => { Object.keys(memStore).forEach(k => delete memStore[k]); }
};

// 1. Validator run
const qg = new QuestionGenerator(PLAYERS_DATA, QUESTION_TYPES, POSITIONS_POOL);
const valSuccess = Validator.run(PLAYERS_DATA, qg);
if (!valSuccess) {
  console.error("FAIL: Validation failed!");
  process.exit(1);
}
console.log("PASS: Dataset & Generator validation passed.");

// 2. Test 100 simulated rounds
console.log("Simulating 100 rounds of 5 players each...");
for (let r = 1; r <= 100; r++) {
  const round = qg.generateRound(5);
  
  // 5 unique players
  if (round.players.length !== 5) {
    console.error(`FAIL: Round ${r} player count != 5`);
    process.exit(1);
  }
  const playerIds = new Set(round.players.map(p => p.id));
  if (playerIds.size !== 5) {
    console.error(`FAIL: Round ${r} has duplicate player IDs!`);
    process.exit(1);
  }

  // 5 questions
  if (round.questions.length !== 5) {
    console.error(`FAIL: Round ${r} question count != 5`);
    process.exit(1);
  }

  round.questions.forEach((q, idx) => {
    // English & Uzbek present
    if (!q.question.en || !q.question.uz) {
      console.error(`FAIL: Round ${r} Q${idx} missing question translations`);
      process.exit(1);
    }
    // Exactly 4 answers
    if (q.answers.length !== 4) {
      console.error(`FAIL: Round ${r} Q${idx} does not have 4 options`);
      process.exit(1);
    }
    const correctCount = q.answers.filter(a => a.correct).length;
    if (correctCount !== 1) {
      console.error(`FAIL: Round ${r} Q${idx} has ${correctCount} correct options`);
      process.exit(1);
    }
    const uniqueEn = new Set(q.answers.map(a => a.en));
    if (uniqueEn.size !== 4) {
      console.error(`FAIL: Round ${r} Q${idx} has duplicate option texts: ${q.answers.map(a => a.en).join(", ")}`);
      process.exit(1);
    }
    // Verify correct option corresponds to player
    const correctAns = q.answers.find(a => a.correct);
    if (q.type === "country") {
      if (correctAns.en !== q.player.country.en) {
        console.error(`FAIL: Round ${r} Q${idx} correct country mismatch`);
        process.exit(1);
      }
    } else if (q.type === "position") {
      if (correctAns.en !== q.player.position.en) {
        console.error(`FAIL: Round ${r} Q${idx} correct position mismatch`);
        process.exit(1);
      }
    } else if (q.type === "club") {
      if (correctAns.en !== q.player.club) {
        console.error(`FAIL: Round ${r} Q${idx} correct club mismatch`);
        process.exit(1);
      }
    } else if (q.type === "number") {
      if (correctAns.en !== `#${q.player.number}`) {
        console.error(`FAIL: Round ${r} Q${idx} correct number mismatch`);
        process.exit(1);
      }
    } else if (q.type === "league") {
      if (correctAns.en !== q.player.league.en) {
        console.error(`FAIL: Round ${r} Q${idx} correct league mismatch`);
        process.exit(1);
      }
    }
  });
}
console.log("PASS: 100 rounds (500 questions) generated and verified with 0 errors!");

// 3. Storage tests
console.log("Testing Storage operations...");
localStorage.clear();
if (Storage.getBestScore() !== null) {
  console.error("FAIL: Storage initial best score should be null");
  process.exit(1);
}
const firstSave = Storage.saveBestScore(300);
if (!firstSave || Storage.getBestScore() !== 300) {
  console.error("FAIL: Storage failed to save 300");
  process.exit(1);
}
const lowerSave = Storage.saveBestScore(200);
if (lowerSave || Storage.getBestScore() !== 300) {
  console.error("FAIL: Storage should not overwrite 300 with 200");
  process.exit(1);
}
const higherSave = Storage.saveBestScore(500);
if (!higherSave || Storage.getBestScore() !== 500) {
  console.error("FAIL: Storage failed to update best score to 500");
  process.exit(1);
}
console.log("PASS: Storage manager functions correctly.");

// 4. Verify Cyrillic Absence in Uzbek strings
console.log("Verifying Uzbek Latin alphabet (no Cyrillic characters)...");
const cyrillicRegex = /[\u0400-\u04FF]/;
let cyrillicFound = false;

function checkObject(obj, path = "") {
  for (const k in obj) {
    const val = obj[k];
    const currentPath = path ? `${path}.${k}` : k;
    if (typeof val === "string") {
      if (k === "uz" || k.endsWith("Uz") || currentPath.includes("uz")) {
        if (cyrillicRegex.test(val)) {
          console.error(`FAIL: Found Cyrillic text at ${currentPath}: "${val}"`);
          cyrillicFound = true;
        }
      }
    } else if (typeof val === "object" && val !== null) {
      checkObject(val, currentPath);
    }
  }
}

checkObject(PLAYERS_DATA, "PLAYERS_DATA");
checkObject(QUESTION_TYPES, "QUESTION_TYPES");
checkObject(POSITIONS_POOL, "POSITIONS_POOL");
checkObject(RATING_TIERS, "RATING_TIERS");

if (cyrillicFound) {
  console.error("FAIL: Cyrillic characters detected in Uzbek translations!");
  process.exit(1);
}
console.log("PASS: All Uzbek text is 100% pure Latin script.");

console.log("\n=== ALL QA AUDIT CHECKS PASSED SUCCESSFULLY (100%) ===");
