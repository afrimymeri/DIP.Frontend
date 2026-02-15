# DIP Frontend

**DIP (Digital Information Platform)** is a web application that provides a unified interface for searching scientific papers across multiple academic databases.

## Supported Sources

- Semantic Scholar
- DBLP
- OpenAlex
- CrossRef
- arXiv
- IEEE Xplore
- ACM Digital Library

## Tech Stack

- **Framework**: Vue 3 (Composition API + TypeScript)
- **Build Tool**: Vite
- **UI Library**: Vuetify 3 (Material Design)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Testing**: Vitest (unit), Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- The [DIP.Backend](../DIP.Backend) "https://github.com/afrimymeri/DIP.Backend" API running on `http://localhost:5142`

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5142
```

### Development

```bash
npm run dev
```

## Available Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start dev server with hot reload |
| `npm run build`     | Type-check + production build    |
| `npm run preview`   | Preview production build         |
| `npm run test:unit` | Run unit tests (Vitest)          |
| `npm run test:e2e`  | Run E2E tests (Playwright)       |
| `npm run lint`      | Lint and auto-fix with ESLint    |
| `npm run format`    | Format code with Prettier        |

## Project Structure

```
src/
├── pages/           # Route page components
├── components/      # Reusable components (organized by feature)
├── composables/     # Vue composition functions
├── stores/          # Pinia state stores
├── router/          # Route definitions
├── plugins/         # Vue plugins (Vuetify)
├── types/           # TypeScript type definitions
└── assets/          # Static files and styles
```
