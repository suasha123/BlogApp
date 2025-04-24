import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  @media (max-width: 425px) {
    flex-direction: column;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const DivOne = styled.div`
  width: 70%;
  max-height: 85vh;
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow-y: scroll;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 425px) {
    padding: 1rem;
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
  padding: 10px;
  margin-bottom: 2rem;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 5px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  p {
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 425px) {
    gap: 0.5rem;

    p {
      font-size: 1rem;
    }
  }
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #555;

  @media (max-width: 425px) {
    font-size: 0.9rem;
    gap: 0.4rem;
  }
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
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  margin-bottom: 1rem;
  padding: 0.6rem;
  border-radius: 0.6rem;
  background-color: #f3f3ff;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #e5e5ff;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.5rem;
    flex-shrink: 0;
  }

  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: #5b21b6;
    word-break: break-word;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const CLoader = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(128, 0, 128, 0.2);
  border-top: 4px solid #6a0dad;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  transform: translate(-50%, -50%);
`;
export const ContentView = ({
  postFetch,
  setSearchParams,
  LoggedIn,
  curruserid,
}) => {
  const [post, setPost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLike = async () => {
    try {
      const newstate = !like;
      const res = await fetch(
        `/postlike/?user=${curruserid}&postId=${postFetch}&like=${
          newstate ? 1 : -1
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const body = await res.json();
      if (res.ok) {
        fetchPost();
        toast.success(body.message);
        setLike(newstate);
      } else {
        toast.error(body.message);
        setLike(!newstate);
      }
    } catch (err) {
      setLike(!newstate);
      toast.error(body.message);
    }
  };
  const postComment = async () => {
    try {
      const res = await fetch("/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postFetch,
          curruserid,
          comment,
        }),
      });
      const body = await res.json();
      if (res.ok) {
        toast.success("Comment Posted");
        fetchPost();
        setComment("");
      } else {
        toast.error("Unable to post Comment");
        setComment("");
      }
    } catch (err) {
      toast.error("Error Occured");
      setComment("");
    } 
  };
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

  const fetchmore = async (userid) => {
    try {
      const res = await fetch(`/p/${userid}`);
      const data = await res.json();
      if (res.ok) {
        const filtered = data.posts.filter((p) => p._id !== post._id);
        setRelatedPosts(filtered);
      } else {
        console.log("Error fetching user's other posts");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlelikestatus = (post) => {
    if (post.likes.includes(curruserid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  useEffect(() => {
    fetchPost();
  }, [postFetch]);

  useEffect(() => {
    let timer;

    if (post) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    if (post?.author?._id) {
      fetchmore(post.author._id);
    }

    if (post?.likes) {
      handlelikestatus(post);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [post]);

  return (
    <>
    <ToastContainer />
      <GlobalStyle />
      <MainDiv>
        <DivOne>
          {loading && (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CLoader />
            </div>
          )}
          <div style={{ display: loading ? "none" : "block" }}>
            <PostContent>
              <PostHeader>
                {post?.author && (
                  <AuthorInfo onClick={()=> navigate(`/userprofile/${post.author._id}`)}>
                    <img
                      src={post.author.profilepic}
                      alt="User Profile"
                    />
                    <p>{post.author.name}</p>{" "}
                  </AuthorInfo>
                )}
                {post?.likes && (
                  <LikeSection>
                    {like ? (
                      <FaThumbsUp
                        onClick={handleLike}
                        size={20}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    ) : (
                      <BiLike
                        onClick={handleLike}
                        size={20}
                        style={{ color: "#555", cursor: "pointer" }}
                      />
                    )}
                    <span>{post?.likes ? post.likes.length : ""}</span>
                  </LikeSection>
                )}
              </PostHeader>
              {post?.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    margin: "1rem 0",
                    borderRadius: "0.8rem",
                  }}
                />
              )}
              {post?.title && <h2 style={{ color: "purple" }}>{post.title}</h2>}
              {post?.content && (
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
              )}
            </PostContent>
            <CommentSection>
              <div
                style={{ display: "flex", gap: "6px", alignItems: "center" }}
              >
                <FaComment style={{ color: "#a153d2" }} />
                <h3 style={{ margin: 0 }}>Comments</h3>
              </div>
              <CommentList>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((c) => (
                    <div
                      key={c._id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.7rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <img
                        src={
                          c.author?.profilepic || "uploads/default.png"
                        }
                        alt="User"
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p style={{ margin: "0", fontWeight: "600" }}>
                          {c.author?.name || "Unknown"}
                        </p>
                        <p style={{ margin: "2px 0", lineHeight: "1.4" }}>
                          {c.comment}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </CommentList>

              {LoggedIn && (
                <div>
                  <CommentInput
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    placeholder="Write a comment..."
                    rows="2"
                    value={comment}
                  />
                  <CommentButton
                    onClick={() => {
                      postComment();
                    }}
                  >
                    Post Comment
                  </CommentButton>
                </div>
              )}
            </CommentSection>
          </div>
        </DivOne>

        <DivTwo>
          <h3>Related Posts</h3>
          {relatedPosts.length > 0 ? (
            relatedPosts.map((item) => (
              <RelatedPost
                key={item._id}
                onClick={() => {
                  setSearchParams({ id: item._id });
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="Related"
                  />
                )}
                <h4>{item.title}</h4>
              </RelatedPost>
            ))
          ) : (
            <p>No related posts found.</p>
          )}
        </DivTwo>
      </MainDiv>
    </>
  );
};
