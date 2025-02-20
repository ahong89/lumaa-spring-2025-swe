import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
