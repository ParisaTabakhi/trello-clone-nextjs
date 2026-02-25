# Trello Clone

A lightweight Trello clone built with Next.js, TypeScript, and Zustand. All data is persisted in localStorage.

---

##  Features

- **List Management** – Create, delete, edit, and reorder lists via drag & drop
- **Card Management** – Create, delete, edit, and move cards between lists
- **Comments** – Add and view comments in a modal
- **Drag & Drop** – Horizontal list reorder + vertical/cross-list card reorder
- **Persistence** – All data saved in localStorage
- **Responsive** – Works on desktop and mobile

---

##  Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS Modules
- **State Management:** Zustand
- **Drag & Drop:** @dnd-kit
- **Storage:** localStorage

---

## 🏗 Project Structure

```
src/
├── app/                    # Next.js pages
├── features/               # Feature-based modules
│   └── board/              # Board feature
│       ├── ui/             # Presentational components
│       ├── components/      # Specialized components (DnD)
│       ├── hooks/           # Custom hooks
│       ├── model/           # Business logic & state
│       ├── services/        # Persistence layer
│       ├── lib/             # Utility functions
│       └── types.ts         # TypeScript types
├── shared/                 # Shared code across features
│   ├── ui/                  # Reusable UI components
│   └── styles/              # Global SCSS
└── types/                   # Global type definitions
```

---

##  Getting Started

```bash
# Clone repository
git clone https://github.com/ParisaTabakhi/trello-clone.git

# Install dependencies
cd trello-clone
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

---

##  Responsive Design

- **Desktop:** Horizontal scroll for lists, vertical scroll for cards
- **Mobile:** Optimized widths with smooth scrolling

---


MIT