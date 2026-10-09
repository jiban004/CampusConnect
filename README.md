# CampusConnect — Smart Student Campus Portal

A responsive student portal built with **React, Vite, React Router, Recharts, Lucide React, and browser LocalStorage**.

> **Project type:** Frontend-only React application. It uses demo content and browser-local persistence; it has no backend, server-side authentication, or remote database.

## Features

- Dashboard overview
- Academic performance and chart visualizations
- Assignment search/filter and status management
- Campus events and registration state
- Student clubs and membership state
- Announcements and available read/filter controls
- Weekly timetable
- Learning resources and bookmarks
- Editable demo student profile
- Light/dark theme with saved preference
- Responsive layouts

Some displayed information is demo data. External-style actions may be demonstrational rather than connected to a real service.

## Tech stack

- **React** — component-based UI
- **Vite** — development server and production build
- **React Router** — client-side navigation
- **Recharts** — charts and visual summaries
- **Lucide React** — icons
- **HTML, CSS, JavaScript** — structure, styles, and behavior
- **LocalStorage** — persistence for selected demo data and preferences

## Run locally

Requirements: a recent Node.js release and npm.

```bash
git clone https://github.com/jiban004/CampusConnect.git
cd CampusConnect
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm run build
npm run lint
```

The production build succeeded during development, with a non-blocking large-chunk warning. Re-run both checks against the current repository before claiming the latest status.

## Data and security

- LocalStorage data is specific to the browser and origin; it does not sync across devices.
- Clearing browser storage can remove saved demo changes.
- The app does not provide production authentication, authorization, or a backend database.
- Do not enter sensitive personal information into this demo.

## Project structure

```text
CampusConnect/
├── public/
├── src/
│   ├── components/   # Shared UI components
│   ├── data/         # Demo student data
│   ├── pages/        # Portal pages
│   ├── App.jsx       # Layout and routes
│   └── index.css     # Global and page styles
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Interview talking points

1. React components make the UI modular and reusable.
2. React Router supports client-side navigation.
3. LocalStorage preserves selected demo state after refresh in the same browser.
4. Recharts visualizes academic/progress data.
5. The app demonstrates interactive UI state, filtering, forms, and responsive CSS.
6. A production version would add a backend API, secure authentication, authorization, database storage, validation, tests, and deployment monitoring.

## Repository

https://github.com/jiban004/CampusConnect









# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
