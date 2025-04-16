import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import portfolio from "../assets/portfolio.png";
import styled from "styled-components";
import { EditModal } from "./Edit";
import { ContentCard } from "./ContentCards";
import { AppFooter } from "./Footer";
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  flexdirection: row;
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

export const ProfileInfo = ({ LoggedIn, data }) => {
  const { id } = useParams();
  const finalid = id || data.id;
  const [openModal, setOpenModal] = useState(false);
  const [profiledata, setProfiledata] = useState({});
  
  const [followingState, setFollowingState] = useState(false);
  const handletoggle = async()=>{
     const newstate = !followingState;
     setFollowingState(newstate);
     try{
      const res = await fetch(`/updatefollower/?followerid=${data.id}&followeeId=${finalid}&update=${newstate ? 1 : -1}`,
        {
         method : 'PUT',
         headers: {
         "Content-Type": "application/json",
       },
        }
      );
      if(res.ok){
        console.log("follower updated")
      }
      else{
        console.log("follower not updated");
      }
     }
     catch(err){
      setFollowingState(!newstate);
     }
  }
 
  if (!LoggedIn) {
    return <Navigate to="/sign-up" replace />;
  }
  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`/userprofile/info/${finalid}`);
      const result = await res.json();
      if (res.ok) {
        setProfiledata({
          ...result.userinfo,
          followersCount: result.followerslength,
          followingCount: result.followinglength
        });
        
      } else {
        console.log("Failed to fetch profile:", result.msg);
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, [finalid]);

  return (
    <PageWrapper>
    {openModal && !id && (
      <EditModal data={data} onClose={() => setOpenModal(false)} />
    )}
  
    {!id && (
      <EditPofile onClick={() => setOpenModal(true)}>Edit Profile</EditPofile>
    )}
  
    {/* Header Background */}
    <div
      style={{
        height: "120px",
        width: "100%",
        background:
          "linear-gradient(to right, #8e2a42, #a13684, #b93c83, #c94b82, #a153d2)",
      }}
    ></div>
  
    {/* Profile Section */}
    <UserDetailsinnerDiv>
      <Imagediv>
        <Image
          src={
            profiledata.profilepic
              ? `http://localhost:3000/${profiledata.profilepic}`
              : portfolio
          }
        />
      </Imagediv>
      <UserInnerDetails>
        <UserInfo>
          <Name>{profiledata.name || "Surya Pratap Singh DHiwara "}</Name>
          <Description>{profiledata.bio}</Description>
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
              {followingState ? "Unfollow" : "Follow"}
            </button>
          )}
        </UserInfo>
  
        <UserPostAndFolloq>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Type>Followers</Type>
            <Number>{profiledata.followersCount}</Number>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Type>Following</Type>
            <Number>{profiledata.followingCount}</Number>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Type>Posts</Type>
            <Number>{profiledata.postCount}</Number>
          </div>
        </UserPostAndFolloq>
      </UserInnerDetails>
    </UserDetailsinnerDiv>
  
    {/* Middle content that grows */}
    <MainContent style={{backgroundColor : " #f8f8ff"}}>
      <ContentCard finalid={data.id} />
    </MainContent>
  
    {/* Sticky footer */}
    <AppFooter />
  </PageWrapper>
  
  );
};
