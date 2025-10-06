// Settings Modal UI
// Manages the settings panel with all customization options
(function (window) {
  let settingsModal = null;
  let settingsForm = null;

  /**
   * Create settings modal HTML
   */
  function createSettingsModal() {
    const modal = document.createElement("div");
    modal.id = "settingsModal";
    modal.className = "settings-modal hidden";
    modal.innerHTML = `
      <div class="settings-modal-content">
        <button id="closeSettingsModal" class="settings-modal-close">×</button>
        <h2>⚙️ Settings</h2>
        
        <div class="settings-section">
          <h3>Appearance</h3>
          
          <div class="setting-item">
            <label>
              <span>Theme</span>
              <select id="settingTheme" class="setting-select">
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
            </label>
          </div>

          <div class="setting-item">
            <label>
              <span>Font Size: <span id="fontSizeValue">16</span>px</span>
              <input type="range" id="settingFontSize" min="12" max="24" value="16" class="setting-range" />
            </label>
          </div>

          <div class="setting-item">
            <label>
              <span>Annotation Font Size: <span id="annotationFontSizeValue">24</span>px</span>
              <input type="range" id="settingAnnotationFontSize" min="20" max="60" step="2" value="24" class="setting-range" />
            </label>
          </div>

          <div class="setting-item">
            <label>
              <span>Border Radius: <span id="borderRadiusValue">12</span>px</span>
              <input type="range" id="settingBorderRadius" min="0" max="24" value="12" class="setting-range" />
            </label>
          </div>

          <div class="setting-item">
            <label>
              <span>Draw Field Size: <span id="drawFieldSizeValue">256</span>px</span>
              <input type="range" id="settingDrawFieldSize" min="128" max="512" step="32" value="256" class="setting-range" />
            </label>
          </div>

          <div class="setting-item">
            <label>
              <span>Card Size: <span id="cardSizeValue">80</span>px</span>
              <input type="range" id="settingCardSize" min="40" max="200" step="10" value="80" class="setting-range" />
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>Colors</h3>
          
          <div class="setting-item">
            <label>
              <span>Primary Color</span>
              <input type="color" id="settingPrimaryColor" value="#007AFF" class="setting-color" />
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>Animations</h3>
          
          <div class="setting-item">
            <label class="setting-checkbox">
              <input type="checkbox" id="settingAnimations" checked />
              <span>Enable animations</span>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>Audio</h3>
          
          <div class="setting-item">
            <label class="setting-checkbox">
              <input type="checkbox" id="settingSpeech" checked />
              <span>🔊 Enable pronunciation (Text-to-Speech)</span>
            </label>
          </div>
        </div>

        <div class="settings-actions">
          <button id="resetSettingsBtn" class="btn-secondary">Reset to defaults</button>
          <button id="saveSettingsBtn" class="btn-primary">Save changes</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  /**
   * Initialize settings modal
   */
  function init() {
    settingsModal = createSettingsModal();
    setupEventListeners();
    loadCurrentSettings();
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    const closeBtn = document.getElementById("closeSettingsModal");
    const saveBtn = document.getElementById("saveSettingsBtn");
    const resetBtn = document.getElementById("resetSettingsBtn");

    // Close modal
    closeBtn.addEventListener("click", closeModal);
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) closeModal();
    });

    // Save settings
    saveBtn.addEventListener("click", saveSettings);

    // Reset settings
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all settings to defaults?")) {
        window.ThemeManager.resetSettings();
        loadCurrentSettings();
      }
    });

    // Live preview for ranges
    const fontSizeInput = document.getElementById("settingFontSize");
    const annotationFontSizeInput = document.getElementById(
      "settingAnnotationFontSize"
    );
    const borderRadiusInput = document.getElementById("settingBorderRadius");
    const drawFieldSizeInput = document.getElementById("settingDrawFieldSize");
    const cardSizeInput = document.getElementById("settingCardSize");

    fontSizeInput.addEventListener("input", (e) => {
      document.getElementById("fontSizeValue").textContent = e.target.value;
    });

    annotationFontSizeInput.addEventListener("input", (e) => {
      document.getElementById("annotationFontSizeValue").textContent =
        e.target.value;
    });

    borderRadiusInput.addEventListener("input", (e) => {
      document.getElementById("borderRadiusValue").textContent = e.target.value;
    });

    drawFieldSizeInput.addEventListener("input", (e) => {
      document.getElementById("drawFieldSizeValue").textContent =
        e.target.value;
    });

    cardSizeInput.addEventListener("input", (e) => {
      document.getElementById("cardSizeValue").textContent = e.target.value;
    });
  }

  /**
   * Load current settings into form
   */
  function loadCurrentSettings() {
    const settings = window.ThemeManager.getSettings();

    document.getElementById("settingTheme").value = settings.theme;
    document.getElementById("settingFontSize").value = settings.fontSize;
    document.getElementById("fontSizeValue").textContent = settings.fontSize;
    document.getElementById("settingAnnotationFontSize").value =
      settings.annotationFontSize;
    document.getElementById("annotationFontSizeValue").textContent =
      settings.annotationFontSize;
    document.getElementById("settingBorderRadius").value =
      settings.borderRadius;
    document.getElementById("borderRadiusValue").textContent =
      settings.borderRadius;
    document.getElementById("settingDrawFieldSize").value =
      settings.drawFieldSize;
    document.getElementById("drawFieldSizeValue").textContent =
      settings.drawFieldSize;
    document.getElementById("settingCardSize").value = settings.cardSize;
    document.getElementById("cardSizeValue").textContent = settings.cardSize;
    document.getElementById("settingPrimaryColor").value =
      settings.primaryColor;
    document.getElementById("settingAnimations").checked =
      settings.animationsEnabled;
    document.getElementById("settingSpeech").checked =
      settings.speechEnabled !== false; // Default to true
  }

  /**
   * Save settings from form
   */
  function saveSettings() {
    const newSettings = {
      theme: document.getElementById("settingTheme").value,
      fontSize: parseInt(document.getElementById("settingFontSize").value),
      annotationFontSize: parseInt(
        document.getElementById("settingAnnotationFontSize").value
      ),
      borderRadius: parseInt(
        document.getElementById("settingBorderRadius").value
      ),
      drawFieldSize: parseInt(
        document.getElementById("settingDrawFieldSize").value
      ),
      cardSize: parseInt(document.getElementById("settingCardSize").value),
      primaryColor: document.getElementById("settingPrimaryColor").value,
      animationsEnabled: document.getElementById("settingAnimations").checked,
      speechEnabled: document.getElementById("settingSpeech").checked,
    };

    window.ThemeManager.saveSettings(newSettings);
    
    // Update TextToSpeech setting if available
    if (window.TextToSpeech) {
      window.TextToSpeech.setEnabled(newSettings.speechEnabled);
    }
    
    closeModal();

    // Show success message
    const feedback = document.getElementById("feedback");
    if (feedback) {
      feedback.textContent = "✅ Settings saved!";
      feedback.style.color = "var(--primary-color)";
      setTimeout(() => {
        feedback.textContent = "";
      }, 2000);
    }
  }

  /**
   * Open settings modal
   */
  function openModal() {
    loadCurrentSettings();
    settingsModal.classList.remove("hidden");
    settingsModal.classList.add("fade-in");
  }

  /**
   * Close settings modal
   */
  function closeModal() {
    settingsModal.classList.add("hidden");
    settingsModal.classList.remove("fade-in");
  }

  window.SettingsModal = {
    init,
    openModal,
    closeModal,
  };
})(window);
