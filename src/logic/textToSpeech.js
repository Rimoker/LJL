// Text-to-Speech module for Japanese pronunciation
(function (window) {
  let speechEnabled = true;
  let currentUtterance = null;

  /**
   * Speak the given text in Japanese
   * @param {string} text - Text to speak (kana or romaji)
   * @param {string} type - 'kana' or 'romaji' to determine language
   */
  function speak(text, type = "kana") {
    // Check if browser supports speech synthesis
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported in this browser");
      return;
    }

    // Stop any ongoing speech
    stop();

    if (!speechEnabled || !text) return;

    // Create utterance
    currentUtterance = new SpeechSynthesisUtterance(text);

    // Set language based on type
    if (type === "kana") {
      currentUtterance.lang = "ja-JP"; // Japanese
    } else {
      currentUtterance.lang = "en-US"; // English for romaji
    }

    // Speech settings
    currentUtterance.rate = 0.8; // Slower speed for learning
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;

    // Error handling
    currentUtterance.onerror = function (event) {
      console.error("Speech synthesis error:", event);
    };

    // Speak
    window.speechSynthesis.speak(currentUtterance);
  }

  /**
   * Stop current speech
   */
  function stop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    currentUtterance = null;
  }

  /**
   * Toggle speech on/off
   * @param {boolean} enabled - Enable or disable speech
   */
  function setEnabled(enabled) {
    speechEnabled = enabled;
    if (!enabled) {
      stop();
    }
  }

  /**
   * Check if speech is enabled
   * @returns {boolean}
   */
  function isEnabled() {
    return speechEnabled;
  }

  /**
   * Check if browser supports speech synthesis
   * @returns {boolean}
   */
  function isSupported() {
    return "speechSynthesis" in window;
  }

  // Export to window
  window.TextToSpeech = {
    speak: speak,
    stop: stop,
    setEnabled: setEnabled,
    isEnabled: isEnabled,
    isSupported: isSupported,
  };
})(window);
