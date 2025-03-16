import { FcGoogle } from "react-icons/fc";
import img from '../assets/Bloglogo.png';
import styled from "styled-components";
import { Link } from "react-router-dom";
const SigUpContainer = styled.div`
        width : 100vw;
        height : 100vh;
        display : flex;
        align-items : center;
        justify-content : center;
`;


const GoogleButton = styled.button`
            color : black;
            background-color : white;
            outline : none;
            border : 2px solid  #e7e9ed;
            height : 38px;
            borderRadius : 10px;
            font-family: "Nunito";
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            border-radius : 8px;
            transition : background-color ease 0.4s;
             &:hover{
                background-color :rgb(236, 234, 234);
             }
`;

const InputName = styled.input`
    outline: none;
    height: 35px;
    padding-left: 10px;
    border: 2px solid  #e7e9ed;  
    border-radius : 5px;
    font-family : Nunito;
    &:focus {
        border: 2px solid  #7c3aed; 
    }
`;

const InputEmail = styled.input`
    outline: none;
    height: 35px;
    padding-left: 10px;
    border: 2px solid  #e7e9ed;  
    border-radius : 5px;
    font-family : Nunito;
    &:focus {
        border: 2px solid  #7c3aed; 
    }
`;
const InputPass = styled.input`
    outline: none;
    height: 35px;
    padding-left: 10px;
    border: 2px solid  #e7e9ed;  
    border-radius : 5px;
    font-family : Nunito;
    &:focus {
        border: 2px solid #7c3aed; 
    }
`;
const Button = styled.button`
            font-family : Nunito;
            background-color : #7c3aed;
            outline : none;
            border : none;
            border-radius : 5px;
            height : 36px;
            cursor : pointer;
            color : white;
            transition : all ease 0.5s;
 &:hover {
    background-color : rgb(157, 106, 245)
 }
`

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
    @media(max-width : 311px){
        padding : 10px;
        padding-bottom: 25px;
    }
`;

export  const Signup = ()=>{
    return (
        <SigUpContainer>
        <StyledContainer>
          <div style={ {
            alignSelf : "center"
          }}>  <img src={img}/> </div>
          <h2 style={{
            alignSelf : "center",
            fontFamily : "Nunito",
          }}>Create account !</h2>
          <GoogleButton>
            <FcGoogle  style={{
                fontSize : "21px",
            }}/>
            Continue with Google 
          </GoogleButton> 
         <span style={{
            fontFamily : "Nunito",
            alignSelf : "center",
            position : "relative"
         }}>Or</span>

         <div style={{
            display : "flex",
            flexDirection : "column",
            gap : "8px"
         }}>
             <label htmlFor="name" style={{
                fontFamily : "Nunito",
            }}>
                Name
            </label>
            <InputName name="name"  placeholder="Enter your name"/>
         </div>
        
         <div style={{
            display : "flex",
            flexDirection : "column",
            gap : "8px"
         }}>

            <label htmlFor="email" style={{
                fontFamily : "Nunito",
            }}>
                Email
            </label>
            <InputEmail name="email"  placeholder="Enter your email address"/>
         </div>
         <div style={{
            display : "flex",
            flexDirection : "column",
             gap : "8px",
             marginBottom : "13px"
         }}>
            <label htmlFor="password" style={{
                fontFamily : "Nunito",
            }}> Password </label>
             <InputPass name="password" placeholder="Enter your password"/>
         </div>

         <div style={{
            display : "flex",
            flexDirection : "column",
             gap : "8px",
             marginBottom : "13px"
         }}>
            <label htmlFor="confirmpassword" style={{
                fontFamily : "Nunito",
            }}> Confirm Password</label>
             <InputPass name="confirmpassword" placeholder="Enter password again"/>
         </div>

         <Button style={{
            fontSize : "14px",
            marginBottom : "13px"
         }}>Sign Up</Button>
         <span style={{
            fontFamily : "Nunito",alignSelf : "center"
         }}> Already have an account ? <Link style={{
            textDecoration : "none"
         }} to='/login'> Sign In </Link></span>
        </StyledContainer>
        </SigUpContainer>
    )
}