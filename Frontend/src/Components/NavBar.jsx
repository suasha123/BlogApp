import img from "../assets/Bloglogo.png";
import styled from "styled-components";
import { CiLogin } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiList } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { TopNav } from "./TopNavbar";
import { Sidebar } from "./Sidebar";
import portfolio from "../assets/portfolio.png";
import { CreateBlog } from "./CreateButton";
import { ContentCard } from "./ContentCards";
import { AppFooter } from "./Footer";
import { useSearchParams } from 'react-router-dom';
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  background-color: #f8f8ff;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 25px;
  border: 1px solid #e7e9ed;
  min-width: 288px;
  z-index: 1000;
  @media (max-width: 383px) {
    padding-right: 7px;
  }
`;
const Input = styled.input`
  background-color: #f9fafb;
  border-radius: 20px;
  color: black;
  width: 35%;
  height: 36px;
  padding: 5px 14px;
  outline: none;
  font-family: "Poppins", sans-serif;
  border: 2px solid #e7e9ed;

  @media (max-width: 944px) {
    width: 40%;
  }

  @media (max-width: 547px) {
    position: absolute;
    top: 70px;
    width: 90%;
  }
`;

const LoginButton = styled(Link)`
  background-color: #7c3aed;
  font-family: "Nunito", sans-serif;
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
  position: relative;
  text-decoration: none;
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
  cursor: pointer;
  @media (max-width: 547px) {
    display: block;
    font-size: 22px;
    position: relative;
    left: 50px;
    color: #7c3aed;
  }
  @media (max-width: 458px) {
    left: 20px;
  }
  @media (max-width: 458px) {
    left: 10px;
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: ${({ visible }) =>
    visible ? "translateX(0%)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out;
  z-index: 10000;
  @media (max-width: 763px) {
    width: 40%;
  }
  @media (max-width: 450px) {
    width: 55%;
  }
`;
const Line = styled.div`
  position: absolute;
  height: 2px;
  background-color: green;
  bottom: 0px;
  border-radius: 5px;
  animation: ${({ visible }) =>
    visible ? "WidthDecrease 2s forwards" : "none"};
  @keyframes WidthDecrease {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;
export const NavBar = ({
  LoggedIn,
  data,
  setbuttonclicked,
  buttonclicked,
  setData,
  setLoggedIn,
}) => {
  const [profile, setProfile] = useState(false);
  const [clicked, setCliked] = useState(false);
  const [isVisible, setvisible] = useState(false);
  const [isopen, setopen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSerachVisible, setSearchVisible] = useState(
    window.innerWidth >= 547
  );
  const handleSetCategory = (category) => {
    if (!category || category === 'allposts') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  const selectedCategory = searchParams.get('category') || 'allposts';
  function getdisplay() {
    if (clicked) {
      return "block";
    }
    return "none";
  }
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setvisible(false), 2000);
    }
  }, [isVisible]);

  useEffect(() => {
    const handlevisiblity = () => {
      setSearchVisible(window.innerWidth >= 547);
    };
    window.addEventListener("resize", handlevisiblity);
    return () => window.removeEventListener("resize", handlevisiblity);
  }, []);

  useEffect(() => {
    if (buttonclicked) {
      setTimeout(() => setbuttonclicked(false), 3000);
    }
  }, [buttonclicked]);
  useEffect(() => {
    setvisible(true);
  }, [data]);

  return (
    <>
      <Nav>
        <Div>
          {buttonclicked && (
            <MsgConatiner visible={isVisible}>
              Login Successful
              <Line visible={isVisible} />
            </MsgConatiner>
          )}
          {!isSerachVisible && (
            <PiList
              onClick={() => {
                setopen(true);
              }}
            />
          )}
          <img src={img} alt="Blog Logo" />
          <Input
            placeholder="Search here..."
            style={{
              display: isSerachVisible ? "block" : getdisplay(),
            }}
          />
          <SearchIcon onClick={() => setCliked(!clicked)} />
          {LoggedIn ? (
            <>
              <div
                onClick={() => setProfile(!profile)}
                style={{
                  width: "50px",
                  height: "50px",
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              >
                <img
                  src={
                    data.pic ? `http://localhost:3000/${data.pic}` : portfolio
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              {profile && (
                <UserProfile
                  data={data}
                  setData={setData}
                  setLoggedIn={setLoggedIn}
                />
              )}
            </>
          ) : (
            <LoginButton to="/login">
              <CiLogin style={{ fontSize: "20px", strokeWidth: "1.5" }} />
              Sign-In
            </LoginButton>
          )}
        </Div>
        {isSerachVisible && <TopNav handleCategory={handleSetCategory} selectedCategory={selectedCategory}/>}
        <MainContent>
        <ContentCard selectedCategory={selectedCategory}/>
        </MainContent>
       <AppFooter />
      </Nav>

      {!isSerachVisible && isopen && (
        <Sidebar setopen={setopen} isopen={isopen} />
      )}
      {LoggedIn && <CreateBlog />}
    </>
  );
};
