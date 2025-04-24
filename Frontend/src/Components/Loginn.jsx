import { FcGoogle } from "react-icons/fc";
import img from "../assets/blogss.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SigUpContainer = styled.div`
  position : relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleButton = styled.button`
  color: black;
  background-color: white;
  outline: none;
  border: 2px solid #e7e9ed;
  height: 38px;
  borderradius: 10px;
  font-family: "Nunito";
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color ease 0.4s;
  &:hover {
    background-color: rgb(236, 234, 234);
  }
`;

const InputEmail = styled.input`
  outline: none;
  height: 35px;
  padding-left: 10px;
  border: 2px solid #e7e9ed;
  border-radius: 5px;
  font-family: Nunito;
  &:focus {
    border: 2px solid #7c3aed;
  }
`;
const InputPass = styled.input`
  outline: none;
  height: 35px;
  padding-left: 10px;
  border: 2px solid #e7e9ed;
  border-radius: 5px;
  font-family: Nunito;
  &:focus {
    border: 2px solid #7c3aed;
  }
`;
const Button = styled.button`
  font-family: Nunito;
  background-color: #7c3aed;
  outline: none;
  border: none;
  border-radius: 5px;
  height: 36px;
  cursor: pointer;
  color: white;
  transition: all ease 0.5s;
  &:hover {
    background-color: rgb(157, 106, 245);
  }
`;

const StyledContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  padding-bottom: 25px;
  gap: 10px;
  border-radius: 10px;
  justify-content: center;
  min-width: 240px;
  @media (max-width: 311px) {
    padding: 10px;
    padding-bottom: 25px;
  }
`;
const MsgConatiner = styled.div`
  width: 20%;
  height: 40px;
  background-color: white;
  position: fixed;
  top: 30px;
  right: 0px;
  font-family: "Poppins";
  text-align: center;
  padding-top: 8px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: ${({ visible }) => (visible ? "translateX(0%)" : "translateX(100%)")};
  transition: transform 0.5s ease-in-out;
  @media(max-width : 763px){
    width: 40%;
  }
  @media(max-width : 450px){
    width: 55%;
  }
`;

const Line = styled.div`
  position : absolute ;
  height : 2px;
  background-color : ${({err}) => (err ? "red" : "green")};
  bottom : 0px;
  border-radius : 5px;
  animation: ${({ visible }) => (visible ? "WidthDecrease 2s forwards" : "none")};
  @keyframes WidthDecrease{
    from{
      width : 100%;
    }
    to{
      width : 0%;
    }
  }

`;

export const Login = ({setLoggedIn , setData ,setbuttonclicked}) => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({ email: "", password: "" });
  const [res, setRes] = useState("");
  const [errors , setError] = useState(false);
  const [isVisible, setvisible] = useState(false);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setvisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    
  }, [isVisible]);
  async function sendUserData(userInfo) {
    console.log(userInfo);
    try {
      const res = await fetch("/auth/login-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const body = await res.json();
      if(!res.ok){
      setError(true);
      setRes(body.msg);
      setvisible(true);
      }
      else{
        if (res.ok) {
          setLoggedIn(true);
          sessionStorage.setItem("token" , body.token);
          setData(body);
         
          navigate("/");
      }
      
    }
    } catch (err) {
      console.error("Error:", err);
      setError(true);
      setvisible(true);
      setRes("An error occured");
    }
  }
   
  return (
     <>
      <SigUpContainer>
        <MsgConatiner visible={isVisible} >
          {res}
          <Line visible={isVisible} err={errors} />
        </MsgConatiner>
        <StyledContainer>
          <div style={{ alignSelf: "center" }}>
            <img src={img} alt="Blog Logo" height={30} width={100}/>
          </div>
          <h2 style={{ alignSelf: "center", fontFamily: "Nunito" }}>
            Login into account!
          </h2>
          <GoogleButton>
            <FcGoogle style={{ fontSize: "21px" }} />
            Continue with Google
          </GoogleButton>
          <span style={{ fontFamily: "Nunito", alignSelf: "center" }}>Or</span>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="email" style={{ fontFamily: "Nunito" }}>
              Email
            </label>
            <InputEmail
              name="email"
              placeholder="Enter your email address"
              value={userInfo.email}
              onChange={(e) =>
                setuserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "13px",
            }}
          >
            <label htmlFor="password" style={{ fontFamily: "Nunito" }}>
              Password
            </label>
            <InputPass
              name="password"
              type="password"
              placeholder="Enter your password"
              value={userInfo.password}
              onChange={(e) =>
                setuserInfo({ ...userInfo, password: e.target.value })
              }
            />
          </div>
          <Button
            style={{ fontSize: "14px", marginBottom: "13px" }}
            onClick={() => { sendUserData(userInfo) , setbuttonclicked(true)}}
          >
            Sign In
          </Button>
          <span style={{ fontFamily: "Nunito", alignSelf: "center" }}>
            Don't have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/sign-up">
              Signup
            </Link>
          </span>
        </StyledContainer>
      </SigUpContainer>
      </>
  );
};
