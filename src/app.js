// Main application entry point - LJL v0.7 (with theme system)
(async function () {
  // Initialize theme manager first
  window.ThemeManager.init();

  // Initialize settings modal
  window.SettingsModal.init();

  // Load kana data
  const { data, isFallback } = await window.DataLoader.loadKanaData();

  // Get all DOM elements
  const elements = window.DOMElements.getElements();

  // Setup settings button
  if (elements.settingsBtn) {
    elements.settingsBtn.addEventListener("click", () => {
      window.SettingsModal.openModal();
    });
  }

  // Application state
  const state = {
    data: data,
    current: null,
  };

  // Initialize all event handlers
  window.Events.initAllEvents(elements, state);

  // Initialize alphabet modal
  window.AlphabetModal.initAlphabetModal(elements);

  // Test Google Handwriting API connection on load and on change
  if (elements.useGoogleAPI) {
    // Test on load if checkbox is checked
    if (elements.useGoogleAPI.checked && elements.apiStatus) {
      elements.apiStatus.textContent = "🔄 Testing API connection...";
      elements.apiStatus.style.color = "var(--primary-color)";
      const isConnected = await window.HandwritingAPI.testAPIConnection();
      if (isConnected) {
        elements.apiStatus.textContent = "✓ Google AI ready";
        elements.apiStatus.style.color = "#34C759";
      } else {
        elements.apiStatus.textContent = "❌ API connection failed";
        elements.apiStatus.style.color = "#FF3B30";
        elements.useGoogleAPI.checked = false;
      }
      setTimeout(() => {
        if (elements.apiStatus) elements.apiStatus.textContent = "";
      }, 3000);
    }

    // Test on change
    elements.useGoogleAPI.addEventListener("change", async (e) => {
      if (e.target.checked && elements.apiStatus) {
        elements.apiStatus.textContent = "🔄 Testing API connection...";
        elements.apiStatus.style.color = "var(--primary-color)";
        const isConnected = await window.HandwritingAPI.testAPIConnection();
        if (isConnected) {
          elements.apiStatus.textContent = "✓ Google AI ready";
          elements.apiStatus.style.color = "#34C759";
        } else {
          elements.apiStatus.textContent = "❌ API connection failed";
          elements.apiStatus.style.color = "#FF3B30";
          e.target.checked = false;
        }
        setTimeout(() => {
          if (elements.apiStatus) elements.apiStatus.textContent = "";
        }, 3000);
      }
    });
  }

  // Render initial stats
  window.Stats.renderStats(elements.statsContent);

  // Start with a random card
  state.current = window.Rendering.pickRandom(
    state.data,
    elements.alphabetSelect
  );
  window.Rendering.renderKana(
    state.current,
    elements.modeSelect,
    elements,
    elements.showRef
  );
  window.Rendering.showFor(elements.modeSelect.value, elements);
})();
