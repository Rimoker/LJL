// Similarity computation module: image comparison algorithms for drawing mode
(function (window) {
  function imageDataToCanvas(imgData) {
    const c = document.createElement("canvas");
    c.width = imgData.width;
    c.height = imgData.height;
    c.getContext("2d").putImageData(imgData, 0, 0);
    return c;
  }

  function getBinaryMask(imgData, thresh = 60) {
    const w = imgData.width,
      h = imgData.height;
    const data = imgData.data;
    const mask = new Uint8Array(w * h);
    let any = false;
    for (let y = 0, i = 0; y < h; y++) {
      for (let x = 0; x < w; x++, i++) {
        const idx = i << 2;
        const lum = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        const on = 255 - lum > thresh;
        mask[i] = on ? 1 : 0;
        if (on) any = true;
      }
    }
    return { mask, w, h, any };
  }

  function getBBoxFromMask(maskObj) {
    const { mask, w, h, any } = maskObj;
    if (!any) return null;
    let minX = w,
      minY = h,
      maxX = 0,
      maxY = 0;
    let found = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (mask[y * w + x]) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (!found) return null;
    return {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    };
  }

  function renderCroppedToSize(srcImgData, bbox, size) {
    const srcCanvas = imageDataToCanvas(srcImgData);
    const target = document.createElement("canvas");
    target.width = size;
    target.height = size;
    const tctx = target.getContext("2d");
    tctx.fillStyle = "#fff";
    tctx.fillRect(0, 0, size, size);
    if (!bbox) {
      return tctx.getImageData(0, 0, size, size);
    }
    const margin = 0.08;
    const availW = size * (1 - 2 * margin),
      availH = size * (1 - 2 * margin);
    const scale = Math.min(availW / bbox.width, availH / bbox.height);
    const drawW = bbox.width * scale,
      drawH = bbox.height * scale;
    const dx = (size - drawW) / 2;
    const dy = (size - drawH) / 2;
    tctx.drawImage(
      srcCanvas,
      bbox.x,
      bbox.y,
      bbox.width,
      bbox.height,
      dx,
      dy,
      drawW,
      drawH
    );
    return tctx.getImageData(0, 0, size, size);
  }

  function imageDataToFloatArray(imgData) {
    const w = imgData.width,
      h = imgData.height;
    const data = imgData.data;
    const out = new Float32Array(w * h);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
      out[j] = (255 - lum) / 255;
    }
    return { arr: out, w: imgData.width, h: imgData.height };
  }

  function computeIoUFromFloat(a, b) {
    const n = a.length;
    let aCount = 0,
      bCount = 0,
      inter = 0;
    for (let i = 0; i < n; i++) {
      const aOn = a[i] > 0.2;
      const bOn = b[i] > 0.2;
      if (aOn) aCount++;
      if (bOn) bCount++;
      if (aOn && bOn) inter++;
    }
    if (aCount + bCount - inter === 0) return 0;
    return inter / (aCount + bCount - inter);
  }

  function computeCorrelation(a, b) {
    let sa = 0,
      sb = 0,
      prod = 0;
    const n = a.length;
    for (let i = 0; i < n; i++) {
      prod += a[i] * b[i];
      sa += a[i] * a[i];
      sb += b[i] * b[i];
    }
    if (sa === 0 || sb === 0) return 0;
    return prod / (Math.sqrt(sa) * Math.sqrt(sb));
  }

  function computeSimilarityFromImageData(userImgData, refImgData) {
    const N = 64;
    const userMask = getBinaryMask(userImgData, 40);
    const refMask = getBinaryMask(refImgData, 40);
    const userBbox = getBBoxFromMask(userMask);
    const refBbox = getBBoxFromMask(refMask);
    const userNorm = renderCroppedToSize(userImgData, userBbox, N);
    const refNorm = renderCroppedToSize(refImgData, refBbox, N);
    const userF = imageDataToFloatArray(userNorm).arr;
    const refF = imageDataToFloatArray(refNorm).arr;
    const iou = computeIoUFromFloat(userF, refF);
    const corr = computeCorrelation(userF, refF);
    const score = 0.55 * iou + 0.45 * corr;
    return { score, iou, corr };
  }

  function getRefImageDataFor(k, size) {
    const tmp = document.createElement("canvas");
    tmp.width = size;
    tmp.height = size;
    const tctx = tmp.getContext("2d");
    tctx.fillStyle = "#fff";
    tctx.fillRect(0, 0, size, size);
    tctx.fillStyle = "#000";
    tctx.font = size * 0.9 + "px serif";
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    tctx.fillText(k.kana, size / 2, size / 2 + 6);
    return tctx.getImageData(0, 0, size, size);
  }

  window.Similarity = {
    computeSimilarityFromImageData,
    getRefImageDataFor,
  };
})(window);
