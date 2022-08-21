import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './app';
import Home from './routes/home';
import Settings from './routes/settings';

const root = ReactDOMClient.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <App>
          <Home />
        </App>
      } />
      <Route path="/settings" element={
        <App>
          <Settings />
        </App>
      } />
    </Routes>
  </BrowserRouter>
);
