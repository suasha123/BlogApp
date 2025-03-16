import img from '../assets/Bloglogo.png';
import styled from 'styled-components';
import { CiLogin } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiList } from "react-icons/pi";
import { useEffect, useState } from 'react';
import { SlideBar } from './SlidingBar';
import { Sidebar } from './Sidebar';
import {Link} from 'react-router-dom';
const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 25px;
    border : 1px solid #e7e9ed;
    position:sticky;
    top : 0px;
`;



const Input = styled.input`
    background-color: #f9fafb;
    border-radius: 20px;
    color: black;
    width: 35%;
    height: 36px;
    padding: 5px 14px;
    outline: none;
    font-family: 'Poppins', sans-serif;
    border: 2px solid #e7e9ed;

    @media (max-width: 944px) {
        width: 40%;
    }

    @media (max-width: 547px) {
        display: none;
    }
`;

const LoginButton = styled(Link)`
    background-color: #7c3aed;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    color: #f9fafb;
    outline: none;
    border: none;
    width: 9%;
    height: 36px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: relative;  /* 👈 Ensures SearchIcon is positioned relative to this button */
    text-decoration : none;
    @media (max-width: 944px) {
        width: 18%;
    }

    @media (max-width: 547px) {
        width: 24%;
        font-size: 13px;
    }
    @media (max-width: 383px) {
        width: 30%;
        font-size: 13px;
    }
`;

const SearchIcon = styled(IoIosSearch)`
    display: none;

    @media (max-width: 547px) {
        display: block;
        font-size: 22px;
        position: absolute;
        left: -30px;  /* 👈 Adjust to place it near LoginButton */
        top: 50%;
        transform: translateY(-50%);
        color: #7c3aed;
    }
`;
 const ListLogo = styled(PiList)`
     cursor : pointer;
     display : none;
     @media(max-width : 787px){
        display : block;
     }
 `;

export const NavBar = () => {
      const [ open , isopen ] = useState(false);
       const setOpen = ()=>{
        isopen(!open);
       }



        const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
       
         useEffect(() => {
           const handleResize = () => {
             setIsSidebarVisible(window.innerWidth >= 787);
           };
       
           window.addEventListener('resize', handleResize);
           return () => window.removeEventListener('resize', handleResize);
         }, []);



    return (

        
        <>
        <Nav>
           <ListLogo onClick={()=>setOpen(!open)}/>
            <img src={img} alt="Blog Logo" />
            <Input placeholder="Search here..." />
            <LoginButton  to='/login'>
                <SearchIcon />
                <CiLogin style={{ fontSize: "20px", strokeWidth: "1.5" }} />
                Sign-In
            </LoginButton>
            
            
        </Nav>

        {isSidebarVisible && <Sidebar />}
        <SlideBar setOpen={setOpen} open={open} />
        </>
    );
};
