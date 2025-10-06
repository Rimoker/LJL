// Events module: handles all UI event listeners
(function (window) {
  const DRAW_PASS_THRESHOLD = 0.45;

  function setupDataFileLoader(elements, data, state) {
    const { dataFileInput, dataStatusSpan, modeSelect } = elements;

    if (dataFileInput) {
      dataFileInput.addEventListener("change", (ev) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsed = JSON.parse(e.target.result);
            if (parsed && (parsed.hiragana || parsed.katakana)) {
              state.data = parsed;
              if (dataStatusSpan) {
                dataStatusSpan.textContent = `Loaded data from ${f.name}`;
                dataStatusSpan.style.color = "green";
              }
              state.current = window.Rendering.pickRandom(
                state.data,
                elements.alphabetSelect
              );
              window.Rendering.renderKana(
                state.current,
                modeSelect,
                elements,
                elements.showRef
              );
              window.Rendering.showFor(modeSelect.value, elements);
            } else {
              if (dataStatusSpan) {
                dataStatusSpan.textContent =
                  "JSON loaded but missing expected fields (hiragana/katakana).";
                dataStatusSpan.style.color = "red";
              }
            }
          } catch (err) {
            if (dataStatusSpan) {
              dataStatusSpan.textContent =
                "Failed to parse JSON: " + err.message;
              dataStatusSpan.style.color = "red";
            }
            console.error("Error parsing uploaded data file:", err);
          }
        };
        reader.readAsText(f, "utf-8");
      });
    }
  }

  function setupNextButton(elements, state) {
    const { nextBtn, modeSelect, alphabetSelect } = elements;

    nextBtn.addEventListener("click", () => {
      state.current = window.Rendering.pickRandom(state.data, alphabetSelect);
      window.Rendering.renderKana(
        state.current,
        modeSelect,
        elements,
        elements.showRef
      );
      window.Rendering.showFor(modeSelect.value, elements);

      if (modeSelect.value === "draw") {
        const instances = window.Rendering.getCurrentDrawInstances();
        if (instances && instances.length) {
          instances.forEach((it) => it.inst && it.inst.clear());
        }
      }

      (async () => {
        const note = `Added card: ${
          state.current.kana || state.current.romaji
        } (${alphabetSelect.value})`;
        try {
          const res = await fetch("http://localhost:3000/log", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: note,
          });
          if (!res.ok) throw new Error("server responded " + res.status);
        } catch (e) {
          try {
            if (
              navigator &&
              navigator.clipboard &&
              navigator.clipboard.writeText
            ) {
              await navigator.clipboard.writeText(note);
            } else {
              const ta = document.createElement("textarea");
              ta.value = note;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
            }
          } catch (e2) {}
        }
      })();
    });
  }

  function setupModeChange(elements, state) {
    const { modeSelect, alphabetSelect } = elements;
    modeSelect.addEventListener("change", () => {
      // Show appropriate UI for the mode
      window.Rendering.showFor(modeSelect.value, elements);

      // Auto-refresh with new card
      state.current = window.Rendering.pickRandom(state.data, alphabetSelect);
      window.Rendering.renderKana(
        state.current,
        modeSelect,
        elements,
        elements.showRef
      );

      // Clear draw canvases if switching to draw mode
      if (modeSelect.value === "draw") {
        const instances = window.Rendering.getCurrentDrawInstances();
        if (instances && instances.length) {
          instances.forEach((it) => it.inst && it.inst.clear());
        }
      }
    });
  }

  function setupShowAnswer(elements, state) {
    const { showAnswerBtn, modeSelect, feedback } = elements;

    showAnswerBtn.addEventListener("click", () => {
      if (!state.current) return;
      if (modeSelect.value === "draw") {
        feedback.textContent = `Answer: ${state.current.kana}`;
      } else if (modeSelect.value === "romaji2kana") {
        feedback.textContent = `Answer: ${state.current.kana}`;
      } else {
        feedback.textContent = `Answer: ${state.current.romaji}`;
      }
    });
  }

  function setupCheckButton(elements, state) {
    const { checkBtn, answerInput, modeSelect, feedback } = elements;

    checkBtn.addEventListener("click", () => {
      if (!state.current) return;
      const mode = modeSelect.value;
      const ans = answerInput.value.trim().toLowerCase();

      if (mode === "romaji") {
        if (ans === state.current.romaji) {
          feedback.textContent = "Correct";
          const s = window.Stats.addStat(true);
          window.Stats.renderStats(elements.statsContent);
          setTimeout(() => {
            state.current = window.Rendering.pickRandom(
              state.data,
              elements.alphabetSelect
            );
            window.Rendering.renderKana(
              state.current,
              modeSelect,
              elements,
              elements.showRef
            );
            window.Rendering.showFor(modeSelect.value, elements);
            answerInput.value = "";
          }, 400);
        } else {
          feedback.textContent = `Wrong — expected ${state.current.romaji}`;
          window.Stats.addStat(false);
          window.Stats.renderStats(elements.statsContent);
        }
      } else if (mode === "romaji2kana") {
        if (ans === (state.current.kana || "").toLowerCase()) {
          feedback.textContent = "Correct (kana)!";
          window.Stats.addStat(true);
          window.Stats.renderStats(elements.statsContent);
          setTimeout(() => {
            state.current = window.Rendering.pickRandom(
              state.data,
              elements.alphabetSelect
            );
            window.Rendering.renderKana(
              state.current,
              modeSelect,
              elements,
              elements.showRef
            );
            window.Rendering.showFor(modeSelect.value, elements);
            answerInput.value = "";
          }, 400);
        } else {
          feedback.textContent = `Wrong — expected ${state.current.kana}`;
          window.Stats.addStat(false);
          window.Stats.renderStats(elements.statsContent);
        }
      }
    });
  }

  function setupDrawControls(elements, state) {
    const {
      clearBtn,
      submitDrawBtn,
      showRef,
      drawArea,
      modeSelect,
      feedback,
      drawResult,
      alphabetSelect,
    } = elements;

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        const wraps = document.querySelectorAll(".draw-canvas-wrap");
        wraps.forEach((w) => {
          const cvs = w.querySelector("canvas.user-canvas");
          if (cvs && cvs._instance) cvs._instance.clear();
        });
        document.querySelectorAll(".draw-result-span").forEach((el) => {
          el.textContent = "";
        });
        drawResult.textContent = "";
      });
    }

    if (submitDrawBtn) {
      submitDrawBtn.addEventListener("click", async () => {
        const currentDrawInstances = window.Rendering.getCurrentDrawInstances();
        const useAPI = elements.useGoogleAPI && elements.useGoogleAPI.checked;

        if (!currentDrawInstances || currentDrawInstances.length === 0) {
          drawResult.textContent = "Nothing to submit.";
          return;
        }

        let allPass = true;
        let anyScore = false;
        let scores = [];

        // Update API status
        if (useAPI && elements.apiStatus) {
          elements.apiStatus.textContent = "🔄 Recognizing with Google AI...";
          elements.apiStatus.style.color = "#0066cc";
        }

        for (const it of currentDrawInstances) {
          const { inst, ref, idx, resultSpan } = it;
          const expectedChar = state.current.kana[idx] || state.current.kana;

          if (useAPI) {
            // Use Google Handwriting API
            try {
              const strokes = inst.strokes; // Get strokes from drawing instance
              const result = await window.HandwritingAPI.recognizeHandwriting(
                strokes,
                {
                  language: "ja",
                  maxResults: 5,
                  width: 256,
                  height: 256,
                }
              );

              if (result.success && result.candidates.length > 0) {
                const match = window.HandwritingAPI.getBestMatch(
                  result.candidates,
                  expectedChar
                );
                const score = match.isCorrect ? 1.0 : 0;
                scores.push(score);
                anyScore = true;

                if (match.isCorrect) {
                  resultSpan.textContent = `✓ ${match.recognized} (${(
                    match.confidence * 100
                  ).toFixed(0)}%)`;
                  resultSpan.classList.remove("fail");
                  resultSpan.classList.add("pass");
                } else {
                  resultSpan.textContent = `✗ Got: ${match.recognized} (Expected: ${expectedChar})`;
                  resultSpan.classList.remove("pass");
                  resultSpan.classList.add("fail");
                  allPass = false;
                }
              } else {
                resultSpan.textContent = `❌ Recognition failed`;
                resultSpan.classList.add("fail");
                scores.push(0);
                anyScore = true;
                allPass = false;
              }
            } catch (error) {
              console.error("API recognition error:", error);
              resultSpan.textContent = `❌ Error: ${error.message}`;
              scores.push(0);
              anyScore = true;
              allPass = false;
            }
          } else {
            // Use local similarity algorithm
            const userImg = inst.exportImageData(128);
            const tmp = document.createElement("canvas");
            tmp.width = 128;
            tmp.height = 128;
            const tctx = tmp.getContext("2d");
            tctx.fillStyle = "#fff";
            tctx.fillRect(0, 0, 128, 128);
            tctx.drawImage(ref, 0, 0, 128, 128);
            const refImg = tctx.getImageData(0, 0, 128, 128);

            let bestScore = 0;
            let variants = [refImg];

            if (state.data && state.data[alphabetSelect.value]) {
              const allVariants = state.data[alphabetSelect.value].filter(
                (k) => k.kana === expectedChar
              );
              if (allVariants.length > 1) {
                variants = allVariants.map((k) =>
                  window.Similarity.getRefImageDataFor(k, 128)
                );
              }
            }

            for (const v of variants) {
              const res = window.Similarity.computeSimilarityFromImageData(
                userImg,
                v
              );
              if (res.score > bestScore) {
                bestScore = res.score;
              }
            }

            const score = Math.max(0, Math.min(1, bestScore));
            scores.push(score);
            anyScore = true;
            resultSpan.textContent = `Score: ${(score * 100).toFixed(1)}%`;

            if (score >= DRAW_PASS_THRESHOLD) {
              resultSpan.classList.remove("fail");
              resultSpan.classList.add("pass");
            } else {
              resultSpan.classList.remove("pass");
              resultSpan.classList.add("fail");
            }
            if (score < DRAW_PASS_THRESHOLD) allPass = false;
          }
        }

        // Update API status
        if (useAPI && elements.apiStatus) {
          elements.apiStatus.textContent = "✓ Recognition complete";
          elements.apiStatus.style.color = "#1a7f37";
          setTimeout(() => {
            if (elements.apiStatus) elements.apiStatus.textContent = "";
          }, 3000);
        }

        if (!anyScore) {
          drawResult.textContent = "No input detected.";
          return;
        }

        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        drawResult.textContent = `Average score: ${(avg * 100).toFixed(1)}%`;

        if (allPass) {
          feedback.textContent = "Correct (draw)!";
          window.Stats.addStat(true);
          window.Stats.renderStats(elements.statsContent);
          setTimeout(() => {
            state.current = window.Rendering.pickRandom(
              state.data,
              alphabetSelect
            );
            window.Rendering.renderKana(
              state.current,
              modeSelect,
              elements,
              showRef
            );
            window.Rendering.showFor(modeSelect.value, elements);
          }, 450);
        } else {
          feedback.textContent = "Keep practicing — not good enough yet.";
          window.Stats.addStat(false);
          window.Stats.renderStats(elements.statsContent);
        }
      });
    }

    if (showRef) {
      showRef.addEventListener("change", () => {
        try {
          if (showRef && drawArea) {
            if (!showRef.checked) drawArea.classList.add("refs-hidden");
            else drawArea.classList.remove("refs-hidden");
          }
        } catch (e) {}
        if (state.current) {
          window.Rendering.renderKana(
            state.current,
            modeSelect,
            elements,
            showRef
          );
        }
      });
    }
  }

  function setupResetStats(elements) {
    const { resetStats, statsContent } = elements;
    resetStats.addEventListener("click", () => {
      window.Stats.resetStats();
      window.Stats.renderStats(statsContent);
    });
  }

  function setupAlphabetChange(elements, state) {
    const { alphabetSelect, modeSelect } = elements;

    alphabetSelect.addEventListener("change", () => {
      // Auto-refresh like clicking Next
      state.current = window.Rendering.pickRandom(state.data, alphabetSelect);
      window.Rendering.renderKana(
        state.current,
        modeSelect,
        elements,
        elements.showRef
      );
      window.Rendering.showFor(modeSelect.value, elements);

      // Clear draw canvases if in draw mode
      if (modeSelect.value === "draw") {
        const instances = window.Rendering.getCurrentDrawInstances();
        if (instances && instances.length) {
          instances.forEach((it) => it.inst && it.inst.clear());
        }
      }
    });
  }

  function initAllEvents(elements, state) {
    setupDataFileLoader(elements, state.data, state);
    setupNextButton(elements, state);
    setupModeChange(elements, state);
    setupShowAnswer(elements, state);
    setupCheckButton(elements, state);
    setupDrawControls(elements, state);
    setupResetStats(elements);
    setupAlphabetChange(elements, state);
  }

  window.Events = {
    initAllEvents,
  };
})(window);
