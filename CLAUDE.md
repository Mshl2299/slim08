# CLAUDE.md

## Project

A personal portfolio website to showcase projects in an engaging, interactive and intentional way.

## Stack

Node.js 26, React 19, TypeScript 6, Vite 8, React Router DOM 7, Material UI 9,ESLint 10, Prettier 3, gh-pages 6

## Commands

npm install - install dependencies  
npm run dev - start development server  
npm run build - build production bundle  
npm run lint - run ESLint checks  
npm run lint:fix - run ESLint with automatic fixes  
npm run format - format code using Prettier  
npm run preview - preview production build locally  
npm run deploy - build and deploy to GitHub Pages

## Architecture

- src/assets/ - static images, icons, and media files
- src/components/ - reusable UI components (buttons, layout, shared widgets)
- src/pages/ - route-level pages and page-specific logic/styles
- src/styles/ - global CSS and shared styling
- src/routes.tsx - centralized route definitions for React Router
- src/App.tsx - root application wrapper (providers, router mount)
- src/main.tsx - application entry point (React DOM render bootstrap)

## Rules

Never: commit .env files or secrets under any circumstances, force-push to main

Always:

- Use try/catch on async
- Use functional, declarative programming. Avoid classes. Use functional components only.
- Use named exports for components
- Use lowercase with dashes for directories
- Use descriptive variable names with auxiliary verbs
- Separate commits per logical change,
- Use "function" keyword for pure functions. Omit semicolons.
- Use TypeScript for all code. Prefer interfaces over types. Avoid enums, use maps.
- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions.
  - Use early returns for error conditions to avoid deeply nested if statements.
  - Place the happy path last in the function for improved readability.
  - Avoid unnecessary else statements; use if-return pattern instead.
  - Use guard clauses to handle preconditions and invalid states early.
- Keep components under 250 lines

## Workflow

- Ask clarifying questions before starting complex or ambiguous tasks
- Make minimal changes - do not refactor unrelated code
- Run tests after every change; fix failures before moving on
- When ungure between approaches, explain both and let me choose
- Never modify outside the scope of the current task without asking

## Out of scope

- dist/ - auto-generated, never edit directly
