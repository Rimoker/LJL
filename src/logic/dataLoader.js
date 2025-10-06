// Data loader module: handles loading kana.json with fallback
(function (window) {
  const FALLBACK_DATA = {
    hiragana: [
      { kana: "あ", romaji: "a", strokes: [] },
      { kana: "い", romaji: "i", strokes: [] },
      { kana: "う", romaji: "u", strokes: [] },
      { kana: "え", romaji: "e", strokes: [] },
      { kana: "お", romaji: "o", strokes: [] },
    ],
    katakana: [
      { kana: "ア", romaji: "a", strokes: [] },
      { kana: "イ", romaji: "i", strokes: [] },
      { kana: "ウ", romaji: "u", strokes: [] },
      { kana: "エ", romaji: "e", strokes: [] },
      { kana: "オ", romaji: "o", strokes: [] },
    ],
  };

  async function loadKanaData() {
    let data = null;
    try {
      let tryPaths = [];
      if (window.MAINFRAME && typeof MAINFRAME.getHomeDir === "function") {
        const home = MAINFRAME.getHomeDir();
        if (home && window.location.protocol !== "file:") {
          tryPaths.push(home.replace(/\/$/, "") + "/data/kana.json");
        }
      }
      tryPaths.push("data/kana.json");

      let res = null;
      let lastErr = null;
      for (const p of tryPaths) {
        try {
          let fetchPath = p;
          try {
            if (typeof p === "string" && p.startsWith("file://")) {
              fetchPath = p.replace(/ /g, "%20");
            }
          } catch (e) {
            fetchPath = p;
          }
          res = await fetch(fetchPath);
          if (!res.ok)
            throw new Error("Fetch failed: " + res.status + " (" + p + ")");
          break;
        } catch (e) {
          lastErr = e;
          res = null;
        }
      }
      if (!res) throw lastErr || new Error("Could not fetch data/kana.json");
      data = await res.json();
    } catch (err) {
      console.warn(
        "Could not load data/kana.json, using fallback data. Error:",
        err
      );
      data = FALLBACK_DATA;
    }
    return { data, isFallback: data === FALLBACK_DATA };
  }

  async function loadAlphabetsData() {
    try {
      const res = await fetch("data/alphabets.json");
      return await res.json();
    } catch (e) {
      console.warn("Could not load alphabets.json:", e);
      return null;
    }
  }

  window.DataLoader = {
    loadKanaData,
    loadAlphabetsData,
    FALLBACK_DATA,
  };
})(window);
