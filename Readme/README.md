# 🇯🇵 Learn Japanese Language (LJL)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.8-green.svg)](https://github.com)

**Interactive web application for learning Japanese Hiragana and Katakana alphabets**

[🚀 **Live Demo**](#) | [📖 Documentation](#features) | [🐛 Report Bug](../../issues)

---

## ✨ Features

### 🎯 Learning Modes

- **Romaji (Type)** - Type the romaji reading of displayed kana
- **Draw Mode** - Practice writing kana with handwriting recognition
- **Romaji to Kana** - Convert romaji input to correct kana

### 🎨 Customization

- **Themes** - Light/Dark/Auto mode with custom colors
- **Font Size** - Adjustable text size (12-24px)
- **Annotation Size** - Large romaji hints (20-60px)
- **Draw Field Size** - Customize canvas size (128-512px)
- **Card Size** - Adjust kana display cards (40-200px)
- **Border Radius** - Control UI roundness (0-24px)
- **Animations** - Toggle smooth transitions

### 🤖 AI Recognition

- **Google Handwriting API** - Real-time kana recognition while drawing
- **Offline Mode** - Works without AI when disabled

### 📊 Progress Tracking

- **Statistics** - Track correct/incorrect answers
- **Session Persistence** - Stats saved across sessions
- **Reset Anytime** - Clear stats with one click

### 🌐 Accessibility

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Touch Support** - Full touch drawing on mobile devices
- **Keyboard Shortcuts** - Quick navigation
- **High Contrast** - Accessible color schemes

---

## 🚀 Quick Start

### Online (Recommended)

Simply visit the [**Live Demo**](#) and start learning!

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/LJL.git
cd LJL

# Option 1: Python server
python -m http.server 8000

# Option 2: Node.js server
node tools/server.js

# Option 3: Open directly
# Open index.html in your browser (some features may be limited)
```

Visit `http://localhost:8000` in your browser.

---

## 📱 Compatibility

| Platform    | Browser                  | Status             |
| ----------- | ------------------------ | ------------------ |
| **Windows** | Chrome, Edge, Firefox    | ✅ Fully Supported |
| **macOS**   | Safari, Chrome, Firefox  | ✅ Fully Supported |
| **Android** | Chrome, Firefox, Samsung | ✅ Fully Supported |
| **iOS**     | Safari, Chrome           | ✅ Fully Supported |
| **Linux**   | Chrome, Firefox          | ✅ Fully Supported |

**Requirements:**

- Modern browser with ES6 support
- JavaScript enabled
- Internet connection (only for Google AI recognition)

---

## 🎮 How to Use

### 1️⃣ Select Alphabet

Choose between **Hiragana** (ひらがな) or **Katakana** (カタカナ)

### 2️⃣ Choose Learning Mode

- **Romaji (Type)** - Best for beginners
- **Draw** - Best for memorizing stroke order
- **Romaji to Kana** - Best for advanced learners

### 3️⃣ Start Learning!

- Read the displayed kana
- Type or draw your answer
- Get instant feedback
- Track your progress

### 4️⃣ Customize

- Click ⚙️ Settings icon
- Adjust sizes, colors, and features
- Settings auto-save

---

## 🏗️ Project Structure

```
LJL/
├── index.html              # Main HTML file
├── styles.css              # Global styles with CSS variables
├── app.js                  # Application initialization
├── mainframe.js            # Core state management
├── draw.js                 # Canvas drawing logic
├── data/
│   └── kana.json          # Hiragana & Katakana data
├── src/
│   ├── logic/
│   │   ├── recognition.js  # Handwriting recognition
│   │   ├── stats.js        # Statistics tracking
│   │   └── themeManager.js # Theme & settings management
│   ├── ui/
│   │   ├── events.js       # Event handlers
│   │   ├── rendering.js    # UI rendering logic
│   │   ├── settingsModal.js# Settings panel
│   │   └── statsModal.js   # Statistics panel
│   └── styles/
│       └── styles.css      # (imported to root)
└── tools/
    └── server.js           # Local development server
```

---

## 🛠️ Technology Stack

- **Pure JavaScript** (ES6+) - No frameworks
- **CSS3** - Modern styling with custom properties
- **HTML5 Canvas** - Drawing functionality
- **Google Handwriting API** - AI recognition
- **LocalStorage** - Settings & stats persistence

---

## 📝 Version History

### v0.8 (Current) - October 2025

- ➕ Split card size controls (Draw Field + Card Size)
- ➕ Enhanced annotation font size (20-60px range)
- ➕ Auto-refresh on alphabet/mode change
- ✨ Improved UX - no need to click Next after switching modes

### v0.7 - October 2025

- ➕ Annotation font size customization
- 🗑️ Removed rarely-used UI controls
- ✅ Google AI recognition enabled by default
- 🐛 Fixed kana-cell responsive sizing

### Earlier Versions

- ✅ Core learning modes
- ✅ Theme system
- ✅ Statistics tracking
- ✅ Mobile support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use ES6+ features
- Comment complex logic
- Follow existing naming conventions
- Test on multiple browsers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**What this means:**

- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ Must include copyright notice
- ❌ No warranty provided

---

## 🙏 Acknowledgments

- **Hiragana & Katakana data** - Structured JSON format
- **Google Handwriting API** - AI-powered recognition
- **Modern Web Standards** - Canvas, LocalStorage, CSS Variables

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Website**: [Live Demo](#)

---

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐ star on GitHub!

---

<div align="center">

**Made with ❤️ for Japanese language learners**

[⬆ Back to Top](#-learn-japanese-language-ljl)

</div>
