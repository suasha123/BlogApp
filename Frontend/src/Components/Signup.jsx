import { FcGoogle } from "react-icons/fc";
import img from "../assets/Bloglogo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SigUpContainer = styled.div`
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

const InputName = styled.input`
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
  border-radius: 5px;
  font-family: Nunito;
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
  transform: translateX(100%);
  animation: ${({ visible }) => (visible ? "SlideIn 0.5s forwards" : "SlideOut 0.5s forwards")};
  @media(max-width : 1276px){
    width: 27%;
    font-size : 15px;
    top : 20px;
  }
  @media(max-width : 805px){
    width: 30%;
    top : 20px;
  }
  @media(max-width : 709px){
    width: 50%;
    top : 20px;
  }
  @media(max-width : 423px){
    width: 62%;
    top : 15px;
  }
  @media(max-width : 337px){
    width: 75%;
    top : 15px;
  }
  @keyframes SlideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }


  @keyframes SlideOut {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

const Line = styled.div`
  position : absolute ;
  height : 2px;
  background-color : ${({errline}) => (errline ? "red" : "green")};
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


export const Signup = () => {
  const [normal, setNormal] = useState(true);
  const [hover, setHover] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isVisible, setvisible] = useState(false);
  const [res , setRes] =useState("");
  const [err,setErr] = useState(false);
  const [userSignUp, setuserSignUp] = useState({
    name: "",
    email: "",
    password: "",
    
  });
  function checkFields(){
     if(!userSignUp.email || !userSignUp.password || !userSignUp.name){
        setvisible(true);
        setErr(true);
        setRes("All input Fileds are required");
        return ;
     }
     handleData(userSignUp);
     console.log(userSignUp);
  }
  function getBorder() {
    if (hover) {
      return "2px solid #7c3aed";
    }
    if (normal) {
      return "2px solid #e7e9ed";
    }
    if (typing) {
      if (userSignUp.password.length < 8) {
        return "2px solid red";
      } else {
        return "2px solid green";
      }
    }
  }
  useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setvisible(false);
        }, 2000);
  
        return () => clearTimeout(timer);
      }
    }, [isVisible]);

    async function handleData(userSignUp){
      try{
        const res = await fetch("/auth/sign-user",{
          method : 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSignUp),
         })
         if(!res.ok){
          setErr(true);
         }
         else{
          setErr(false);
         }
         const body = await res.json();
          setvisible(true);
          setRes(body.msg)
      }
      catch(err){
          setErr(true);
          setRes(err);
          setvisible(true);
      }
           
    }
  return (
    <SigUpContainer>
     <MsgConatiner visible={isVisible}>
       {res} 
      <Line visible={isVisible} errline={err}/>
      </MsgConatiner>
      <StyledContainer>
        <div
          style={{
            alignSelf: "center",
          }}
        >
          {" "}
          <img src={img} />{" "}
        </div>
        <h2
          style={{
            alignSelf: "center",
            fontFamily: "Nunito",
          }}
        >
          Create account !
        </h2>
        <GoogleButton>
          <FcGoogle
            style={{
              fontSize: "21px",
            }}
          />
          Continue with Google
        </GoogleButton>
        <span
          style={{
            fontFamily: "Nunito",
            alignSelf: "center",
            position: "relative",
          }}
        >
          Or
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label
            htmlFor="name"
            style={{
              fontFamily: "Nunito",
            }}
          >
            Name
          </label>
          <InputName
            name="name"
            onChange={(e) =>
              setuserSignUp({ ...userSignUp, name: e.target.value })
            }
            value={userSignUp.name}
            placeholder="Enter your name"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label
            htmlFor="email"
            style={{
              fontFamily: "Nunito",
            }}
          >
            Email
          </label>
          <InputEmail
            name="email"
            onChange={(e) =>
              setuserSignUp({ ...userSignUp, email: e.target.value })
            }
            value={userSignUp.email}
            placeholder="Enter your email address"
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
          <label
            htmlFor="password"
            style={{
              fontFamily: "Nunito",
            }}
          >
            {" "}
            Password{" "}
          </label>
          <InputPass
            name="password"
            type="password"
            onChange={(e) => {
              setuserSignUp({ ...userSignUp, password: e.target.value });
              setHover(false);
              setTyping(true);
              setNormal(false);
            }}
            onFocus={() => {
              setHover(true);
              setTyping(false);
              setNormal(false);
            }}
            onMouseLeave={() => {
              setHover(false);
              setTyping(false);
              setNormal(true);
            }}
            value={userSignUp.password}
            placeholder="Enter your password"
            style={{
              border: getBorder(),
              transition : "border 0.2s ease"
            }}
          />
        </div>

        <Button
          style={{
            fontSize: "14px",
            marginBottom: "13px",
          }}
          onClick={()=>{
            checkFields();
          }}
        >
          Sign Up
        </Button>
        <span
          style={{
            fontFamily: "Nunito",
            alignSelf: "center",
          }}
        >
          {" "}
          Already have an account ?{" "}
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/login"
          >
            {" "}
            Sign In{" "}
          </Link>
        </span>
      </StyledContainer>
    </SigUpContainer>
  );
};
