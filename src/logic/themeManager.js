// Theme and Settings Manager
// Manages theme switching, custom settings, and user preferences
(function (window) {
  const STORAGE_KEY = "ljl_settings";

  // Default settings
  const DEFAULT_SETTINGS = {
    theme: "light",
    fontSize: 16,
    annotationFontSize: 24,
    drawFieldSize: 256,
    cardSize: 80,
    borderRadius: 12,
    animationsEnabled: true,
    speechEnabled: true,
    primaryColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  };

  let currentSettings = { ...DEFAULT_SETTINGS };

  /**
   * Load settings from localStorage
   */
  function loadSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
    return currentSettings;
  }

  /**
   * Save settings to localStorage
   */
  function saveSettings(settings) {
    try {
      currentSettings = { ...currentSettings, ...settings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSettings));
      applySettings(currentSettings);
      return true;
    } catch (error) {
      console.error("Failed to save settings:", error);
      return false;
    }
  }

  /**
   * Apply settings to the document
   */
  function applySettings(settings) {
    const root = document.documentElement;

    // Apply theme
    root.setAttribute("data-theme", settings.theme);

    // Apply CSS variables
    root.style.setProperty("--font-size-base", `${settings.fontSize}px`);
    root.style.setProperty(
      "--font-size-annotation",
      `${settings.annotationFontSize}px`
    );
    root.style.setProperty("--draw-field-size", `${settings.drawFieldSize}px`);
    root.style.setProperty("--kana-card-size", `${settings.cardSize}px`);
    root.style.setProperty("--border-radius", `${settings.borderRadius}px`);
    root.style.setProperty("--primary-color", settings.primaryColor);

    // Apply animations
    if (!settings.animationsEnabled) {
      root.style.setProperty("--animation-duration", "0s");
    } else {
      root.style.setProperty("--animation-duration", "0.3s");
    }

    // Theme-specific colors
    if (settings.theme === "dark") {
      root.style.setProperty("--bg-primary", "#000000");
      root.style.setProperty("--bg-secondary", "#1C1C1E");
      root.style.setProperty("--bg-tertiary", "#2C2C2E");
      root.style.setProperty("--text-primary", "#FFFFFF");
      root.style.setProperty("--text-secondary", "#EBEBF5");
      root.style.setProperty("--text-tertiary", "#EBEBF599");
      root.style.setProperty("--border-color", "#38383A");
      root.style.setProperty("--shadow", "0 8px 24px rgba(0, 0, 0, 0.4)");
    } else {
      root.style.setProperty("--bg-primary", "#FFFFFF");
      root.style.setProperty("--bg-secondary", "#F2F2F7");
      root.style.setProperty("--bg-tertiary", "#FFFFFF");
      root.style.setProperty("--text-primary", "#000000");
      root.style.setProperty("--text-secondary", "#3C3C43");
      root.style.setProperty("--text-tertiary", "#3C3C4399");
      root.style.setProperty("--border-color", "#D1D1D6");
      root.style.setProperty("--shadow", "0 8px 24px rgba(0, 0, 0, 0.08)");
    }
  }

  /**
   * Reset settings to defaults
   */
  function resetSettings() {
    currentSettings = { ...DEFAULT_SETTINGS };
    localStorage.removeItem(STORAGE_KEY);
    applySettings(currentSettings);
    return currentSettings;
  }

  /**
   * Get current settings
   */
  function getSettings() {
    return { ...currentSettings };
  }

  /**
   * Toggle theme between light and dark
   */
  function toggleTheme() {
    const newTheme = currentSettings.theme === "light" ? "dark" : "light";
    saveSettings({ theme: newTheme });
    return newTheme;
  }

  // Initialize on load
  function init() {
    loadSettings();
    applySettings(currentSettings);
  }

  window.ThemeManager = {
    init,
    loadSettings,
    saveSettings,
    resetSettings,
    getSettings,
    toggleTheme,
    applySettings,
  };
})(window);
