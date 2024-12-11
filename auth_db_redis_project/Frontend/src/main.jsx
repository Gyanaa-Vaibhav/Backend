// TODO
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {LoginForm,RegisterForm,Error} from './features/index.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/register" element={<RegisterForm/>}/>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/*" element={<Error />}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
