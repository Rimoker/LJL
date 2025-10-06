# 🎨 LJL v0.7 - Visual Design Guide

## 🖼️ Design Philosophy

LJL v0.7 следует **Apple Human Interface Guidelines** с акцентом на:

1. **Ясность** — контент превыше всего
2. **Уважение** — интерфейс помогает, не отвлекает
3. **Глубина** — визуальные слои создают иерархию

---

## 🎨 Color System

### Light Theme (Default)

```
┌─────────────────────────────────────┐
│  Background Hierarchy               │
├─────────────────────────────────────┤
│  Primary:   #FFFFFF (белый)         │
│  Secondary: #F2F2F7 (светло-серый)  │
│  Tertiary:  #FFFFFF (белый)         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Text Hierarchy                     │
├─────────────────────────────────────┤
│  Primary:   #000000 (чёрный)        │
│  Secondary: #3C3C43 (тёмно-серый)   │
│  Tertiary:  #3C3C4399 (60% opacity) │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  UI Elements                        │
├─────────────────────────────────────┤
│  Border:  #D1D1D6 (серый)           │
│  Primary: #007AFF (синий)           │
│  Shadow:  rgba(0,0,0,0.08)          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Semantic Colors                    │
├─────────────────────────────────────┤
│  Success: #34C759 (зелёный)         │
│  Error:   #FF3B30 (красный)         │
└─────────────────────────────────────┘
```

### Dark Theme

```
┌─────────────────────────────────────┐
│  Background Hierarchy               │
├─────────────────────────────────────┤
│  Primary:   #000000 (чёрный)        │
│  Secondary: #1C1C1E (тёмный)        │
│  Tertiary:  #2C2C2E (средний)       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Text Hierarchy                     │
├─────────────────────────────────────┤
│  Primary:   #FFFFFF (белый)         │
│  Secondary: #EBEBF5 (светлый)       │
│  Tertiary:  #EBEBF599 (60% opacity) │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  UI Elements                        │
├─────────────────────────────────────┤
│  Border:  #38383A (тёмный)          │
│  Primary: #007AFF (синий)           │
│  Shadow:  rgba(0,0,0,0.4)           │
└─────────────────────────────────────┘
```

---

## 📐 Spacing System

```
┌──────────────────────┬──────┐
│  Name                │  px  │
├──────────────────────┼──────┤
│  Tiny                │  4   │
│  Small               │  8   │
│  Medium              │  12  │
│  Large               │  16  │
│  XLarge              │  24  │
│  XXLarge             │  32  │
└──────────────────────┴──────┘
```

**Использование:**

- Tiny: padding внутри мелких элементов
- Small: gap между элементами
- Medium: margin между секциями
- Large: padding в контейнерах
- XLarge: отступы между крупными блоками
- XXLarge: margin основного контейнера

---

## 🔤 Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Type Scale

```
┌──────────────┬──────────┬─────────┬──────────────┐
│  Element     │  Size    │  Weight │  Line Height │
├──────────────┼──────────┼─────────┼──────────────┤
│  h1          │  36px    │  700    │  1.2         │
│  h2          │  24px    │  600    │  1.3         │
│  h3          │  18px    │  600    │  1.4         │
│  body        │  16px    │  400    │  1.5         │
│  small       │  14px    │  400    │  1.5         │
│  tiny        │  12px    │  400    │  1.4         │
│  kana-large  │  96px    │  300    │  1.0         │
│  kana-medium │  64px    │  400    │  1.0         │
└──────────────┴──────────┴─────────┴──────────────┘
```

### Font Weights

- **300** - Light (для больших заголовков)
- **400** - Regular (основной текст)
- **500** - Medium (labels)
- **600** - Semibold (h2, h3)
- **700** - Bold (h1)

---

## 🔲 Border Radius Scale

```
┌──────────────┬──────┬────────────────────┐
│  Element     │  px  │  Formula           │
├──────────────┼──────┼────────────────────┤
│  Small       │  6   │  radius * 0.5      │
│  Medium      │  9   │  radius * 0.75     │
│  Default     │  12  │  radius            │
│  Large       │  16  │  radius * 1.33     │
│  XLarge      │  24  │  radius * 2        │
│  Circle      │  50% │  border-radius: 50%│
└──────────────┴──────┴────────────────────┘
```

**Использование:**

- Small: input fields, checkboxes
- Medium: buttons, selects
- Default: cards, containers
- Large: modals
- XLarge: главный container
- Circle: close buttons, icons

---

## 🎭 Animation Timings

```
┌──────────────────┬──────────┬───────────────┐
│  Type            │  Duration│  Easing       │
├──────────────────┼──────────┼───────────────┤
│  Micro           │  0.1s    │  ease-out     │
│  Fast            │  0.2s    │  ease-in-out  │
│  Default         │  0.3s    │  ease         │
│  Slow            │  0.5s    │  ease-in-out  │
└──────────────────┴──────────┴───────────────┘
```

**Когда использовать:**

- **Micro** - hover на мелких элементах
- **Fast** - открытие tooltips
- **Default** - большинство transitions
- **Slow** - модальные окна, drawer'ы

---

## 📦 Component Anatomy

### Button

```
┌───────────────────────────────────┐
│         ╔═══════════════╗         │ ← Shadow (0 2px 8px)
│         ║   Button Text ║         │ ← Border radius (9px)
│         ╚═══════════════╝         │ ← Padding (10px 20px)
│                                   │ ← Font: 14px, weight 600
│  States:                          │
│  • Default: bg primary-color      │
│  • Hover: translateY(-2px)        │
│  • Active: translateY(0)          │
│  • Disabled: opacity 0.5          │
└───────────────────────────────────┘
```

### Card

```
┌─────────────────────────────────────┐
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │ ← Border (2px)
│  ┃                             ┃  │ ← Border radius (12px)
│  ┃        Card Content         ┃  │ ← Background (tertiary)
│  ┃                             ┃  │ ← Padding (12px)
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │ ← Shadow (0 8px 24px)
│                                     │
│  States:                            │
│  • Default: border-color border    │
│  • Hover: border primary-color     │
│          translateY(-4px)          │
│          shadow stronger           │
└─────────────────────────────────────┘
```

### Modal

```
┌─────────────────────────────────────────┐
│  ╔════════════════════════════════════╗ │
│  ║  ┌──────────────────────────┐  [×]║ │ ← Close button
│  ║  │  Modal Title             │     ║ │ ← Padding top (32px)
│  ║  └──────────────────────────┘     ║ │
│  ║                                    ║ │
│  ║  Content area                      ║ │ ← Scrollable
│  ║  ...                               ║ │
│  ║                                    ║ │
│  ║  ┌────────────┐  ┌────────────┐   ║ │
│  ║  │  Cancel    │  │   Save     │   ║ │ ← Actions
│  ║  └────────────┘  └────────────┘   ║ │
│  ╚════════════════════════════════════╝ │
│                                         │
│  • Backdrop: rgba(0,0,0,0.5)           │
│  • Backdrop blur: 10px                 │
│  • Border radius: 24px                 │
│  • Max-width: 90vw                     │
│  • Max-height: 85vh                    │
└─────────────────────────────────────────┘
```

---

## 🎨 Theme Switching Example

```
Light Theme                Dark Theme
┌──────────────┐          ┌──────────────┐
│  ╔════════╗  │          │  ╔════════╗  │
│  ║ #FFF   ║  │   →      │  ║ #000   ║  │
│  ║        ║  │  Toggle  │  ║        ║  │
│  ║ #000   ║  │          │  ║ #FFF   ║  │
│  ╚════════╝  │          │  ╚════════╝  │
└──────────────┘          └──────────────┘

Transition: 0.3s ease
Properties: background, color, border-color
```

---

## 🎯 Focus States

```
Default                   Focused
┌──────────────┐         ┌──────────────┐
│   Button     │    →    │   Button     │
└──────────────┘         └──────────────┘
                         ╰──────────────╯
                         ╰══════════════╯
                         2px outline primary
                         2px offset
```

---

## 📐 Grid System

### Desktop (> 768px)

```
┌─────────────────────────────────────────┐
│  Container (max-width: 900px)           │
│  ┌───────────────────────────────────┐  │
│  │  Controls (flex-direction: row)   │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Content                          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Mobile (≤ 768px)

```
┌─────────────────────┐
│  Container (95vw)   │
│  ┌───────────────┐  │
│  │  Controls     │  │
│  │  (vertical)   │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  Content      │  │
│  │  (scaled)     │  │
│  └───────────────┘  │
└─────────────────────┘
```

---

## ✨ Interaction Patterns

### Hover

```
Default → Hover (0.3s ease)
  transform: none → translateY(-2px)
  box-shadow: small → larger
```

### Click

```
Default → Active (instant)
  transform: translateY(-2px) → translateY(0)
  box-shadow: large → small
```

### Success

```
State Change (0.3s ease)
  • Green background fade in
  • Check icon scale in
  • Text fade in
```

### Error

```
State Change (0.5s)
  • Shake animation
  • Red background fade in
  • Error icon scale in
```

---

## 🎨 Custom Color Examples

### Pink Theme

```css
--primary-color: #ff2d55;
--bg-primary: #fff;
--text-primary: #000;
```

### Green Theme

```css
--primary-color: #34c759;
--bg-primary: #fff;
--text-primary: #000;
```

### Purple Theme

```css
--primary-color: #af52de;
--bg-primary: #000;
--text-primary: #fff;
```

---

## 📱 Responsive Scaling

```
Desktop (> 768px)        Mobile (≤ 768px)
──────────────────       ───────────────
Font: 16px           →   Font: 16px (same)
Card: 256px          →   Card: 205px (80%)
Kana: 96px           →   Kana: 72px (75%)
Border: 12px         →   Border: 12px (same)
Spacing: 24px        →   Spacing: 16px (reduced)
```

---

## 🎭 Animation Examples

### fadeIn (used for: new content)

```
0%:   opacity: 0, translateY(-10px)
100%: opacity: 1, translateY(0)
Duration: 0.3s
```

### slideUp (used for: forms, inputs)

```
0%:   opacity: 0, translateY(20px)
100%: opacity: 1, translateY(0)
Duration: 0.3s
Delay: 0.1s (stagger)
```

### scaleIn (used for: modals, cards)

```
0%:   opacity: 0, scale(0.9)
100%: opacity: 1, scale(1)
Duration: 0.3s
```

### shake (used for: errors)

```
0%, 100%: translateX(0)
25%:      translateX(-10px)
75%:      translateX(10px)
Duration: 0.5s
```

---

## 🛠️ Developer Notes

### Adding New Components

1. **Use CSS Variables**

   ```css
   background: var(--bg-tertiary);
   color: var(--text-primary);
   ```

2. **Support Both Themes**

   ```css
   [data-theme="dark"] .my-component {
     /* dark overrides */
   }
   ```

3. **Add Animations**

   ```css
   transition: all var(--animation-duration) ease;
   ```

4. **Make it Responsive**
   ```css
   @media (max-width: 768px) {
     /* mobile styles */
   }
   ```

---

**Version:** 0.7 alpha  
**Last Updated:** 2025-10-04  
**Design System:** Apple-inspired Minimalism
