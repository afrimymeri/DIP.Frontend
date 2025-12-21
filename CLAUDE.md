# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

**DIP (Digital Information Platform)** frontend - A Vue 3 application that provides a unified interface for searching scientific papers across multiple academic databases (Semantic Scholar, DBLP, IEEE, ACM, ScienceDirect, SpringerLink, Google Scholar).

## Commands

```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Type-check + production build
npm run preview      # Preview production build
npm run test:unit    # Run Vitest unit tests
npm run test:e2e     # Run Playwright E2E tests
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
```

## Tech Stack

- **Framework**: Vue 3 with Composition API (`<script setup lang="ts">`)
- **Build**: Vite
- **UI**: Vuetify 3 (Material Design)
- **State**: Pinia
- **Router**: Vue Router 4
- **Testing**: Vitest (unit), Playwright (E2E)

## Architecture

### Folder Structure
```
src/
├── pages/           # Route page components
├── components/      # Reusable components (feature folders like Auth/)
├── composables/     # Vue composition functions (useAuth, etc.)
├── stores/          # Pinia stores
├── router/          # Route definitions
├── plugins/         # Vue plugins (Vuetify)
└── assets/          # CSS and static files
```

### Key Patterns

**State Management (Pinia)**: Stores use composition API syntax with `ref()` and `computed()`. See `stores/auth.ts` for the pattern.

**API Calls**: Handled via composables in `composables/`. Uses native `fetch()`, not Axios. Backend URL from `VITE_API_URL` env var.

**Components**: All use `<script setup lang="ts">` with typed props (`defineProps<>`) and emits (`defineEmits<>`).

**Styling**: Vuetify utility classes (`d-flex`, `pa-8`, etc.) + scoped CSS. No Tailwind.

### Auth Flow
1. `LoginPage.vue` / `SignupPage.vue` → form pages
2. `useAuth()` composable → API calls
3. `useAuthStore()` → manages user state, token in localStorage

## Configuration

- **API URL**: Set `VITE_API_URL` in `.env` (default: `http://localhost:5142`)
- **Path alias**: `@/` maps to `src/`

## Code Style

- No semicolons
- Single quotes
- 100-char line width
- PascalCase for components, kebab-case for other files
