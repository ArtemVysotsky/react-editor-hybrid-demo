# Repository Guidelines

## Project Structure & Module Organization
The React entry point is `src/index.js`, which mounts the hybrid editor page housed under `src/pages/Post/`. Shared UI primitives sit in `src/components/`, while editor state logic resides in `src/reducers/`. Static fixtures (icons, sample content) belong in `src/assets/`. Runtime defaults live in `src/config.js`, and build tooling is configured via top-level `webpack.config.js`, `babel.config.json`, and `eslint.config.js`. Generated bundles and assets land in `dist/`; treat that directory as disposable output and never edit it manually.

## Build, Test, and Development Commands
Install dependencies with `npm install`. Use `npm start` to create a development bundle in `dist/`; serve it locally with a lightweight static server such as `npx serve dist` when needed. Run `npm run build` for the optimized production bundle. Execute `npm test` to invoke Jest across all registered suites; append `--watch` during iterative work.

## Coding Style & Naming Conventions
Code targets modern React (18.x) with ES modules. Match the existing four-space indentation, prefer single quotes, and include semicolons on statements to satisfy the recommended ESLint rules. Components and hooks should be exported from PascalCase files (e.g., `EditorToolbar.js`), while utilities stay in camelCase. Keep logic-focused modules small and colocate related styles or assets beside their component. Before opening a pull request, lint with `npx eslint "src/**/*.{js,jsx}"` and fix reported issues.

## Testing Guidelines
Jest is preconfigured through Babel. Place new suites next to the code they exercise using the `*.test.js` suffix or inside a sibling `__tests__/` folder (e.g., `components/__tests__/Editor.test.js`). Strive to cover branches introduced by TinyMCE integrations and async fetch flows; stub network calls and editor APIs to keep tests deterministic. Run `npm test` before submitting changes and note any skipped coverage in your PR description.

## Commit & Pull Request Guidelines
Recent history favors concise, present-tense commit subjects (e.g., `Fix parameters bugs`). Keep each commit focused and include context in the body when touching multiple modules. Pull requests should summarize the problem, describe the solution, and call out side effects. Link issues, attach UI screenshots when the editor changes visually, and outline manual verification steps so reviewers can reproduce your results quickly.
