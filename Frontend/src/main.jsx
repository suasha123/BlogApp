import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { NavBar } from "./Components/NavBar";
import { Login } from "./Components/Loginn";
import { Signup } from "./Components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [data, setData] = useState({});
  const [buttonclicked , setbuttonclicked] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);
  const verifytoken = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if(!token){
        setLoggedIn(false);
        return;
      }
      const res = await fetch("/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        setLoggedIn(true);
        setData(result);
      } else {
        console.log(result.message);
        sessionStorage.removeItem("token");
        setLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    verifytoken();
  }, []);
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setData={setData} setbuttonclicked={setbuttonclicked} />}
          />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/"
            element={<NavBar LoggedIn={LoggedIn} data={data} setbuttonclicked={setbuttonclicked} buttonclicked={buttonclicked}/>}
          />
        </Routes>
      </Router>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
