/**
 * FOOTBALL GUESS — Game Engine & State Controller
 * Manages game loop, user inputs, keyboard accessibility, and state transitions.
 */

class FootballGame {
  constructor() {
    this.ui = null;
    this.qGenerator = null;

    // State machine: "HOME" | "PLAYING" | "ANSWERED" | "RESULTS"
    this.state = "HOME";

    // Round data
    this.roundData = null;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correctCount = 0;
    this.totalQuestions = 5;
  }

  init() {
    this.ui = new UIController();
    this.qGenerator = new QuestionGenerator(PLAYERS_DATA, QUESTION_TYPES, POSITIONS_POOL);

    // Initial UI Setup
    this.ui.updateSoundButtonUI(Sound.enabled);
    const bestScore = Storage.getBestScore();
    this.ui.renderHomeStats(bestScore);
    this.ui.showScreen("home");

    // Event listeners
    this._bindEvents();

    // Run validator in background
    if (typeof Validator !== "undefined") {
      Validator.run(PLAYERS_DATA, this.qGenerator);
    }
  }

  _bindEvents() {
    // 1. Play button
    this.ui.playBtn.addEventListener("click", () => {
      Sound.playClick();
      this.startNewGame();
    });

    // 2. Play Again button
    this.ui.btnPlayAgain.addEventListener("click", () => {
      Sound.playClick();
      this.startNewGame();
    });

    // 3. Go Home button
    this.ui.btnGoHome.addEventListener("click", () => {
      Sound.playClick();
      this.goToHome();
    });

    // 4. Sound toggle buttons
    const handleSoundToggle = () => {
      const isEnabled = Sound.toggle();
      this.ui.updateSoundButtonUI(isEnabled);
      if (isEnabled) Sound.playClick();
    };

    const globalSoundBtn = document.getElementById("global-sound-btn");
    if (globalSoundBtn) {
      globalSoundBtn.addEventListener("click", handleSoundToggle);
    }
    if (this.ui.homeSoundBtn) {
      this.ui.homeSoundBtn.addEventListener("click", handleSoundToggle);
    }
    if (this.ui.gameSoundBtn) {
      this.ui.gameSoundBtn.addEventListener("click", handleSoundToggle);
    }

    // 5. Answer buttons delegation
    this.ui.answersGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".answer-btn");
      if (!btn || this.state !== "PLAYING") return;
      const index = parseInt(btn.dataset.index, 10);
      this.handleAnswer(index);
    });

    // 6. Next Player button
    this.ui.btnNext.addEventListener("click", () => {
      if (this.state !== "ANSWERED") return;
      this.handleNextPlayer();
    });

    // 7. Keyboard Navigation (1, 2, 3, 4, Enter, Space)
    window.addEventListener("keydown", (e) => {
      // Avoid intercepting if focus is on an input or outside
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      if (this.state === "PLAYING") {
        if (["1", "2", "3", "4"].includes(e.key)) {
          e.preventDefault();
          const index = parseInt(e.key, 10) - 1;
          this.handleAnswer(index);
        }
      } else if (this.state === "ANSWERED") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleNextPlayer();
        }
      } else if (this.state === "HOME") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          Sound.playClick();
          this.startNewGame();
        }
      } else if (this.state === "RESULTS") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          Sound.playClick();
          this.startNewGame();
        }
      }

      // Quick sound toggle with "m" key
      if (e.key === "m" || e.key === "M") {
        handleSoundToggle();
      }
    });
  }

  startNewGame() {
    this.state = "PLAYING";
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.correctCount = 0;
    this.currentQuestionIndex = 0;

    // Generate 5 distinct players and questions
    this.roundData = this.qGenerator.generateRound(this.totalQuestions);

    this.ui.showScreen("game");
    this._renderCurrentQuestion();
  }

  _renderCurrentQuestion() {
    const qObj = this.roundData.questions[this.currentQuestionIndex];
    this.ui.renderQuestion(
      qObj,
      this.currentQuestionIndex,
      this.totalQuestions,
      this.score,
      this.streak
    );
  }

  handleAnswer(selectedIndex) {
    if (this.state !== "PLAYING") return;
    this.state = "ANSWERED";

    const qObj = this.roundData.questions[this.currentQuestionIndex];
    const selectedAnswer = qObj.answers[selectedIndex];
    const isCorrect = selectedAnswer && selectedAnswer.correct === true;

    if (isCorrect) {
      this.score += 100;
      this.streak += 1;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
      }
      this.correctCount += 1;
      Sound.playCorrect();
    } else {
      this.streak = 0;
      Sound.playWrong();
    }

    this.ui.showAnswerFeedback(selectedIndex, isCorrect, qObj, this.score, this.streak);
  }

  handleNextPlayer() {
    if (this.state !== "ANSWERED") return;
    Sound.playNext();

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.totalQuestions) {
      this.state = "PLAYING";
      this._renderCurrentQuestion();
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.state = "RESULTS";
    const accuracy = Math.round((this.correctCount / this.totalQuestions) * 100);

    const stats = {
      score: this.score,
      correctCount: this.correctCount,
      accuracy: accuracy,
      bestStreak: this.bestStreak
    };

    const isNewBest = Storage.saveBestScore(this.score);
    Storage.saveBestStreak(this.bestStreak);
    Storage.incrementTotalGames();

    Sound.playFanfare();
    this.ui.showScreen("result");
    this.ui.renderResults(stats, isNewBest);
  }

  goToHome() {
    this.state = "HOME";
    const bestScore = Storage.getBestScore();
    this.ui.renderHomeStats(bestScore);
    this.ui.showScreen("home");
  }
}

// Start game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.game = new FootballGame();
  window.game.init();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FootballGame };
}
