import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
const SidebarContainer = styled.div`
  width : 250px;
  min-width : 250px;
  height: 100vh;
  border-right: 1px solid #e7e9ed;
  padding: 25px 10px ;
  padding-left : 20px;
  position: fixed; 
`;

const HomeContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  text-decoration: none;
  color: black;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(124, 58, 237, 0.1); 
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(124, 58, 237, 0.1); 
  }
`;

const CategoriesListItems = styled.a`
  list-style: none;
  text-decoration: none;
  color: #3f3546;
  font-family: "Poppins";
  font-size: 14px;
`;

export const Sidebar = () => {
  let items = [
    "Business",
    "Education & Career",
    "Entertainment",
    "Fashion and Beauty",
    "Food & Drinks",
    "Humanities & Law",
    "News & Politics",
    "Technology" ,
    "Sports",
  ];
  return (
    <>
    <SidebarContainer>
      <HomeContainer href="#">
        <IoHomeOutline />
        <span
          style={{
            fontFamily: "Poppins",
            fontSize: "15px",
          }}
        >
          Home
        </span>
      </HomeContainer>

      <span
        style={{
          color: "#3f3f46b2",
          fontSize: "14px",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        Categories
      </span>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
        }}
      >
        {items.map((item, index) => {
          return (
            <CategoriesContainer key={index}>
              <FaRegCircle
                style={{
                  width: "9px",
                }}
              />
              <CategoriesListItems href="#">{item}</CategoriesListItems>
            </CategoriesContainer>
          );
        })}
      </div>
    </SidebarContainer>
    </>
  );
};
