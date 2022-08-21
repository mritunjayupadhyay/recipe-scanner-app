import React from 'react';
import './App.css';
import { navigationRouter } from './helpers/navigation-router';
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import QrScan from './pages/qrScan/QrScan';
import BasicQrScan from './pages/qrScan/BasicQrScan'
import ProductDetails from './pages/productDetails/ProductDetails';
import NotFound from './pages/notFound/NotFound';

function App() {
  navigationRouter.navigate = useNavigate();
  navigationRouter.location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <BasicQrScan />
          } />
        <Route
          path="/recipe/:recipeId"
          element={
            <ProductDetails />
          } />
        <Route
          path="/not-found"
          element={
            <NotFound />
          } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
