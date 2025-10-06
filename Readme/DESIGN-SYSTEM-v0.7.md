# LJL v0.7 Alpha - Design System Update

## 🎨 Обзор версии 0.7

Версия 0.7 представляет собой **крупное обновление дизайна и визуального оформления** приложения Learn Japanese Language. Новый дизайн выполнен в минималистичном Apple-стиле с поддержкой светлой и тёмной тем, расширенной кастомизацией и красивыми анимациями.

---

## ✨ Новые функции

### 1. **Система тем (Theme System)**

- 🌞 **Светлая тема** (по умолчанию)
- 🌙 **Тёмная тема**
- Автоматическое переключение через панель настроек
- Сохранение выбранной темы в localStorage

### 2. **Панель настроек (Settings Panel)**

Доступна через кнопку ⚙️ в правом верхнем углу:

#### Внешний вид (Appearance)

- **Тема** - выбор между светлой и тёмной
- **Размер шрифта** - от 12px до 24px
- **Скругление углов** - от 0px до 24px
- **Размер карточек** - от 128px до 512px

#### Цвета (Colors)

- **Основной цвет** - настраиваемый цвет акцентов (по умолчанию #007AFF)

#### Анимации (Animations)

- **Включить/выключить анимации** - для пользователей с предпочтением сниженной анимации

### 3. **Новый дизайн в стиле Apple**

- Минималистичный чёрно-белый дизайн
- Плавные скругления (12px по умолчанию)
- Мягкие тени и переходы
- SF Pro Display/SF Pro Text шрифты (системные)
- Backdrop blur эффекты для модальных окон

### 4. **Анимации**

- **fadeIn** - плавное появление элементов
- **slideUp** - появление снизу вверх
- **scaleIn** - масштабирование при появлении
- **shake** - встряхивание при ошибке
- Hover эффекты на всех интерактивных элементах
- Плавные переходы при изменении темы

### 5. **Адаптивный дизайн**

- Полная поддержка мобильных устройств
- Гибкая сетка для разных размеров экранов
- Оптимизация для планшетов

---

## 🎯 CSS Architecture

### CSS Variables (Custom Properties)

```css
/* Theme colors */
--bg-primary       /* Основной фон */
--bg-secondary     /* Вторичный фон */
--bg-tertiary      /* Третичный фон */
--text-primary     /* Основной текст */
--text-secondary   /* Вторичный текст */
--text-tertiary    /* Третичный текст */
--border-color     /* Цвет границ */
--shadow           /* Тени */

/* Customizable */
--primary-color    /* Акцентный цвет */
--font-size-base   /* Базовый размер шрифта */
--card-size        /* Размер карточек */
--border-radius    /* Скругление углов */
--animation-duration /* Длительность анимаций */
```

### Theme Switching

Темы переключаются через атрибут `data-theme` на `<html>`:

```html
<html data-theme="light">
  <!-- Светлая тема -->
  <html data-theme="dark">
    <!-- Тёмная тема -->
  </html>
</html>
```

---

## 📦 Новые модули

### 1. `src/logic/themeManager.js`

**Назначение:** Управление темами и настройками приложения

**Основные функции:**

- `init()` - инициализация при загрузке
- `loadSettings()` - загрузка из localStorage
- `saveSettings(settings)` - сохранение настроек
- `applySettings(settings)` - применение CSS переменных
- `toggleTheme()` - переключение между темами
- `resetSettings()` - сброс к дефолтным значениям

**Дефолтные настройки:**

```javascript
{
  theme: 'light',
  fontSize: 16,
  cardSize: 256,
  borderRadius: 12,
  animationsEnabled: true,
  primaryColor: '#007AFF',
}
```

### 2. `src/ui/settingsModal.js`

**Назначение:** UI панели настроек

**Основные функции:**

- `init()` - создание модального окна
- `openModal()` - открытие панели
- `closeModal()` - закрытие панели
- `loadCurrentSettings()` - загрузка текущих значений
- `saveSettings()` - сохранение изменений

**Элементы формы:**

- Select для выбора темы
- Range sliders для размеров
- Color picker для цветов
- Checkbox для анимаций

---

## 🎨 Design System Colors

### Light Theme

- **Background Primary:** `#FFFFFF` (белый)
- **Background Secondary:** `#F2F2F7` (светло-серый)
- **Text Primary:** `#000000` (чёрный)
- **Text Secondary:** `#3C3C43` (тёмно-серый)
- **Border:** `#D1D1D6` (серый)
- **Primary Color:** `#007AFF` (синий Apple)

### Dark Theme

- **Background Primary:** `#000000` (чёрный)
- **Background Secondary:** `#1C1C1E` (тёмно-серый)
- **Background Tertiary:** `#2C2C2E` (средне-серый)
- **Text Primary:** `#FFFFFF` (белый)
- **Text Secondary:** `#EBEBF5` (светло-серый)
- **Border:** `#38383A` (тёмный)

---

## 🚀 Использование

### Открытие панели настроек

```javascript
window.SettingsModal.openModal();
```

### Программное изменение темы

```javascript
window.ThemeManager.toggleTheme(); // Переключить
window.ThemeManager.saveSettings({ theme: "dark" }); // Установить тёмную
```

### Применение кастомных настроек

```javascript
window.ThemeManager.saveSettings({
  fontSize: 18,
  borderRadius: 16,
  primaryColor: "#FF2D55",
  animationsEnabled: true,
});
```

### Сброс к дефолтным

```javascript
window.ThemeManager.resetSettings();
```

---

## 📱 Responsive Breakpoints

- **Desktop:** > 768px
- **Tablet/Mobile:** ≤ 768px

### Адаптация на мобильных

- Вертикальная ориентация controls
- Уменьшенные размеры карточек (80% от оригинала)
- Полноэкранные модальные окна (95vw)
- Упрощённый header

---

## ♿ Accessibility

- Все интерактивные элементы имеют focus states
- Поддержка клавиатурной навигации
- ARIA-совместимые модальные окна
- Контрастные цвета по WCAG 2.1
- Возможность отключения анимаций

---

## 🎭 Animations Reference

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Scale In

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Shake (Error)

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}
```

---

## 🔧 Технические детали

### Storage

- Все настройки сохраняются в `localStorage` под ключом `ljl_settings`
- Автоматическая загрузка при старте приложения
- Fallback к дефолтным значениям при ошибках

### Performance

- CSS переменные обновляются только при сохранении
- Анимации используют `transform` и `opacity` (GPU-accelerated)
- Минимальное количество reflows

### Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Backdrop blur требует поддержки `-webkit-backdrop-filter`

---

## 📋 TODO для будущих версий

- [ ] Сохранение пресетов тем
- [ ] Автоматическое переключение темы по времени суток
- [ ] Больше цветовых схем (синяя, зелёная, фиолетовая)
- [ ] Анимации при переходах между вопросами
- [ ] Кастомизация цветов для правильных/неправильных ответов
- [ ] Экспорт/импорт настроек

---

## 🐛 Known Issues

- Backdrop blur может не работать в старых версиях Firefox
- Range sliders имеют разный вид в разных браузерах
- Color picker ограничен системным UI

---

## 📝 Changelog

### v0.7 alpha (2025-10-04)

- ✨ Добавлена система тем (светлая/тёмная)
- ✨ Создана панель настроек с кастомизацией
- 🎨 Полностью переработан дизайн в Apple-стиле
- 🎭 Добавлены красивые анимации
- 📱 Улучшена адаптивность
- ♿ Добавлена поддержка accessibility
- 🚀 CSS переменные для всех параметров
- 💾 LocalStorage для сохранения настроек

---

**Автор:** LJL Team  
**Дата:** 2025-10-04  
**Версия:** 0.7 alpha
