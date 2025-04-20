import { useEffect, useState } from "react";
import styled from "styled-components";
import noposts from "../assets/noposts.png";
import { Skeleton } from "@mui/material";
import { Loader } from "./Reusuable Component/Loader";
const ContentCardMain = styled.div`
  font-family: "Nunito", sans-serif;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 13px;

  @media (max-width: 551px) {
    padding: 1rem;
  }
`;

const ContentCardInner = styled.div`
  width: 320px;
  height: 350px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 751px) {
    width: 80%;
  }

  @media (max-width: 551px) {
    width: 90%;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-bottom: 1px solid #eee;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  color: #4c1d95; /* purple-800 */
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardContent = styled.div`
  font-size: 0.95rem;
  color: #444;
`;

const NoPostsContainer = styled.div`
  font-family: "Nunito", sans-serif;
  text-align: center;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  img {
    max-width: 280px;
    width: 100%;
  }

  p {
    font-size: 1rem;
    color: #6b7280;
    margin: 0;
  }
`;

export const ContentCard = ({ finalid , selectedCategory , setSearchParams}) => {
  const whattofetch = finalid ? `/allposts?userid=${finalid}` : selectedCategory==='allposts' ? "/allposts": `/allposts?c=${encodeURIComponent(selectedCategory)}`;
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const fetchAllposts = async () => {
    try {
      const res = await fetch(whattofetch);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log("Error Occurred:", err);
    } 
  };

  useEffect(() => {
    fetchAllposts();
    setLoading(true);
  }, []);
  useEffect(()=>{
    fetchAllposts();
    setLoading(true);
  },[finalid, selectedCategory])
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false) ;
    },3000);
    return ()=>clearTimeout(timer)
  })
  return (
    <>
    {Loading && <Loader />}
      <ContentCardMain>
      {posts.length === 0 && !Loading && (
        <NoPostsContainer>
          <img src={noposts} alt="No posts" />
          <p>No posts found.</p>
        </NoPostsContainer>
      )}
        {posts.map((ele, index) => (
          <ContentCardInner onClick={()=>{setSearchParams({id: ele._id})}}  style={{display : Loading ? "none" : "block"  }} key={index}>
            <CardHeader>
              {ele.author.profilepic ? (
                <ProfilePic
                  src={`http://localhost:3000/${ele.author.profilepic}`}
                  alt="Author"
                />
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )}
              {ele.author.name ? (
                <h3>{ele.author.name}</h3>
              ) : (
                <Skeleton variant="rectangular" width={165} height={25} />
              )}
            </CardHeader>
            {ele.image ? (
              <CardImage
                src={`http://localhost:3000/${ele.image}`}
                alt="Post"
              />
            ) : (
              <Skeleton variant="rectangular" width={100} height={180} />
            )}
            <CardBody>
              {ele.title ? (
                <CardTitle>{ele.title}</CardTitle>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
              )}
              {/* <CardContent dangerouslySetInnerHTML={{ __html: ele.content }} /> */}
            </CardBody>
          </ContentCardInner>
        ))}
      </ContentCardMain>
    </>
  );
};
