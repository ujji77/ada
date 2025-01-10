// src/App.jsx
import React from 'react';
import Layout from './components/layout/Layout';
import { initializeIcons } from '@fluentui/react/lib/Icons';

// Initialize Fluent UI icons
initializeIcons();

function App() {
  return (
    <Layout />
  );
}

export default App;