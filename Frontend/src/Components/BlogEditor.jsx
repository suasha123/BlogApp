import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NavBar } from "./NavBar";
import Select from "react-select";
import styled from "styled-components";
const MainDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffaf0;
`;
const InnerDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  height: max-content;
  font-family: "Nunito";
  width: 70%;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const Heading = styled.h1`
  font-size: 1.5rem;
`;

export const BlogEditor = () => {
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      ["link", "image"]
    ]
  };
  const categoryOptions = [
    { value: "Business", label: "Business" },
    { value: "Education & Career", label: "Education & Career" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Fashion and Beauty", label: "Fashion and Beauty" },
    { value: "Food & Drinks", label: "Food & Drinks" },
    { value: "Humanities & Law", label: "Humanities & Law" },
    { value: "News & Politics", label: "News & Politics" },
    { value: "Technology", label: "Technology" },
    { value: "Sports", label: "Sports" },
  ];
  const handleSubmit = () => {
    console.log("Submitted Content:", content);
  };

  return (
    <MainDiv>
      {/*

      <button 
        onClick={handleSubmit} 
        style={{
          marginTop: 20,
          padding: '10px 20px',
          background: 'purple',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        Submit
      </button>*/}
      <InnerDiv>
        <Heading>Create Blog</Heading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{ fontSize: "17px", marginBottom: "7px" }}
            htmlFor="category"
          >
            Category
          </label>
          <Select
            id="category"
            options={categoryOptions}
            placeholder="Select a category"
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor:
                  state.isFocused || state.menuIsOpen ? "#6200ea" : "#ccc",
                boxShadow: state.isFocused ? "0 0 0 1px #6200ea" : "none",
                "&:hover": {
                  borderColor: "none",
                },
              }),
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            style={{ fontSize: "17px", marginBottom: "7px" }}
            htmlFor="category"
          >
            Title
          </label>
          <input
            style={{
              border: "2px solid #ccc",
              borderRadius: "4px",
              fontFamily: "Nunito",
              padding: "7px",
              outline: "none",
              fontSize: "15px",
            }}
            placeholder="Enter Title here"
          />
        </div>
        <div>
        <label style={{fontSize : "17px"}}>Write Your Blog Here</label>
        <ReactQuill 
        value={content} 
        onChange={setContent} 
        placeholder="Write your blog content here..."
        theme="snow"
        style={{ marginTop: "7px" }}
        
      />
        </div>
      </InnerDiv>
    </MainDiv>
  );
};
