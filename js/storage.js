/**
 * FOOTBALL GUESS — LocalStorage Manager
 */

const STORAGE_KEYS = {
  BEST_SCORE: "football_guess_best_score",
  BEST_STREAK: "football_guess_best_streak",
  TOTAL_GAMES: "football_guess_total_games",
  SOUND_ENABLED: "football_guess_sound_enabled"
};

const Storage = {
  getBestScore() {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
      return val !== null ? parseInt(val, 10) : null;
    } catch (e) {
      return null;
    }
  },

  saveBestScore(score) {
    try {
      const currentBest = this.getBestScore();
      if (currentBest === null || score > currentBest) {
        localStorage.setItem(STORAGE_KEYS.BEST_SCORE, score.toString());
        return true; // New record!
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  getBestStreak() {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.BEST_STREAK);
      return val !== null ? parseInt(val, 10) : 0;
    } catch (e) {
      return 0;
    }
  },

  saveBestStreak(streak) {
    try {
      const current = this.getBestStreak();
      if (streak > current) {
        localStorage.setItem(STORAGE_KEYS.BEST_STREAK, streak.toString());
      }
    } catch (e) {}
  },

  getSoundEnabled() {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
      return val === null ? true : val === "true";
    } catch (e) {
      return true;
    }
  },

  setSoundEnabled(enabled) {
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled ? "true" : "false");
    } catch (e) {}
  },

  incrementTotalGames() {
    try {
      const current = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_GAMES) || "0", 10);
      localStorage.setItem(STORAGE_KEYS.TOTAL_GAMES, (current + 1).toString());
    } catch (e) {}
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Storage };
}
