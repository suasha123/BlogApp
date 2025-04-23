import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {useNavigate } from "react-router-dom";
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CLoader = styled.div`
  width: 25px;
  height: 25px;
  border: 4px solid rgba(128, 0, 128, 0.2); 
  border-top: 4px solid #6A0DAD; 
  border-radius: 50%;
  animation: ${spin} 1s linear infinite; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Panel = styled.div`
  position: absolute;
  top: 60px;
  right: 15px;
  background-color: #fff;
  color: #333;
  width: 320px;
  min-height: 180px;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 10px;
  padding: 12px;
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.3s ease-in-out;
  font-family: 'Nunito', sans-serif;
  scrollbar-width: thin;
  scrollbar-color: #bbb #eee;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }
`;

const NotificationItem = styled.div`
  background-color: ${({ read }) => (read ? '#f5f5ff' : '#6A0DAD')};
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 1.0rem;
  transition: background 0.4s ease-in;
  cursor: pointer;
  color :  ${({read})=>(read ? 'black' : 'white')};
  &:hover {
    background-color: #e1dcff;
    color : black;

  }

  .timestamp {
    font-size: 0.75rem;
    color: #888;
    margin-top: 4px;
  }
`;

export const NotificationPanel = ({ userId, show  , setUnreadCount}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const setOffNoti = async()=>{
         try{
             await fetch(`/marknotiOff/${userId}`,{
              method : 'PUT',
              headers : {
                'Content-type' : 'application/json'
              },
              body : JSON.stringify({})
             })
         }
         catch(err){
          console.log(err);
         }
  }
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await fetch(`/notifications/user/${userId}`);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications", err);
      } finally {
        setTimeout(()=>{
          setLoading(false);
          setUnreadCount(0);
          setOffNoti();
        },1000);

      }
    };

    fetchNotifs();
  }, [userId]);

  return (
    <Panel show={show}>
      {loading ? (
        <CLoader />
      ) : notifications.length === 0 ? (
        <div style={{ fontSize: "0.9rem", color: "#777" }}>No notifications</div>
      ) : (
        notifications.map((notif, idx) => (
          <NotificationItem onClick={()=>{navigate(`/userprofile/${notif.sender}`)}}  key={idx} read={notif.read}>
            {notif.msg}
          </NotificationItem>
        ))
      )}
    </Panel>
  );
};
