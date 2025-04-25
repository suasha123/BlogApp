import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/blogss.png";
import portfolio from "../assets/portfolio.png";
import { CiLogin } from "react-icons/ci";
import { PiList } from "react-icons/pi";
import { IoIosNotifications, IoIosSearch } from "react-icons/io";
import { UserProfile } from "./UserProfile";
import styled from "styled-components";
import { NotificationPanel } from "./Notification";
import { useNavigate } from "react-router-dom";
export const Div = styled.div`
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

export const Input = styled.input`
  background-color: #f9fafb;
  border-radius: 20px;
  color: black;
  width: 35%;
  height: 36px;
  padding: 5px 14px;
  outline: none;
  font-family: "Poppins", sans-serif;
  border: 2px solid #e7e9ed;
  position: relative;

  @media (max-width: 944px) {
    width: 40%;
  }
  @media (max-width: 547px) {
    position: absolute;
    top: 70px;
    width: 90%;
  }
`;

const SearchResult = styled.div`
  width: 40%;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  position: absolute;
  top: 70px;
  left: 29%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 8px 30px rgba(151, 91, 255, 0.3);

  @media (max-width: 945px) {
    left: 22%;
    width: 50%;
  }
  @media (max-width: 768px) {
    left: 18%;
    width: 60%;
  }
  @media (max-width: 547px) {
    left: 10%;
    top: 110px;
    width: 80%;
  }
  @media (max-width: 328px) {
    left: 5%;
    width: 90%;
  }
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: rgba(151, 91, 255, 0.1);
  }

  img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #7c3aed;
  }
`;

const PostImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
`;

export const LoginButton = styled(Link)`
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

export const SearchIcon = styled(IoIosSearch)`
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
  @media (max-width: 383px) {
    left: 10px;
  }
`;

export const MsgConatiner = styled.div`
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

export const Line = styled.div`
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

export const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgb(151, 91, 255);
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: "Nunito";
`;

export const NavTopBar = ({
  LoggedIn,
  data,
  setbuttonclicked,
  buttonclicked,
  setData,
  setLoggedIn,
  setopen,
  isSerachVisible,
}) => {
  const [profile, setProfile] = useState(false);
  const [clicked, setCliked] = useState(false);
  const [isVisible, setvisible] = useState(false);
  const [panel, setPanel] = useState(false);
  const [count, setUnreadCount] = useState(0);
  const [query, searchquery] = useState("");
  const [resultbar, setResultbar] = useState(false);
  const [page, setpage] = useState(1);
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
  const navigate = useNavigate();
  const fetchsearchresult = async (query) => {
    try {
      const res = await fetch(`https://blogapp-45n2.onrender.com/search/${query}?page=${page}`);
      const data = await res.json();
      if (res.ok) {
        setSearchResults(data);
      } else {
        console.log("Search failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data.id) {
      const fetchUnreadCount = async () => {
        try {
          const response = await fetch(
            `https://blogapp-45n2.onrender.com/notifications/unread-count/${data.id}`
          );
          const result = await response.json();
          setUnreadCount(result.unreadCount);
        } catch (err) {
          console.error("Error fetching unread notification count:", err);
        }
      };
      fetchUnreadCount();
    }
  }, [data.id]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setvisible(false), 2000);
    }
  }, [isVisible]);

  useEffect(() => {
    if (buttonclicked) {
      setTimeout(() => setbuttonclicked(false), 3000);
    }
  }, [buttonclicked]);

  useEffect(() => {
    if (query) {
      setResultbar(true);
      setTimeout(() => {
        fetchsearchresult(query);
      }, 1000);
    } else {
      setResultbar(false);
    }
  }, [query]);

  useEffect(() => {
    setvisible(true);
  }, [data]);

  return (
    <Div>
      {buttonclicked && LoggedIn &&(
        <MsgConatiner visible={isVisible}>
          Login Successful
          <Line visible={isVisible} />
        </MsgConatiner>
      )}

      {!isSerachVisible && <PiList onClick={() => setopen(true)} />}

      <img src={img} alt="Blog Logo"  width={100} height={30}/>
{ !isSerachVisible ?  (clicked ? ( <Input
        placeholder="Search here..."
        value={query}
        onChange={(e) => searchquery(e.target.value)}
      />): "") : (<Input
        placeholder="Search here..."
        value={query}
        onChange={(e) => searchquery(e.target.value)}
      />)}

      {resultbar && (
        <SearchResult>
          {searchResults.posts.length > 0 || searchResults.users.length > 0 ? (
            <>
              {searchResults.users.map((user) => (
                <ResultItem key={user._id} onClick={()=>{navigate(`/userprofile/${user._id}`)  ; setResultbar(false) ; searchquery("") ; setCliked(false)}}>
                  <img src={user.profilepic || portfolio} alt={user.name} />
                  <span>{user.name}</span>
                </ResultItem>
              ))}
              {searchResults.posts.map((post) => (
                <ResultItem key={post._id} onClick={()=>{navigate(`/?id=${post._id}`) ; setResultbar(false) ; searchquery("") ; setCliked(false) }}>
                  <PostImage src={post.image} alt={post.title} />
                  <span>{post.title}</span>
                </ResultItem>
              ))}
            </>
          ) : (
            <ResultItem>
              <span>No Search Results</span>
            </ResultItem>
          )}
        </SearchResult>
      )}

      <SearchIcon
        onClick={() => {
          setCliked(!clicked);
          setPanel(false);
          setProfile(false);
          setResultbar(false);
        }}
      />

      {LoggedIn ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.9rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <IoIosNotifications
              onClick={() => {
                setPanel(!panel);
                setProfile(false);
                setCliked(false);
                setResultbar(false)
              }}
              size={30}
              style={{ fill: "rgb(185, 60, 131)", cursor: "pointer" }}
            />
            {count > 0 && <NotificationBadge>{count}</NotificationBadge>}
          </div>

          {panel && (
            <NotificationPanel
              userId={data.id}
              show={panel}
              setUnreadCount={setUnreadCount}
            />
          )}

          <div
            onClick={() => {
              setProfile(!profile);
              setPanel(false);
              setCliked(false);
            }}
            style={{
              width: "50px",
              height: "50px",
              position: "relative",
              cursor: "pointer",
              borderRadius: "50%",
            }}
          >
            <img
              src={data.pic ? data.pic : portfolio}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              alt="Profile"
            />
          </div>

          {profile && (
            <UserProfile
              data={data}
              setData={setData}
              setLoggedIn={setLoggedIn}
            />
          )}
        </div>
      ) : (
        <LoginButton to="/login">
          <CiLogin style={{ fontSize: "20px", strokeWidth: "1.5" }} />
          Sign-In
        </LoginButton>
      )}
    </Div>
  );
};
