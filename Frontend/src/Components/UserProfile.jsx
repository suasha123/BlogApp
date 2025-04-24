import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserData = styled.div`
 min-width : 233px;
  position: absolute;
  right: 5px;
  top: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  padding: 15px;
  font-family: Nunito;
  font-size: 14px;
  z-index : 3000;
`;

export const UserProfile = ({ data, setData, setLoggedIn }) => {
   const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const [isHoveredd, setHoveredd] = useState(false);
  return (
    <UserData>
      <div
        style={{
          marginBottom: "5px",
          fontWeight: "600",
        }}
      >
        {data.name}
      </div>
      <div
        style={{
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        {data.email }
      </div>
      <div
        style={{
          background: "#F3F4F6",
          height: "1px",
          width: "100%",
          marginBottom: "6px",
          cursor: "pointer",
        }}
      ></div>
      <div
        onClick={() => navigate("/userprofile")}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        style={{
          display: "flex",
          cursor: "pointer",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "5px",
          borderRadius: "5px",
          padding: "8px ",
          backgroundColor: isHovered ? "#f3f4f6" : "transparent",
          transition: "background-color 0.5s ease-in",
        }}
      >
        <CgProfile
          style={{
            height: "20px",
            width: "20px",
            marginRight: "5px",
          }}
        />
        <span>Profile</span>
      </div>
      <div
        style={{
          background: "#F3F4F6",
          height: "1px",
          width: "100%",
          marginBottom: "8px",
        }}
      ></div>
      <div
        onClick={() => {
          setLoggedIn(false);
          setData({});
          sessionStorage.removeItem("token");
        }}
        onMouseOver={() => {
          setHoveredd(true);
        }}
        onMouseLeave={() => {
          setHoveredd(false);
        }}
        style={{
          width: "100%",
          display: "flex",
          gap: "10px",
          cursor: "pointer",
          borderRadius: "5px",
          paddingLeft: "5px",
          alignItems: "center",
          padding: "7px ",
          backgroundColor: isHoveredd ? "#f3f4f6" : "transparent",
          transition: "background-color 0.5s ease-in",
        }}
      >
        <FiLogOut
          style={{
            color: "red",
            height: "20px",
            width: "20px",
            fontSize: "15px",
          }}
        />
        <span>Log out</span>
      </div>
    </UserData>
  );
};
