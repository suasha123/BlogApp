import { Sidebar } from "./Sidebar";
import { RxCrossCircled } from "react-icons/rx";
import img from "../assets/Bloglogo.png";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Dark effect */
  opacity: ${({ open }) => (open ? "1" : "0")}; /* Change opacity */
  visibility: ${({ open }) => (open ? "visible" : "hidden")}; /* Hide when closed */
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 10; /* Behind the sidebar */
`;

const SidebarContainer = styled.div`
  background-color: white;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  z-index: 20; /* Above overlay */
`;

export const SlideBar = ({ setOpen, open }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 786) {
        setOpen(!open); // Automatically close sidebar on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener
  }, [setOpen]);

  return (
    <>
      <Overlay open={open} onClick={() => setOpen(false)} />
      
      <SidebarContainer open={open}>
        <div style={{
          display : "flex" , 
          alignItems : "center" ,
          justifyContent : "space-between",
          paddingRight : "10px"
        }}>
        <img src={img} alt="Logo" style={{ width: "100px", margin: "10px" }} />
        <RxCrossCircled
          
          onClick={() => setOpen(false)}
          style={{ cursor: "pointer", margin: "10px", fontSize: "24px" }}
        />
        </div>
        <Sidebar />
      </SidebarContainer>
    </>
  );
};
