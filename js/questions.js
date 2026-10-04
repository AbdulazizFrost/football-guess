/**
 * FOOTBALL GUESS — Question Generator
 * Generates unique, bilingual, 4-option questions for 5 footballers per round.
 */

class QuestionGenerator {
  constructor(playersData, questionTypes, positionsPool) {
    this.players = playersData || PLAYERS_DATA;
    this.types = questionTypes || QUESTION_TYPES;
    this.positionsPool = positionsPool || POSITIONS_POOL;
  }

  /**
   * Selects N unique random players from the dataset without repetition.
   */
  selectRoundPlayers(count = 5) {
    if (this.players.length < count) {
      throw new Error(`Dataset has fewer than ${count} players`);
    }
    const shuffled = [...this.players].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Generates a 5-question round ensuring 5 distinct question types.
   */
  generateRound(count = 5) {
    const players = this.selectRoundPlayers(count);
    // Distinct primary question types for the 5 players
    const primaryTypes = ["country", "position", "club", "number", "league"];
    const shuffledTypes = [...primaryTypes].sort(() => Math.random() - 0.5);

    const questions = players.map((player, idx) => {
      const qType = shuffledTypes[idx % shuffledTypes.length];
      return this.generateQuestion(player, qType);
    });

    return {
      players,
      questions
    };
  }

  /**
   * Generates a single question for a given player and question type.
   */
  generateQuestion(player, type) {
    const typeMeta = this.types[type] || this.types.country;
    let correctAnswer = null;
    let distractors = [];

    switch (type) {
      case "country": {
        correctAnswer = {
          en: player.country.en,
          uz: player.country.uz,
          correct: true
        };
        const allCountries = [];
        const seen = new Set([player.country.en]);
        this.players.forEach(p => {
          if (!seen.has(p.country.en)) {
            seen.add(p.country.en);
            allCountries.push({ en: p.country.en, uz: p.country.uz, correct: false });
          }
        });
        distractors = this._pickRandom(allCountries, 3);
        break;
      }

      case "position": {
        correctAnswer = {
          en: player.position.en,
          uz: player.position.uz,
          correct: true
        };
        const otherPositions = this.positionsPool
          .filter(pos => pos.en !== player.position.en)
          .map(pos => ({ en: pos.en, uz: pos.uz, correct: false }));
        distractors = this._pickRandom(otherPositions, 3);
        break;
      }

      case "club": {
        // Official club names are identical in EN and UZ
        correctAnswer = {
          en: player.club,
          uz: player.club,
          correct: true
        };
        const allClubs = [];
        const seen = new Set([player.club]);
        this.players.forEach(p => {
          if (!seen.has(p.club)) {
            seen.add(p.club);
            allClubs.push({ en: p.club, uz: p.club, correct: false });
          }
        });
        distractors = this._pickRandom(allClubs, 3);
        break;
      }

      case "number": {
        correctAnswer = {
          en: `#${player.number}`,
          uz: `#${player.number}`,
          correct: true
        };
        const allNumbers = [];
        const seen = new Set([player.number]);
        this.players.forEach(p => {
          if (!seen.has(p.number)) {
            seen.add(p.number);
            allNumbers.push({ en: `#${p.number}`, uz: `#${p.number}`, correct: false });
          }
        });
        // If not enough unique numbers in dataset, synthesize nearby plausible football numbers
        let candidate = 1;
        while (allNumbers.length < 3) {
          if (!seen.has(candidate)) {
            seen.add(candidate);
            allNumbers.push({ en: `#${candidate}`, uz: `#${candidate}`, correct: false });
          }
          candidate++;
        }
        distractors = this._pickRandom(allNumbers, 3);
        break;
      }

      case "league": {
        correctAnswer = {
          en: player.league.en,
          uz: player.league.uz,
          correct: true
        };
        const allLeagues = [];
        const seen = new Set([player.league.en]);
        this.players.forEach(p => {
          if (!seen.has(p.league.en)) {
            seen.add(p.league.en);
            allLeagues.push({ en: p.league.en, uz: p.league.uz, correct: false });
          }
        });
        distractors = this._pickRandom(allLeagues, 3);
        break;
      }

      default: {
        // Fallback to country
        return this.generateQuestion(player, "country");
      }
    }

    // Combine 1 correct + 3 distractors and shuffle
    const answers = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

    return {
      playerId: player.id,
      player: player,
      type: type,
      category: typeMeta.category,
      question: typeMeta.question,
      answers: answers
    };
  }

  /**
   * Helper: pick N random distinct items from array
   */
  _pickRandom(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QuestionGenerator };
}
