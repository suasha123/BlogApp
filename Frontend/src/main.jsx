import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { NavBar } from './Components/NavBar';
import { Login } from './Components/Loginn';
import { Signup } from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [LoggedIn , setLoggedIn] = useState(false);
  return (
    <StrictMode>
    <Router>
     <Routes>
       <Route path= "/login" element = {<Login setLoggedIn={setLoggedIn}/>}/>
       <Route path= "/sign-up" element = {<Signup/>}/>
       <Route path='/' element= {<NavBar LoggedIn={LoggedIn} />}/>
     </Routes>
    </Router>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);

