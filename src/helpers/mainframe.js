// mainframe.js
// Small helper to determine the "home" directory (location of index.html)
// and produce paths relative to it. This works both when served over http(s)
// and when opened via file:// in the browser.
(function (window) {
  const exports = {};

  function getHomeDir() {
    try {
      const href = window.location.href; // e.g. file:///C:/path/to/index.html or http://.../index.html
      const u = new URL(href);
      // pathname for file:// on Windows is like /C:/Users/..../index.html
      let p = decodeURIComponent(u.pathname || "");
      // If it starts with a leading slash and then a drive letter, remove the leading slash
      if (/^\/[A-Za-z]:/.test(p)) p = p.slice(1);
      // Remove trailing filename (last segment)
      const idx = p.lastIndexOf("/");
      if (idx >= 0) p = p.slice(0, idx);
      // For file: scheme return file:// + path on windows to keep it absolute
      if (u.protocol === "file:") {
        // Ensure proper file URL on Windows
        const fileUrl = "file://" + (p.startsWith("/") ? p : "/" + p);
        // normalize backslashes to forward slashes for consistency
        return fileUrl.replace(/\\/g, "/");
      }
      return p;
    } catch (e) {
      return ".";
    }
  }

  function getPath(relPath) {
    if (!relPath) return getHomeDir();
    const home = getHomeDir();
    // If home is a file:// URL, join with relPath by ensuring a trailing slash
    if (home.startsWith("file://")) {
      return home.replace(/\/$/, "") + "/" + relPath.replace(/^\//, "");
    }
    return home.replace(/\/$/, "") + "/" + relPath.replace(/^\//, "");
  }

  exports.getHomeDir = getHomeDir;
  exports.getPath = getPath;
  window.MAINFRAME = exports;
})(window);
