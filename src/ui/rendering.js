// Rendering module: handles UI rendering for different modes
(function (window) {
  let currentDrawInstances = [];

  function pickRandom(data, alphabetSelect) {
    const alpha = alphabetSelect.value;
    const arr = data[alpha];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showFor(mode, elements) {
    const { romajiArea, drawArea, answerInput, feedback, drawResult } =
      elements;
    const drawCanvases = document.getElementById("drawCanvases");

    if (mode === "romaji") {
      romajiArea.classList.remove("hidden");
      drawArea.classList.add("hidden");
      if (drawCanvases) drawCanvases.innerHTML = "";
      answerInput.placeholder = "Type romaji here";
    } else if (mode === "romaji2kana") {
      romajiArea.classList.remove("hidden");
      drawArea.classList.add("hidden");
      if (drawCanvases) drawCanvases.innerHTML = "";
      answerInput.placeholder = "Input kana here";
    } else {
      romajiArea.classList.add("hidden");
      drawArea.classList.remove("hidden");
    }
    feedback.textContent = "";
    drawResult.textContent = "";
  }

  function drawPathOnCtx(pathStr, ctx) {
    const cmds = pathStr.match(/[A-Za-z][^A-Za-z]*/g) || [];
    ctx.beginPath();
    for (const cmd of cmds) {
      const type = cmd[0].toUpperCase();
      const nums = (cmd.slice(1).match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
      if (type === "M") {
        if (nums.length >= 2) ctx.moveTo(nums[0], nums[1]);
      } else if (type === "L") {
        for (let i = 0; i + 1 < nums.length; i += 2)
          ctx.lineTo(nums[i], nums[i + 1]);
      } else if (type === "C") {
        for (let i = 0; i + 5 < nums.length; i += 6)
          ctx.bezierCurveTo(
            nums[i],
            nums[i + 1],
            nums[i + 2],
            nums[i + 3],
            nums[i + 4],
            nums[i + 5]
          );
      }
    }
    ctx.stroke();
  }

  function buildDrawCanvasesFor(kanaText, kObj, showRef) {
    const container = document.getElementById("drawCanvases");
    container.innerHTML = "";
    const chars = [...kanaText];
    const refs =
      kObj.strokes && kObj.strokes.length === chars.length
        ? kObj.strokes
        : null;

    const instances = [];

    chars.forEach((ch, idx) => {
      const wrap = document.createElement("div");
      wrap.className = "draw-canvas-wrap";
      const overlay = document.createElement("div");
      overlay.className = "draw-canvas-overlay";

      const ref = document.createElement("canvas");
      ref.width = 256;
      ref.height = 256;
      ref.className = "ref-canvas";
      const rctx = ref.getContext("2d");
      rctx.fillStyle = "#fff";
      rctx.fillRect(0, 0, ref.width, ref.height);

      if (refs && refs[idx]) {
        rctx.strokeStyle = "#000";
        rctx.lineWidth = 8;
        rctx.lineCap = "round";
        rctx.lineJoin = "round";
        drawPathOnCtx(refs[idx], rctx);
      } else {
        rctx.fillStyle = "#000";
        rctx.textAlign = "center";
        rctx.textBaseline = "middle";
        const fsize = Math.floor(ref.width * 0.7);
        rctx.font = fsize + "px serif";
        rctx.fillText(ch, ref.width / 2, ref.height / 2 + 6);
      }

      try {
        if (showRef && !showRef.checked) {
          ref.style.display = "none";
        } else {
          ref.style.display = "block";
        }
      } catch (e) {}

      const cvs = document.createElement("canvas");
      cvs.width = 256;
      cvs.height = 256;
      cvs.className = "user-canvas";

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "6px";

      const clearBtnLocal = document.createElement("button");
      clearBtnLocal.textContent = "Clear";
      const resultSpan = document.createElement("div");
      resultSpan.className = "draw-result-span";

      const inst = window.KanaDraw.create(cvs);
      cvs._instance = inst;

      clearBtnLocal.addEventListener("click", () => {
        inst.clear();
        resultSpan.textContent = "";
      });

      controls.appendChild(clearBtnLocal);
      controls.appendChild(resultSpan);

      overlay.appendChild(ref);
      overlay.appendChild(cvs);
      wrap.appendChild(overlay);
      wrap.appendChild(controls);
      container.appendChild(wrap);

      instances.push({ inst, ref, idx, resultSpan });
    });

    currentDrawInstances = instances;
    return instances;
  }

  function renderKana(k, modeSelect, elements, showRef) {
    const mode = modeSelect ? modeSelect.value : "romaji";
    const { kanaDisplay } = elements;
    kanaDisplay.innerHTML = "";
    const kanaText = k.kana || k.romaji || "—";
    const romajiText = k.romaji || "";

    if (mode !== "draw" && mode !== "romaji2kana") {
      if (kanaText.length <= 1) {
        const span = document.createElement("div");
        span.className = "kana-cell";
        span.style.fontSize = mode === "draw" ? "48px" : "96px";
        span.textContent = kanaText;
        const wrapper = document.createElement("div");
        wrapper.className = "kana-cells";
        wrapper.appendChild(span);
        kanaDisplay.appendChild(wrapper);
      } else {
        const wrapper = document.createElement("div");
        wrapper.className = "kana-cells";
        for (const ch of [...kanaText]) {
          const cell = document.createElement("div");
          cell.className = "kana-cell";
          cell.textContent = ch;
          wrapper.appendChild(cell);
        }
        kanaDisplay.appendChild(wrapper);
      }
    } else if (mode === "romaji2kana") {
      if (romajiText.length <= 1) {
        const span = document.createElement("div");
        span.className = "kana-cell";
        span.style.fontSize = "96px";
        span.textContent = romajiText;
        const wrapper = document.createElement("div");
        wrapper.className = "kana-cells";
        wrapper.appendChild(span);
        kanaDisplay.appendChild(wrapper);
      } else {
        const wrapper = document.createElement("div");
        wrapper.className = "kana-cells";
        for (const ch of [...romajiText]) {
          const cell = document.createElement("div");
          cell.className = "kana-cell";
          cell.textContent = ch;
          wrapper.appendChild(cell);
        }
        kanaDisplay.appendChild(wrapper);
      }
    } else {
      kanaDisplay.innerHTML = "";
      if (romajiText) {
        const ann = document.createElement("div");
        ann.className = "kana-annotation";
        ann.textContent = romajiText;
        kanaDisplay.appendChild(ann);
      }

      if (showRef && elements.drawArea) {
        if (!showRef.checked) elements.drawArea.classList.add("refs-hidden");
        else elements.drawArea.classList.remove("refs-hidden");
      }
      buildDrawCanvasesFor(kanaText, k, showRef);
    }
  }

  function getCurrentDrawInstances() {
    return currentDrawInstances;
  }

  function clearCurrentDrawInstances() {
    currentDrawInstances = [];
  }

  window.Rendering = {
    pickRandom,
    showFor,
    renderKana,
    getCurrentDrawInstances,
    clearCurrentDrawInstances,
  };
})(window);
