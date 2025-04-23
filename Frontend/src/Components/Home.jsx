import styled from "styled-components";
import { useEffect, useState } from "react";
import { TopNav } from "./TopNavbar";
import { Sidebar } from "./Sidebar";
import { CreateBlog } from "./CreateButton";
import { ContentCard } from "./ContentCards";
import { AppFooter } from "./Footer";
import { useSearchParams } from "react-router-dom";
import { NavTopBar } from "./NavBar";
import { ContentView } from "./ContentViewer";
const Home = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  background-color: #f8f8ff;
`;

export const HomePage = ({
  LoggedIn,
  data,
  setbuttonclicked,
  buttonclicked,
  setData,
  setLoggedIn,
}) => {
  const [isVisible, setvisible] = useState(false);
  const [isopen, setopen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showcontent , setshowcontent] = useState(false);
  const [postFetch , setPostfetch] = useState("");
  
  const [isSerachVisible, setSearchVisible] = useState(
    window.innerWidth >= 547
  );
  const handleSetCategory = (category) => {
    if (!category || category === "allposts") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  const selectedCategory = searchParams.get("category") || "allposts";
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

  useEffect(() => {
    const postId = searchParams.get('id');
    if (postId) {
      setPostfetch(postId);
      setshowcontent(true);
    } else {
      setshowcontent(false);
    }
  }, [searchParams]);

  return (
    <>
      <Home>
        <NavTopBar
          LoggedIn={LoggedIn}
          data={data}
          setbuttonclicked={setbuttonclicked}
          buttonclicked={buttonclicked}
          setData={setData}
          setLoggedIn={setLoggedIn}
          setopen={setopen}
          isSerachVisible={isSerachVisible}
        />
        {isSerachVisible && (
          <TopNav
            handleCategory={handleSetCategory}
            selectedCategory={selectedCategory}
          />
        )}
        <MainContent>
        {!showcontent && ( <ContentCard selectedCategory={selectedCategory} setSearchParams={setSearchParams}/>) }
        {showcontent && (<ContentView setSearchParams={setSearchParams}  postFetch={postFetch} LoggedIn={LoggedIn} curruserid={data.id}/>)}
    
        </MainContent>
        <AppFooter />
      </Home>

      {!isSerachVisible && isopen && (
        <Sidebar setopen={setopen} isopen={isopen} />
      )}
      {LoggedIn && <CreateBlog />}
    </>
  );
};
