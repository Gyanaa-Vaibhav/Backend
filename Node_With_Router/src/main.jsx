import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router";
import Home from "./Components/Home.jsx";
import Nav from "./Components/Nav.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import NotFound from "./Components/NotFound.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Nav />
      <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='*' element={<NotFound />}/>
      </Routes>
  </BrowserRouter>,
)
