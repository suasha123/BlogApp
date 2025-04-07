import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  min-width : 233px;
  overflow-x: auto;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #b31217, #c8338b, #8e44ad);
  padding: 2rem;
  border-radius: 16px;
  color: white;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-in-out;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #a445b2, #d41872);
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

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

export const EditModal = ({ data, onClose }) => {
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState();
  const handlebio = async()=>{
    try{
      const res = await fetch(`/changebio/update/${data.id}`,{
        method  : "POST",
        headers : {
         "Content-Type" : "application/json",
        },
        body : JSON.stringify({bio})
      })
      const msg = await res.json();
      const body = msg.message;
      if(res.ok){
        window.alert("Bio Changed,Refresh to see updates");
      }
      else{
        window.alert(body);
      }
    }
    catch(err){
      console.log(err);
      window.alert(err);
    }
  }
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      window.alert("Upload Success");
    }
  };
  const handleupload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("bio", bio);

    try {
      const res = await fetch(`/uploadpic/upload-img/${data.id}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Upload successful. Refresh to see updates");
        onClose();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.log(err);
      alert("Error during upload.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file && !bio) {
      window.alert("Please make changes");
      return;
    }
    if (file) {
      handleupload();
    }
    if (bio) {
      handlebio();
    }
  };

  return (
    <Overlay>
      <ModalContent>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <h2 style={{ fontFamily: "Nunito", marginBottom: "10px" }}>
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="fileUpload"
            style={{
              fontFamily: "Nunito",
              width: "100px",
              borderRadius: "5px",
              padding: "4px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              cursor: "pointer",
              backgroundColor: "#a153d2",
            }}
          >
            Choose File
          </label>
          <Input
            style={{ display: "none" }}
            type="file"
            id="fileUpload"
            onChange={handleFile}
          />
          <TextArea
            rows="3"
            placeholder="Update your bio..."
            value={bio}
            style={{
              outline: "none",
            }}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </ModalContent>
    </Overlay>
  );
};
