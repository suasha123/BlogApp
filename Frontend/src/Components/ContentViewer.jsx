import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

// Global font setup
const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Nunito', sans-serif;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: #f8f8ff;
  display: flex;
  flex-direction: row;
  padding: 2rem;
  gap: 1.8rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const DivOne = styled.div`
  width: 70%;
  max-height: 85vh;
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DivTwo = styled.div`
  width: 27%;
  max-height: 85vh;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostContent = styled.div`
 padding : 10px;
  margin-bottom: 2rem; 
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 1rem;
  padding-right: 0.5rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  resize: vertical;
  margin-top: 1rem;
`;

const CommentButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: linear-gradient(to right, #a855f7, #ec4899);
  color: white;
  border: none;
  border-radius: 0.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const RelatedPost = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f3f3ff;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #e9e9ff;
  }
`;

export const ContentView = ({ postFetch }) => {
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    try {
      const res = await fetch(`/posts/${postFetch}`);
      const data = await res.json();
      if (res.ok) {
        setPost(data.post);
      } else {
        console.log("Error fetching post");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainDiv>
        <DivOne>
          {post && post.title ? (
            <PostContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={`http://localhost:3000/${post.author.profilepic}`}
                  alt="User Profile"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  {post.author.name}
                </p>
              </div>
              <img
                src={`http://localhost:3000/${post.image}`}
                alt="Post Image"
                style={{
                  width: "80%", 
                  height: "auto", 
                  objectFit: "cover",
                  marginBottom: "1rem", 
                }}
              />
              <h2>{post.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </PostContent>
          ) : (
            <p>Loading post...</p>
          )}

          <CommentSection>
            <h3>Comments</h3>
            <CommentList>
              <div>
                <strong>Jane Doe</strong>: Great post!
              </div>
              <div>
                <strong>John Smith</strong>: Thanks for sharing!
              </div>
              {/* Add dynamic comments here later */}
            </CommentList>
            <CommentInput placeholder="Write a comment..." rows="3" />
            <CommentButton>Post Comment</CommentButton>
          </CommentSection>
        </DivOne>

        <DivTwo>
          <h3>Related Posts</h3>
          {[1, 2, 3, 4].map((item) => (
            <RelatedPost key={item}>
              <h4>Related Post {item}</h4>
              <p>Short description of related post...</p>
            </RelatedPost>
          ))}
        </DivTwo>
      </MainDiv>
    </>
  );
};
