## 🌐 Live Demo

[https://qualifying-project.vercel.app](https://qualifying-project.vercel.app)

# 🧠 Qualifying FlashCards App

A flashcard-based learning application built with **React** (frontend) and **FastAPI** (backend).

## 🚀 Features

- Manage cards, tags, and groups  
- Local storage mode (`isLocalStorage = true`)  
  → Data is stored in `localStorage`
- Server mode (`isLocalStorage = false`)  
  → Data is loaded and saved via API
- Support for mock data when offline
- Flip all cards with a single click

## ⚙️ Tech Stack

- **Frontend**: React, TypeScript, Context API  
- **Backend**: FastAPI, Axios

## 📁 Structure

- `types.ts` — defines models: `Card`, `Tag`, `Group`
- `mock.ts` — initial data
- `AppContext.tsx` — global app state

