// index.js (shim)
// Re-export the real entrypoint implemented in index.jsx so tools that reference
// ./index.js keep working while the actual JSX lives in index.jsx.
export { default } from './index.jsx';
