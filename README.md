# 🧠 Qualifying FlashCards App

Приложение для обучения с помощью флеш-карт. Построено на **React** (frontend) и **FastAPI** (backend).

## 🚀 Возможности

- Управление карточками, тегами и группами
- Режим локального хранилища (`isLocalStorage = true`)  
  → данные сохраняются в `localStorage`
- Режим сервера (`isLocalStorage = false`)  
  → данные загружаются и сохраняются через API
- Поддержка мок-данных при отсутствии соединения
- Переворот всех карточек одним кликом

## ⚙️ Стек технологий

- **Frontend**: React, TypeScript, Context API  
- **Backend**: FastAPI, Axios

## 📁 Структура

- `types.ts` — описание моделей: `Card`, `Tag`, `Group`
- `mock.ts` — начальные данные
- `AppContext.tsx` — глобальное состояние приложения
