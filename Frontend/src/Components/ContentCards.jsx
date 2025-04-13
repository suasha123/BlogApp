import { useEffect, useState } from "react";
import styled from "styled-components";

const ContentCardMain = styled.div`
  font-family : 'Nunito';
  width: 100%;
  padding: 2rem;
  background-color: #f8f8ff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  @media(max-width: 551px){
    padding: 1rem;
  }

`;

const ContentCardInner = styled.div`
  width: 320px;
  height : 350px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor : pointer;
  &:hover {
    transform: translateY(-5px);
  }
  @media(max-width: 751px){
   width : 80%;
  }
  @media(max-width: 551px){
   width : 90%;
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

export const ContentCard = () => {
  const [posts, setPosts] = useState([]);

  const fetchAllposts = async () => {
    try {
      const res = await fetch("/allposts");
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
  }, []);

  return (
    <ContentCardMain>
      {posts.map((ele, index) => (
        <ContentCardInner key={index}>
          <CardHeader>
            <ProfilePic
              src={`http://localhost:3000/${ele.author.profilepic}`}
              alt="Author"
            />
            <h3>{ele.author.name}</h3>
          </CardHeader>
          <CardImage
            src={`http://localhost:3000/${ele.image}`}
            alt="Post"
          />
          <CardBody>
            <CardTitle>{ele.title}</CardTitle>
            {/*<CardContent
              dangerouslySetInnerHTML={{ __html: ele.content }}
            />*/}
          </CardBody>
        </ContentCardInner>
      ))}
    </ContentCardMain>
  );
};
