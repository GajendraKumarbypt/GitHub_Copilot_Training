/**
 * Entry point for the Weather Dashboard demo app.
 * Minimal bootstrapping to demonstrate the WeatherWidget component.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('root') || document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);
