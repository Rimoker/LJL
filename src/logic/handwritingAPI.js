// Google Handwriting API integration module
// Provides handwriting recognition for kana characters using Google's API
(function (window) {
  // Google Handwriting API endpoint
  const API_ENDPOINT = "https://inputtools.google.com/request";
  const API_KEY = "AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw"; // Public demo key

  /**
   * Convert canvas strokes to Google API format
   * @param {Array} strokes - Array of stroke arrays with {x, y} points
   * @returns {Array} - Formatted strokes for Google API
   */
  function formatStrokesForAPI(strokes) {
    if (!strokes || strokes.length === 0) return [];

    const formatted = [];
    strokes.forEach((stroke) => {
      if (stroke.length === 0) return;
      const xPoints = [];
      const yPoints = [];
      stroke.forEach((point) => {
        xPoints.push(Math.round(point.x));
        yPoints.push(Math.round(point.y));
      });
      formatted.push([xPoints, yPoints]);
    });
    return formatted;
  }

  /**
   * Recognize handwriting using Google Handwriting API
   * @param {Array} strokes - Array of stroke arrays with {x, y} points
   * @param {Object} options - Recognition options
   * @returns {Promise<Array>} - Array of recognition results with confidence scores
   */
  async function recognizeHandwriting(strokes, options = {}) {
    const {
      language = "ja", // Japanese
      maxResults = 5,
      width = 256,
      height = 256,
    } = options;

    // Format strokes for API
    const formattedStrokes = formatStrokesForAPI(strokes);

    if (formattedStrokes.length === 0) {
      return { success: false, error: "No strokes provided", candidates: [] };
    }

    // Prepare API request
    const requestData = {
      input_type: 0, // 0 = HANDWRITING
      requests: [
        {
          writing_guide: {
            writing_area_width: width,
            writing_area_height: height,
          },
          pre_context: "",
          max_num_results: maxResults,
          max_completions: 0,
          language: language,
          ink: formattedStrokes,
        },
      ],
    };

    try {
      const response = await fetch(
        `${API_ENDPOINT}?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Parse response
      if (
        data &&
        data[0] === "SUCCESS" &&
        data[1] &&
        data[1][0] &&
        data[1][0][1]
      ) {
        const candidates = data[1][0][1].map((candidate, index) => ({
          text: candidate,
          confidence: 1 - index * 0.15, // Estimate confidence based on rank
          rank: index,
        }));

        return {
          success: true,
          candidates: candidates,
          raw: data,
        };
      } else {
        return {
          success: false,
          error: "No recognition results",
          candidates: [],
        };
      }
    } catch (error) {
      console.error("Handwriting recognition error:", error);
      return {
        success: false,
        error: error.message,
        candidates: [],
      };
    }
  }

  /**
   * Check if a recognized character matches the expected kana
   * @param {string} recognized - Recognized character
   * @param {string} expected - Expected kana character
   * @returns {boolean} - True if match
   */
  function matchesExpected(recognized, expected) {
    if (!recognized || !expected) return false;
    // Direct match
    if (recognized === expected) return true;
    // Normalize and compare (handle different unicode representations)
    return recognized.normalize("NFKC") === expected.normalize("NFKC");
  }

  /**
   * Get best match from candidates
   * @param {Array} candidates - Array of recognition candidates
   * @param {string} expected - Expected kana character
   * @returns {Object} - Best match info with isCorrect flag
   */
  function getBestMatch(candidates, expected) {
    if (!candidates || candidates.length === 0) {
      return { isCorrect: false, recognized: null, confidence: 0 };
    }

    // Check if any candidate matches expected
    for (const candidate of candidates) {
      if (matchesExpected(candidate.text, expected)) {
        return {
          isCorrect: true,
          recognized: candidate.text,
          confidence: candidate.confidence,
          rank: candidate.rank,
        };
      }
    }

    // No match found, return top candidate
    return {
      isCorrect: false,
      recognized: candidates[0].text,
      confidence: candidates[0].confidence,
      rank: candidates[0].rank,
      allCandidates: candidates.map((c) => c.text).join(", "),
    };
  }

  /**
   * Test API connectivity
   * @returns {Promise<boolean>} - True if API is accessible
   */
  async function testAPIConnection() {
    try {
      const testStrokes = [
        [
          { x: 50, y: 50 },
          { x: 100, y: 100 },
          { x: 150, y: 50 },
        ],
      ];
      const result = await recognizeHandwriting(testStrokes);
      return result.success;
    } catch (error) {
      console.error("API connection test failed:", error);
      return false;
    }
  }

  window.HandwritingAPI = {
    recognizeHandwriting,
    matchesExpected,
    getBestMatch,
    testAPIConnection,
  };
})(window);
