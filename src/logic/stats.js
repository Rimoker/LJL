// Statistics module: load, save, render stats
(function (window) {
  function loadStats() {
    const s = JSON.parse(localStorage.getItem("ljl_stats") || "{}");
    return s;
  }

  function saveStats(s) {
    localStorage.setItem("ljl_stats", JSON.stringify(s));
  }

  function addStat(ok) {
    const s = loadStats();
    s.attempts = (s.attempts || 0) + 1;
    s.correct = (s.correct || 0) + (ok ? 1 : 0);
    saveStats(s);
    return s;
  }

  function resetStats() {
    localStorage.removeItem("ljl_stats");
  }

  function renderStats(statsContent) {
    const s = loadStats();
    if (!s.attempts) {
      statsContent.textContent = "No attempts yet.";
    } else {
      statsContent.textContent = `Attempts: ${s.attempts}, Correct: ${
        s.correct
      } (${((s.correct / s.attempts) * 100).toFixed(1)}%)`;
    }
  }

  window.Stats = {
    loadStats,
    saveStats,
    addStat,
    resetStats,
    renderStats,
  };
})(window);
