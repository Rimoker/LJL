// DOM elements module: centralized access to all UI elements
(function (window) {
  function getElements() {
    return {
      nextBtn: document.getElementById("nextBtn"),
      showAnswerBtn: document.getElementById("showAnswerBtn"),
      kanaDisplay: document.getElementById("kanaDisplay"),
      romajiArea: document.getElementById("romajiArea"),
      drawArea: document.getElementById("drawArea"),
      answerInput: document.getElementById("answerInput"),
      checkBtn: document.getElementById("checkBtn"),
      feedback: document.getElementById("feedback"),
      statsContent: document.getElementById("statsContent"),
      resetStats: document.getElementById("resetStats"),
      showRef: document.getElementById("showRef"),
      clearBtn: document.getElementById("clearBtn"),
      submitDrawBtn: document.getElementById("submitDrawBtn"),
      drawResult: document.getElementById("drawResult"),
      alphabetSelect: document.getElementById("alphabetSelect"),
      modeSelect: document.getElementById("modeSelect"),
      dataFileInput: document.getElementById("dataFileInput"),
      dataStatusSpan: document.getElementById("dataStatus"),
      orderCheck: document.getElementById("orderCheck"),
      showAlphabetBtn: document.getElementById("showAlphabetBtn"),
      alphabetModal: document.getElementById("alphabetModal"),
      closeAlphabetModal: document.getElementById("closeAlphabetModal"),
      alphabetTable: document.getElementById("alphabetTable"),
      useGoogleAPI: document.getElementById("useGoogleAPI"),
      apiStatus: document.getElementById("apiStatus"),
      settingsBtn: document.getElementById("settingsBtn"),
    };
  }

  window.DOMElements = {
    getElements,
  };
})(window);
