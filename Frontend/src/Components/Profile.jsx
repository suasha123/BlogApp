import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import portfolio from "../assets/portfolio.png";
import { EditModal } from "./Edit";
import { ContentCard } from "./ContentCards";
import { AppFooter } from "./Footer";
import { Skeleton } from "@mui/material";
import { Loader } from "./Reusuable Component/Loader";
import { Followwee } from "./Followers-ingdata";
import styled, { keyframes } from "styled-components";
const mulShdSpin = keyframes`
  0%, 100% {
    box-shadow: 0 -3em 0 0.2em, 
      2em -2em 0 0em, 3em 0 0 -1em, 
      2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 
      3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 
      2em -2em 0 0, 3em 0 0 0.2em, 
      2em 2em 0 0, 0 3em 0 -1em, 
      -2em 2em 0 -1em, -3em 0 0 -1em, 
      -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
      3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, 
      -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
      3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, 
      -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
      3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, 
      -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 
      3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 
      3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
      -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
`;

const StyledLoader = styled.div`
  color: #fff;
  font-size: 5px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation: ${mulShdSpin} 1.3s infinite linear;
`;

const PageWrapper = styled.div`
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserDetailsinnerDiv = styled.div`
  display: flex;
  font-family: "Nunito", sans-serif;
  padding-left: 30px;
  flex-direction: row;
  gap: 10px;
  background-color: #f8f8ff;

  @media (max-width: 1117px) {
    padding-left: 10px;
  }

  @media (max-width: 868px) {
    flex-wrap: wrap;
  }
`;

const Imagediv = styled.div`
  height: 180px;
  width: 180px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  top: -30px;

  @media (max-width: 1097px) {
    height: 150px;
    width: 150px;
  }

  @media (max-width: 868px) {
    left: 40%;
    height: 100px;
    width: 100px;
  }

  @media (max-width: 400px) {
    left: 35%;
  }
`;

const Image = styled.img`
  border-radius: 50%;
  border: 4px solid #a153d2;
  object-fit: cover;
  width: 90%;
  height: 90%;
`;

const UserInnerDetails = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: row;
  gap: 250px;
  position: relative;

  @media (max-width: 1300px) {
    gap: 100px;
  }

  @media (max-width: 1117px) {
    padding: 15px;
  }

  @media (max-width: 968px) {
    gap: 20px;
  }

  @media (max-width: 868px) {
    width: 100%;
    justify-content: space-between;
    top: -40px;
  }

  @media (max-width: 531px) {
    flex-wrap: wrap;
    gap: 5px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;

  @media (max-width: 531px) {
    width: 100%;
  }
`;

const UserPostAndFolloq = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  gap: 120px;

  @media (max-width: 1018px) {
    gap: 70px;
    justify-content: space-evenly;
    padding-left: 30px;
  }

  @media (max-width: 868px) {
    gap: 30px;
  }

  @media (max-width: 627px) {
    padding-left: 0px;
  }

  @media (max-width: 531px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const MainContent = styled.div`
  min-height: 414px;
  flex: 1;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 627px) {
    font-size: 18px;
  }
`;

const Description = styled.div`
  color: #555;
  margin-bottom: 3px;
`;

const Type = styled.div`
  font-size: 16px;

  @media (max-width: 627px) {
    font-size: 13px;
  }
`;

const Number = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const EditPofile = styled.button`
  position: absolute;
  top: 20px;
  right: 15px;
  width: 120px;
  height: 50px;
  border-radius: 8px;
  outline: none;
  border: none;
  color: white;
  font-family: Nunito;
  font-size: 16px;
  background-color: #a153d2;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: background-color 0.5s ease-in;
  cursor: pointer;

  &:hover {
    background-color: #c94b82;
  }
`;

export const ProfileInfo = ({LoggedIn, data}) => {
  if (!LoggedIn) {
    return <Navigate to="/sign-up" replace />;
  }

  const { id } = useParams();
  if(data.id===id){
    return <Navigate to="/userprofile" replace />;
  }
  const finalid = id || data.id;
  const [openModal, setOpenModal] = useState(false);
  const [profiledata, setProfiledata] = useState({});
  const [followingState, setFollowingState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openlist, setopenlist] = useState(false);
  const [whattoFetch, setWhattoFetch] = useState("");
  const [miniloading, setMiniloading] = useState(false);
  const handletoggle = async () => {
    setMiniloading(true);
    const newstate = !followingState;
    try {
      const res = await fetch(
        `/updatefollower/?followerid=${data.id}&followeeId=${finalid}&update=${
          newstate ? 1 : -1
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        fetchUserProfile();
        setFollowingState(newstate);
      }
      if (!res.ok) console.log("follower not updated");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (miniloading) {
      setMiniloading(false);
    }
  }, [followingState]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`/userprofile/info/${finalid}`);
      const result = await res.json();
      if (res.ok) {
        setProfiledata({
          ...result.userinfo,
          followersCount: result.followerslength,
          followingCount: result.followinglength,
        });
      } else {
        navigate("*", { replace: true });
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  const getfollowingStatus = async () => {
    try {
      const res = await fetch(
        `/getfollowingstatus/?followerid=${data.id}&followeeId=${finalid}`
      );
      const result = await res.json();
      if (res.ok) {
        setFollowingState(result.isFollowing);
      } else {
        console.log(result.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true); // reset loading
    fetchUserProfile();
    if (id) getfollowingStatus();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [finalid]);

  return (
    <>
      {loading && <Loader />}
      <PageWrapper style={{ display: loading ? "none" : "flex" }}>
        {openModal && !id && (
          <EditModal data={data} onClose={() => setOpenModal(false)} />
        )}
        {!id && (
          <EditPofile onClick={() => setOpenModal(true)}>
            Edit Profile
          </EditPofile>
        )}
        {openlist && (
          <Followwee
            onClose={() => setopenlist(false)}
            whattoFetch={whattoFetch}
            finalid={finalid}
          />
        )}
        {/* Header Background */}
        <div
          style={{
            height: "100px",
            width: "100%",
            background:
              "linear-gradient(to right, #8e2a42, #a13684, #b93c83, #c94b82, #a153d2)",
          }}
        ></div>

        <ContentWrapper>
          <UserDetailsinnerDiv>
            <Imagediv>
              {profiledata.profilepic ? (
                <Image
                  src={
                    profiledata.profilepic
                      ? `http://localhost:3000/${profiledata.profilepic}`
                      : portfolio
                  }
                />
              ) : (
                <Skeleton variant="circular" width={70} height={70} />
              )}
            </Imagediv>

            <UserInnerDetails>
              <UserInfo>
                <Name>
                  {profiledata.name ? (
                    profiledata.name
                  ) : (
                    <Skeleton variant="rectangular" width={210} height={60} />
                  )}
                </Name>
                <Description>
                  {profiledata.bio ? (
                    profiledata.bio
                  ) : (
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  )}
                </Description>
                <div>
                  <span style={{ color: "#8787ed" }}>Joined : </span>10/02/2005
                </div>
                {id && (
                  <button
                    onClick={() => handletoggle()}
                    style={{
                      width: "120px",
                      height: "30px",
                      backgroundColor: followingState ? "#a153d2" : "#a13684",
                      cursor: "pointer",
                      transition: "all 0.5s ease",
                      color: "white",
                      fontFamily: "Nunito",
                      borderRadius: "5px",
                      border: "none",
                      marginTop: "9px",
                      fontSize: "16px",
                    }}
                  >
                    {!miniloading && followingState ? "Unfollow" : "Follow"}
                    {miniloading && <miniloading />}
                  </button>
                )}
              </UserInfo>

              <UserPostAndFolloq>
                {profiledata.followersCount ||
                profiledata.followersCount === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setopenlist(true);
                      setWhattoFetch("followers");
                    }}
                  >
                    <Type>Followers</Type>
                    <Number>{profiledata.followersCount}</Number>
                  </div>
                ) : (
                  <Skeleton variant="rectangular" width={80} height={50} />
                )}

                {profiledata.followingCount ||
                profiledata.followingCount === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setopenlist(true);
                      setWhattoFetch("following");
                    }}
                  >
                    <Type>Following</Type>
                    <Number>{profiledata.followingCount}</Number>
                  </div>
                ) : (
                  <Skeleton variant="rectangular" width={80} height={50} />
                )}

                {profiledata.postCount || profiledata.postCount === 0 ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Type>Posts</Type>
                    <Number>{profiledata.postCount}</Number>
                  </div>
                ) : (
                  <Skeleton variant="rectangular" width={80} height={50} />
                )}
              </UserPostAndFolloq>
            </UserInnerDetails>
          </UserDetailsinnerDiv>
          <div
            style={{
              display: "inline-block",
              fontFamily: "Nunito, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
              background: "linear-gradient(to right, #a153d2, #c94b82)",
              padding: "8px 20px",
              borderRadius: "25px",
              margin: "10px 30px 10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              alignSelf: "center",
            }}
          >
            Posts
          </div>
          <ContentCard finalid={finalid} />
        </ContentWrapper>

        <AppFooter />
      </PageWrapper>
    </>
  );
};
