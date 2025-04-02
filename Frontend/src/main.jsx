import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { NavBar } from './Components/NavBar';
import { Login } from './Components/Loginn';
import { Signup } from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [LoggedIn , setLoggedIn] = useState(false);
  const [data , setData] = useState({});
  return (
    <StrictMode>
    <Router>
     <Routes>
       <Route path= "/login" element = {<Login setLoggedIn={setLoggedIn} setData={setData}/>}/>
       <Route path= "/sign-up" element = {<Signup/>}/>
       <Route path='/' element= {<NavBar LoggedIn={LoggedIn} data={data}/>}/>
     </Routes>
    </Router>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);

