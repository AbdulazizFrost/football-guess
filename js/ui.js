/**
 * FOOTBALL GUESS — UI Controller (Human-Designed Editorial Edition)
 * Manages clean typographic rendering, split layout transitions, and answer states.
 */

class UIController {
  constructor() {
    this.screens = {
      home: document.getElementById("screen-home"),
      game: document.getElementById("screen-game"),
      result: document.getElementById("screen-result")
    };

    // Home elements
    this.homeBestScoreVal = document.getElementById("home-best-score-val");
    this.playBtn = document.getElementById("btn-play");

    // Game HUD elements
    this.hudPlayerText = document.getElementById("hud-player-text");
    this.hudScoreEn = document.getElementById("hud-score-en");
    this.hudScoreUz = document.getElementById("hud-score-uz");
    this.hudStreakEn = document.getElementById("hud-streak-en");
    this.hudStreakUz = document.getElementById("hud-streak-uz");
    this.progressBarFill = document.getElementById("progress-bar-fill");

    // Question & Stage elements
    this.categoryBadgeEn = document.getElementById("cat-badge-en");
    this.categoryBadgeUz = document.getElementById("cat-badge-uz");
    this.playerPhoto = document.getElementById("player-photo");
    this.playerRevealBadge = document.getElementById("player-reveal-badge");
    this.playerName = document.getElementById("player-name");
    this.playerSub = document.getElementById("player-sub");
    this.questionEn = document.getElementById("question-en");
    this.questionUz = document.getElementById("question-uz");
    this.answersGrid = document.getElementById("answers-grid");
    this.feedbackArea = document.getElementById("feedback-area");
    this.btnNext = document.getElementById("btn-next");
    this.nextBtnEn = document.getElementById("next-btn-en");
    this.nextBtnUz = document.getElementById("next-btn-uz");

    // Result elements
    this.resultScoreNum = document.getElementById("result-score-num");
    this.resultCorrectEn = document.getElementById("result-correct-en");
    this.resultCorrectUz = document.getElementById("result-correct-uz");
    this.resultAccuracyEn = document.getElementById("result-accuracy-en");
    this.resultAccuracyUz = document.getElementById("result-accuracy-uz");
    this.resultStreakEn = document.getElementById("result-streak-en");
    this.resultStreakUz = document.getElementById("result-streak-uz");
    this.resultRatingEn = document.getElementById("result-rating-en");
    this.resultRatingUz = document.getElementById("result-rating-uz");
    this.resultNewBest = document.getElementById("result-new-best");
    this.btnPlayAgain = document.getElementById("btn-play-again");
    this.btnGoHome = document.getElementById("btn-go-home");
    this.confettiCanvas = document.getElementById("confetti-canvas");

    this._displayedScore = 0;
  }

  showScreen(screenName) {
    Object.keys(this.screens).forEach(key => {
      if (key === screenName) {
        this.screens[key].classList.remove("hidden");
        this.screens[key].classList.add("active");
      } else {
        this.screens[key].classList.add("hidden");
        this.screens[key].classList.remove("active");
      }
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  updateSoundButtonUI(enabled) {
    const textEn = enabled ? "SOUND ON" : "SOUND OFF";
    const textUz = enabled ? "OVOZ YOQ" : "OVOZ O‘CHIQ";

    const globalBtn = document.getElementById("global-sound-btn");
    if (globalBtn) {
      const enEl = document.getElementById("sound-label-en");
      const uzEl = document.getElementById("sound-label-uz");
      if (enEl) enEl.textContent = textEn;
      if (uzEl) uzEl.textContent = textUz;
      globalBtn.classList.toggle("sound-muted", !enabled);
      globalBtn.setAttribute("aria-label", `${textEn} / ${textUz}`);
    }
  }

  renderHomeStats(bestScore) {
    if (bestScore !== null && bestScore !== undefined) {
      this.homeBestScoreVal.innerHTML = `
        <div class="score-display">
          <span class="score-num">${bestScore}</span>
          <span class="score-unit">PTS / 500</span>
        </div>
      `;
    } else {
      this.homeBestScoreVal.innerHTML = `
        <div class="score-empty">
          <span class="text-en">No score recorded yet</span>
          <span class="text-uz">Hali natija qayd etilmagan</span>
        </div>
      `;
    }
  }

  animateScoreUpdate(newScore) {
    const startScore = this._displayedScore;
    const diff = newScore - startScore;
    const duration = 300;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(startScore + diff * progress);
      this.hudScoreEn.textContent = `${current}`;
      this.hudScoreUz.textContent = `OCHKO: ${current}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this._displayedScore = newScore;
        this.hudScoreEn.textContent = `${newScore}`;
        this.hudScoreUz.textContent = `OCHKO: ${newScore}`;
      }
    };
    requestAnimationFrame(step);
  }

  renderQuestion(questionObj, playerIndex, totalPlayers, score, streak) {
    this._displayedScore = score;
    const pNum = playerIndex + 1;
    const pFormatted = pNum < 10 ? `0${pNum}` : `${pNum}`;
    const totalFormatted = totalPlayers < 10 ? `0${totalPlayers}` : `${totalPlayers}`;

    // 1. Status bar numbers
    this.hudPlayerText.innerHTML = `
      <span class="text-en">${pFormatted} / ${totalFormatted}</span>
      <span class="text-uz">${pNum} / ${totalPlayers}-FUTBOLCHI</span>
    `;

    this.hudScoreEn.textContent = `${score}`;
    this.hudScoreUz.textContent = `OCHKO: ${score}`;

    this.hudStreakEn.textContent = `${streak}`;
    this.hudStreakUz.textContent = `KETMA-KET: ${streak}`;

    const progressPct = ((playerIndex + 1) / totalPlayers) * 100;
    this.progressBarFill.style.width = `${progressPct}%`;

    // 2. Category Kicker
    this.categoryBadgeEn.textContent = `QUESTION ${pFormatted} — ${questionObj.category.en}`;
    this.categoryBadgeUz.textContent = questionObj.category.uz;

    // 3. Player photo & Mystery frame
    const player = questionObj.player;
    this.playerPhoto.src = player.photo;
    this.playerPhoto.alt = "Mystery Footballer Portrait";
    this.playerPhoto.onerror = () => {
      this.playerPhoto.src = "assets/players/fallback.svg";
    };

    // Reset revealed dossier
    this.playerRevealBadge.classList.add("hidden");
    this.playerName.textContent = "";
    this.playerSub.textContent = "";

    // 4. Question Text
    this.questionEn.textContent = questionObj.question.en;
    this.questionUz.textContent = questionObj.question.uz;

    // 5. Hide feedback & next button
    this.feedbackArea.classList.add("hidden");
    this.feedbackArea.innerHTML = "";
    this.btnNext.classList.add("hidden");

    // Next button label
    if (playerIndex === totalPlayers - 1) {
      this.nextBtnEn.textContent = "SEE RESULTS";
      this.nextBtnUz.textContent = "NATIJANI KO‘RISH";
    } else {
      this.nextBtnEn.textContent = "NEXT PLAYER";
      this.nextBtnUz.textContent = "KEYINGI FUTBOLCHI";
    }

    // 6. Structured Answer Rows (01, 02, 03, 04)
    this.answersGrid.innerHTML = "";
    questionObj.answers.forEach((ans, idx) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.type = "button";
      btn.dataset.index = idx;
      btn.setAttribute("aria-label", `${ans.en} / ${ans.uz}`);

      // Two-digit index
      const keySpan = document.createElement("span");
      keySpan.className = "btn-key";
      keySpan.textContent = `0${idx + 1}`;

      // Bilingual text
      const textContainer = document.createElement("div");
      textContainer.className = "btn-text";

      const spanEn = document.createElement("span");
      spanEn.className = "text-en";
      spanEn.textContent = ans.en;

      const spanUz = document.createElement("span");
      spanUz.className = "text-uz";
      spanUz.textContent = ans.uz;

      textContainer.appendChild(spanEn);
      textContainer.appendChild(spanUz);

      btn.appendChild(keySpan);
      btn.appendChild(textContainer);

      this.answersGrid.appendChild(btn);
    });
  }

  showAnswerFeedback(selectedIndex, isCorrect, questionObj, newScore, newStreak) {
    const buttons = this.answersGrid.querySelectorAll(".answer-btn");
    const player = questionObj.player;

    // 1. Disable options and set state
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      const ans = questionObj.answers[idx];

      if (ans.correct) {
        btn.classList.add("state-correct");
        const badge = document.createElement("span");
        badge.className = "ans-icon-badge";
        badge.textContent = "✓";
        btn.appendChild(badge);
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add("state-wrong");
        const badge = document.createElement("span");
        badge.className = "ans-icon-badge";
        badge.textContent = "✕";
        btn.appendChild(badge);
      } else {
        btn.classList.add("state-faded");
      }
    });

    // 2. Reveal player dossier
    this.playerName.textContent = player.name;
    this.playerSub.textContent = `${player.position.en} (${player.position.uz}) · ${player.club} · ${player.country.en}`;
    this.playerRevealBadge.classList.remove("hidden");

    // 3. Update score & streak numbers
    this.animateScoreUpdate(newScore);
    this.hudStreakEn.textContent = `${newStreak}`;
    this.hudStreakUz.textContent = `KETMA-KET: ${newStreak}`;

    // 4. Clean editorial feedback notice
    const correctAnswerObj = questionObj.answers.find(a => a.correct);
    if (isCorrect) {
      this.feedbackArea.className = "query-feedback-panel feedback-correct";
      this.feedbackArea.innerHTML = `
        <span class="feedback-icon">✓</span>
        <div class="feedback-text">
          <div class="bilingual-feedback-title">
            <span class="text-en">CORRECT (+100 PTS)</span>
            <span class="text-uz">TO‘G‘RI (+100 OCHKO)</span>
          </div>
        </div>
      `;
    } else {
      this.feedbackArea.className = "query-feedback-panel feedback-wrong";
      this.feedbackArea.innerHTML = `
        <span class="feedback-icon">✕</span>
        <div class="feedback-text">
          <div class="bilingual-feedback-title">
            <span class="text-en">WRONG ANSWER</span>
            <span class="text-uz">NOTO‘G‘RI JAVOB</span>
          </div>
          <div class="bilingual-feedback-sub">
            <span class="text-en">The correct answer is: <strong>${correctAnswerObj.en}</strong></span>
            <span class="text-uz">To‘g‘ri javob: <strong>${correctAnswerObj.uz}</strong></span>
          </div>
        </div>
      `;
    }
    this.feedbackArea.classList.remove("hidden");

    // 5. Reveal next button
    this.btnNext.classList.remove("hidden");
    this.btnNext.focus();
  }

  renderResults(stats, isNewBest) {
    this.progressBarFill.style.width = "100%";

    // Score reveal count-up
    const targetScore = stats.score;
    let currentScore = 0;
    const duration = 600;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      currentScore = Math.round(targetScore * progress);
      this.resultScoreNum.textContent = currentScore;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.resultScoreNum.textContent = targetScore;
      }
    };
    requestAnimationFrame(step);

    // Metrics
    this.resultAccuracyEn.textContent = `${stats.accuracy}%`;
    this.resultAccuracyUz.textContent = `${stats.accuracy}% to‘g‘ri javob`;

    this.resultCorrectEn.textContent = `${stats.correctCount} / 5`;
    this.resultCorrectUz.textContent = `5 tadan ${stats.correctCount} tasi to‘g‘ri`;

    this.resultStreakEn.textContent = `${stats.bestStreak}`;
    this.resultStreakUz.textContent = `Ketma-ket: ${stats.bestStreak}`;

    // Rating tier
    const rating = this._getRatingTier(stats.accuracy);
    this.resultRatingEn.textContent = rating.en;
    this.resultRatingUz.textContent = rating.uz;

    // Record notice
    if (isNewBest) {
      this.resultNewBest.classList.remove("hidden");
    } else {
      this.resultNewBest.classList.add("hidden");
    }
  }

  _getRatingTier(accuracy) {
    for (const tier of RATING_TIERS) {
      if (accuracy >= tier.min) {
        return tier;
      }
    }
    return RATING_TIERS[RATING_TIERS.length - 1];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { UIController };
}
