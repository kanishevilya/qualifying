FlashCards App
FlashCards App is a web application designed to help users create, manage, and study flashcards. Built with React on the frontend and FastAPI on the backend, it provides a modern and efficient way to organize flashcards into groups, tag them, and toggle between viewing modes. The application supports both server-based data storage and local storage, depending on configuration.
Features

Flashcard Management: Create, edit, and delete flashcards with front and back content.
Groups: Organize flashcards into groups for better categorization.
Tags: Assign tags to flashcards for easy filtering and searching.
Flip All Cards: Toggle between showing the front or back of all flashcards simultaneously.
Data Persistence: Choose between saving data to a FastAPI backend or using browser's localStorage via a global isLocalStorage flag.
Mock Data: Fallback to mock data if no data is available from the server or local storage.
Responsive UI: Built with React for a dynamic and user-friendly interface.

Tech Stack

Frontend: React, TypeScript, Axios
Backend: FastAPI (Python)
Data Storage: Server-side (via FastAPI) or browser localStorage
Context API: For state management in React
Styling: (Assumed to use CSS or a library like Tailwind CSS, please specify if used)

Project Structure
flashcards-app/
├── frontend/
│   ├── src/
│   │   ├── data/
│   │   │   └── mock.ts          # Mock data for cards, groups, and tags
│   │   ├── AppProvider.tsx      # Context provider for global state
│   │   ├── components/          # React components (e.g., Card, Group, Tag)
│   │   ├── types.ts            # TypeScript interfaces for Card, Group, Tag
│   │   └── ...                 # Other frontend files
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── endpoints/              # API routes for cards, groups, tags
│   └── ...                     # Other backend files
├── README.md                   # Project documentation
└── package.json                # Frontend dependencies

Logic Overview
The application uses a React Context API (AppProvider) to manage global state, including:

cards: List of flashcards with front and back content.
groups: Categories to organize flashcards.
tags: Labels for filtering flashcards.
flipAllCards: Boolean to toggle front/back view for all cards.

Data Handling

Initialization: On app startup, data is loaded either from the FastAPI backend (http://localhost:8000) or localStorage, based on the isLocalStorage flag.
Saving: Changes to cards, groups, or tags are saved to the server (via Axios POST requests) or localStorage whenever the state updates.
Fallback: If data loading fails, the app uses predefined mock data (mockCards, mockGroups, mockTags).
Server Endpoints:
GET /get_cards: Fetch all cards.
GET /get_groups: Fetch all groups.
GET /get_tags: Fetch all tags.
POST /save_cards: Save cards.
POST /save_groups: Save groups.
POST /save_tags: Save tags.



State Management

The AppProvider component manages state using React hooks (useState, useEffect, useRef).
useEffect hooks ensure data is loaded once on mount and saved whenever state changes (after initialization).
A useRef flag (isInitialized) prevents saving data before initial load.

Prerequisites

Node.js (v16 or higher)
Python (v3.8 or higher)
npm or yarn for frontend dependencies
pip for Python dependencies

Installation

Clone the Repository:
git clone https://github.com/your-username/flashcards-app.git
cd flashcards-app


Set Up the Backend:
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn
uvicorn main:app --reload

The backend will run at http://localhost:8000.

Set Up the Frontend:
cd frontend
npm install  # or yarn install
npm start    # or yarn start

The frontend will run at http://localhost:3000.

Configure Storage:

To use localStorage, set isLocalStorage = true in frontend/src/AppProvider.tsx.
To use the FastAPI backend, set isLocalStorage = false and ensure the backend is running.



Usage

Open the app in your browser (http://localhost:3000).
Create or edit flashcards, assign them to groups, and add tags.
Use the "Flip All" feature to toggle between front and back views.
Data is automatically saved to either localStorage or the FastAPI backend based on the isLocalStorage flag.

Development

Adding Features: Extend the AppProvider context to include new state or functionality.
API EnhTrigmentation: Add new endpoints in backend/endpoints/ for additional features (e.g., user authentication).
UI Improvements: Add components in frontend/src/components/ and style them as needed.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit your changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a Pull Request.

License
This project is licensed under the MIT License.
