import { Overlayy } from "./Reusuable Component/Overaly";
import { Modal } from "./Reusuable Component/ModalContent";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.3rem;
  color: white;
  cursor: pointer;
`;

const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #ffffff33;
`;

const Username = styled.div`
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  color: #fff;
`;

export const Followwee = ({ onClose, whattoFetch, finalid }) => {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const fetchlists = async () => {
    try {
      const res = await fetch(`/lists?data=${whattoFetch}&userid=${finalid}`);
      const data = await res.json();
      if (res.ok) {
        setLists(data.final);
        console.log(data.final);
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchlists();
  }, []);

  return (
    <Overlayy>
      <Modal>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <h2
          style={{ fontFamily: "Nunito", marginBottom: "15px", color: "#fff" }}
        >
          {whattoFetch}
        </h2>
        {lists.length > 0 ? (
          lists.map((user, idx) => (
            <UserCard
              key={idx}
              onClick={() => {
                navigate(`/userprofile/${user._id}`);
                onClose();
              }}
            >
              <Avatar
                src={`http://localhost:3000/${user.profilepic}`}
                alt={user.name || "User"}
              />
              <Username>{user.name || "Unnamed User"}</Username>
            </UserCard>
          ))
        ) : (
          <p style={{ fontFamily: "Nunito", opacity: 0.8 }}>No users found.</p>
        )}
      </Modal>
    </Overlayy>
  );
};
