// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdaOne from './features/ada1';
import AdaSix from './features/ada6';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/ada1" replace />} />
        <Route path="/ada1" element={<AdaOne />} />
        <Route path="/ada6" element={<AdaSix />} />
      </Routes>
    </MainLayout>
  );
}

export default App;