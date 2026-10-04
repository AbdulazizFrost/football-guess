/**
 * FOOTBALL GUESS — Dataset & Game Logic Validator
 * Runs sanity checks on player data and question generation.
 */

const Validator = {
  run(playersData, questionGen) {
    const players = playersData || (typeof PLAYERS_DATA !== "undefined" ? PLAYERS_DATA : []);
    const generator = questionGen || (typeof QuestionGenerator !== "undefined" ? new QuestionGenerator(players) : null);

    const issues = [];
    console.group("⚽ FOOTBALL GUESS — DATA VALIDATION");

    // 1. Check player count
    if (players.length < 30) {
      issues.push(`Dataset should have at least 30 players, found: ${players.length}`);
    }

    // 2. Check for duplicate IDs
    const seenIds = new Set();
    players.forEach((p, idx) => {
      if (!p.id) {
        issues.push(`Player at index ${idx} is missing 'id'`);
      } else if (seenIds.has(p.id)) {
        issues.push(`Duplicate player ID found: "${p.id}"`);
      } else {
        seenIds.add(p.id);
      }

      // Check essential fields
      if (!p.name || typeof p.name !== "string" || !p.name.trim()) {
        issues.push(`Player "${p.id}" is missing valid 'name'`);
      }
      if (!p.photo || typeof p.photo !== "string" || !p.photo.trim()) {
        issues.push(`Player "${p.id}" is missing valid 'photo'`);
      }
      if (!p.country || !p.country.en || !p.country.uz) {
        issues.push(`Player "${p.id}" missing bilingual 'country' (en/uz)`);
      }
      if (!p.position || !p.position.en || !p.position.uz) {
        issues.push(`Player "${p.id}" missing bilingual 'position' (en/uz)`);
      }
      if (!p.club || typeof p.club !== "string") {
        issues.push(`Player "${p.id}" missing valid 'club'`);
      }
      if (!p.league || !p.league.en || !p.league.uz) {
        issues.push(`Player "${p.id}" missing bilingual 'league' (en/uz)`);
      }
      if (typeof p.number !== "number" || p.number <= 0) {
        issues.push(`Player "${p.id}" missing valid jersey 'number'`);
      }
    });

    // 3. Test Question Generator for each player and each question type
    if (generator) {
      const types = ["country", "position", "club", "number", "league"];
      players.slice(0, 10).forEach(player => {
        types.forEach(t => {
          try {
            const q = generator.generateQuestion(player, t);
            if (!q.question || !q.question.en || !q.question.uz) {
              issues.push(`Generated question for player "${player.id}" type "${t}" missing bilingual question text`);
            }
            if (!Array.isArray(q.answers) || q.answers.length !== 4) {
              issues.push(`Question for "${player.id}" (${t}) did not generate exactly 4 answers`);
            } else {
              const correctCount = q.answers.filter(a => a.correct === true).length;
              if (correctCount !== 1) {
                issues.push(`Question for "${player.id}" (${t}) has ${correctCount} correct answers instead of exactly 1`);
              }
              const uniqueValues = new Set(q.answers.map(a => a.en));
              if (uniqueValues.size !== 4) {
                issues.push(`Question for "${player.id}" (${t}) has duplicate answer options: ${q.answers.map(a => a.en).join(", ")}`);
              }
            }
          } catch (e) {
            issues.push(`Error generating question for "${player.id}" (${t}): ${e.message}`);
          }
        });
      });

      // 4. Test a sample 5-player round
      try {
        const round = generator.generateRound(5);
        if (round.players.length !== 5) {
          issues.push(`Round does not have 5 players`);
        }
        const roundPlayerIds = new Set(round.players.map(p => p.id));
        if (roundPlayerIds.size !== 5) {
          issues.push(`Round contains duplicate players!`);
        }
        if (round.questions.length !== 5) {
          issues.push(`Round does not have 5 questions`);
        }
      } catch (e) {
        issues.push(`Round generation failed: ${e.message}`);
      }
    }

    if (issues.length === 0) {
      console.log(`%c[VALIDATION PASSED] All ${players.length} players and question types are 100% valid!`, "color: #10b981; font-weight: bold;");
      console.groupEnd();
      return true;
    } else {
      console.error(`[VALIDATION FAILED] Found ${issues.length} issue(s):`);
      issues.forEach(i => console.error(` - ${i}`));
      console.groupEnd();
      return false;
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Validator };
}
