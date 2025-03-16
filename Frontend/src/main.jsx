import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { NavBar } from './Components/NavBar';
import { Login } from './Components/Loginn';
import { Signup } from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {

  return (
    <StrictMode>
    <Router>
     <Routes>
       <Route path= "/login" element = {<Login/>}/>
       <Route path= "/sign-up" element = {<Signup/>}/>
       <Route path='/' element= {<NavBar />}/>
     </Routes>
    </Router>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);

