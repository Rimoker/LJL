// Alphabet modal module: handles alphabet viewer modal
(function (window) {
  let alphabetsData = null;

  async function loadAlphabetsData() {
    if (alphabetsData) return alphabetsData;
    alphabetsData = await window.DataLoader.loadAlphabetsData();
    return alphabetsData;
  }

  function renderAlphabetTable(alpha, alphabetTable) {
    if (!alphabetsData) return;
    const kanaRows = alphabetsData[alpha] || [];
    const romajiRows = alphabetsData["romaji"] || [];
    let html = '<table style="border-collapse:collapse;margin:0 auto;">';
    for (let i = 0; i < kanaRows.length; ++i) {
      html += "<tr>";
      for (let j = 0; j < kanaRows[i].length; ++j) {
        const kana = kanaRows[i][j] || "";
        const romaji = romajiRows[i] ? romajiRows[i][j] : "";
        html += `<td style="border:1px solid #ddd;padding:8px 10px;text-align:center;font-size:32px;min-width:38px;">${kana}<div style='font-size:13px;color:#888;'>${romaji}</div></td>`;
      }
      html += "</tr>";
    }
    html += "</table>";
    alphabetTable.innerHTML = html;
  }

  function initAlphabetModal(elements) {
    const {
      showAlphabetBtn,
      alphabetModal,
      closeAlphabetModal,
      alphabetTable,
      alphabetSelect,
    } = elements;

    if (
      !showAlphabetBtn ||
      !alphabetModal ||
      !closeAlphabetModal ||
      !alphabetTable
    ) {
      return;
    }

    showAlphabetBtn.addEventListener("click", async () => {
      await loadAlphabetsData();
      renderAlphabetTable(alphabetSelect.value, alphabetTable);
      alphabetModal.classList.remove("hidden");
    });

    closeAlphabetModal.addEventListener("click", () => {
      alphabetModal.classList.add("hidden");
    });

    alphabetModal.addEventListener("click", (e) => {
      if (e.target === alphabetModal) alphabetModal.classList.add("hidden");
    });

    alphabetSelect.addEventListener("change", () => {
      if (!alphabetModal.classList.contains("hidden")) {
        renderAlphabetTable(alphabetSelect.value, alphabetTable);
      }
    });
  }

  window.AlphabetModal = {
    initAlphabetModal,
  };
})(window);
