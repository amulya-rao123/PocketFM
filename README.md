# React + Vite

# 🎧 PocketFM-like Audio Storytelling Platform (Replica)

A React-based replica of **PocketFM**, designed for browsing, playing, and managing audio stories.  
This project demonstrates **authentication, routing, audio playback, favorites management, and search/filter features** with a clean, modular architecture.

---

## 🚀 Features

- **Authentication**
  - JWT-based login & logout flow (stored with `js-cookie`).
  - Redirects unauthenticated users to `/login`.

- **Home Page**
  - Browse a list of stories (via static JSON).
  - Each story card includes **image, title, and short description**.
  - Click → navigate to `/story/:id`.

- **Story Page**
  - View full story details.
  - Integrated **Audio Player** (play/pause, track progress).
  - "Add to Favorites" button.

- **Favorites Page**
  - Displays all favorited stories.
  - Remove from favorites with one click.

- **Search & Filter**
  - Search bar for quick story lookup.
  - Filter by categories: **Drama, Thriller, Romance**.

- **Forms & Validation**
  - Registration form with field-level validation.
  - Controlled components for inputs, checkboxes, and radios.

---

## 🛠️ Tech Stack

- **Frontend:** React (Functional Components)  
- **Routing:** React Router  
- **State Management:** Context API (Auth & Favorites)  
- **Styling:** Styled Components  
- **Icons:** React Icons  
- **Auth & Cookies:** JWT + js-cookie  

---

## 📂 Project Structure
src/
├── components/ # Reusable UI components

├── context/ # Auth & Favorites context

├── pages/ # Page-level components (Home, Story, Favorites, Login, Register)

├── data/ # Static stories JSON

├── styles/ # Styled-components theme/global styles

├── App.jsx # Main routes & layout (Entry point) 

## ⚙️ Installation & Setup

1. **Clone the repo**
   
git clone https://github.com/amulya-rao123/PocketFM.git

cd pocketFM

Install dependencies

"npm install"

Run the app

"npm run dev"
