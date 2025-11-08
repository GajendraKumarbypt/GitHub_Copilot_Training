// App.js (shim)
// Re-export the real component implementation in App.jsx so files that import
// './App' keep working while allowing Vite/esbuild to parse JSX from .jsx files.
export { default } from './App.jsx';
