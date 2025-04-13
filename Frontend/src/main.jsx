import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { NavBar } from "./Components/NavBar";
import { Error } from "./Components/Error";
import { Login } from "./Components/Loginn";
import { Signup } from "./Components/Signup";
import { Loader } from "./Components/Reusuable Component/Loader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileInfo } from "./Components/Profile";
import { BlogEditor } from "./Components/BlogEditor";
const App = () => {
  const [loading , setLoading] = useState(true);
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
        console.log(data);
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
  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 3000);
  
    return () => clearTimeout(time);
  }, []); 
  
  return (
    <StrictMode>
    {loading ? (<Loader />):
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setData={setData} setbuttonclicked={setbuttonclicked} />}
          />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/"
            element={<NavBar setData={setData} setLoggedIn={setLoggedIn} LoggedIn={LoggedIn} data={data} setbuttonclicked={setbuttonclicked} buttonclicked={buttonclicked}/>}
          />
          <Route
            path="/userprofile"
            element={<ProfileInfo data={data} LoggedIn={LoggedIn}/>}
          />
          <Route
            path="/postcreate"
            element ={<BlogEditor LoggedIn={LoggedIn} data={data}  />}
            />
            <Route 
              path="*"
              element={<Error />}
            />
        </Routes>
      </Router>
    }
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
