import styled from "styled-components"
import { CgProfile } from "react-icons/cg";

const UserData = styled.div`
   position : absolute;
   right :5px;
   top  :60px;
   background-color : white;
   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   border-radius : 10px;
   padding : 15px;
   font-family : Nunito;
   font-size : 14px;
   
`;

export const UserProfile = ({data})=>{
    return (
        <UserData>
         <div style={{
            marginBottom : "5px",
            fontWeight : "600"
         }}>{data.name || "surya partap singh"}</div>
         <div style={{
            marginBottom : "10px",
             fontWeight : "600"
         }}>{data.email || "email.com"}</div>
         <div style={{
            background : "#F3F4F6",
            height : "1px",
            width : "100%",
            marginBottom : "15px"
         }}>
         </div>
       <div style={{
        display : "flex",
        flexDirection : "row",
        gap :"8px",
        alignItems : "center",
        fontSize : "16px",
        fontWeight : "600"
       }}>
       <CgProfile  style={{
        height : "20px",
        width : "20px",
        marginRight : "5px"
       }}/>
       <span>Profile</span>
       </div>
        </UserData>
    )
}