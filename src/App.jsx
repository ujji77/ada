// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdaOne from './features/ada1';
import AdaTwo from './features/ada2';
import AdaThree from './features/ada3';
import AdaFour from './features/ada4';
import AdaFiveA from './features/ada5a';
import AdaSix from './features/ada6';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/ada1" replace />} />
        <Route path="/ada1" element={<AdaOne />} />
        <Route path="/ada2" element={<AdaTwo />} />
        <Route path="/ada3" element={<AdaThree />} />
        <Route path="/ada4" element={<AdaFour />} />
        <Route path="/ada5a" element={<AdaFiveA />} />
        <Route path="/ada6" element={<AdaSix />} />
      </Routes>
    </MainLayout>
  );
}

export default App;