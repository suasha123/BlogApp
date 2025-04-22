import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Overlayy } from "./Reusuable Component/Overaly";
import { Modal } from "./Reusuable Component/ModalContent";
import { ToastContainer, toast } from 'react-toastify';
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
    console.log(selectedFile);
    setFile(selectedFile);

    if (selectedFile) {
      toast.success("File Selected success");
    }
    else{
      toast.error("File not selected");
    }
  };
  const handleupload = async () => {
    if (!file) {
      toast.error("Please select a file.");
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
        toast.success("Upload successful. Refresh to see updates");
        onClose();
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      toast.error("Error during upload.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file && !bio) {
      toast.warn("Please make changes");
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
    <Overlayy>
     <ToastContainer />
      <Modal>
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
            accept="image/*"
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
      </Modal>
      </Overlayy>
  );
};
