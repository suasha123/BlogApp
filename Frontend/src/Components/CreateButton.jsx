import styled from "styled-components"
import { MdCreate } from "react-icons/md";
const CreateButton = styled.button`
  position : fixed;
  bottom :70px;
  right : 20px;
  width : 10rem;
  height : 50px;
  background-color: #6200ea;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  outline : none;
  border : none;
  border-radius : 5px;
  color : white;
  display : flex;
  align-items : center;
  justify-content : center;
  gap : 10px;
  font-size : 15px;
  cursor : pointer;
  font-family : 'Nunito';
  transition : all 0.5s ease;
  z-index : 4000;
  &:hover{
    background-color: #5800b8;
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  @media(max-width : 480px){
    width : 8rem;
  }
`;



export const CreateBlog = ()=>{
    return (
        <CreateButton>
        <MdCreate  style={{fontSize :"20px"}}/>
            Create Blog
        </CreateButton>
    )
}