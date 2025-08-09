# 🟡 StickyFruity 

[![Live Demo](https://img.shields.io/badge/Demo-FF5722?style=for-the-badge)](https://balandinam.github.io/StickyFruity/)
[![GitHub](https://img.shields.io/badge/Code-181717?style=for-the-badge&logo=github)](https://github.com/BalandinaM/StickyFruity)

Интерактивное приложение для работы со стикерами в браузере с полным сохранением состояния.

## ✨ Основные функции
- 🖱️ Drag-and-drop перемещение
- ✏️ Редактирование текста
- 🗑️ Удаление стикеров
- 📌 Запоминание позиций
- 🎨 Все изменения сохраняются в локальное хранилище

## 🛠 Технологический стек
- **React 19** + Vite
- **React DnD** для перетаскивания
- **LocalForage** для хранения
- **Nanoid** для генерации ID
- **Sass** для стилей
- **Деплой** GitHub Pages
- **ReactTooltip** для тултипов

## 🚀 Запуск
1. Установите зависимости:

```npm install```

2. Запустите dev-сервер:

```npm run dev```

### Для production-сборки:

```npm run build```


## 📸 Скриншоты

| Описание | Скриншот |
|----------|----------|
| **Начало работы** | ![Начало работы](./assets/screenshots_for_readme/empty_sticker_board.png) |
| **Создание нового стикера** | ![Создание нового стикера](./assets/screenshots_for_readme/create_new_sticker.png) |
| **Доска со стикерами** | ![Доска со стикерами](./assets/screenshots_for_readme/sticker_board.png) |
| **Редактирование стикера** | ![Редактирование стикера](./assets/screenshots_for_readme/editing_sticker.png) |


## 📌 Планы по развитию

- Замена системных алертов на стильные всплывающие уведомления для всех ключевых действий пользователя.
- Добавить авторизацию и синхронизацию между устройствами
- Адаптация интерфейса под смартфоны и планшеты
