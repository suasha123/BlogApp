import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import styled from "styled-components";
import { Loader } from "./Reusuable Component/Loader";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LazyReactQuill = lazy(() => import('react-quill'));
const MsgConatiner = styled.div`
  width: 20%;
  height: 40px;
  background-color: white;
  position: fixed;
  top: 30px;
  right: 0px;
  font-family: "Poppins";
  text-align: center;
  padding-top: 8px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: ${({ visible }) =>
    visible ? "translateX(0%)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out;
  @media (max-width: 763px) {
    width: 40%;
  }
  @media (max-width: 450px) {
    width: 55%;
  }
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  background-color: ${({ err }) => (err ? "red" : "green")};
  bottom: 0px;
  border-radius: 5px;
  animation: ${({ visible }) =>
    visible ? "WidthDecrease 2s forwards" : "none"};
  @keyframes WidthDecrease {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
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
  @media (max-width: 362px) {
    width: 90%;
  }
  @media (max-width: 215px) {
    width: 100%;
  }
`;
const Heading = styled.h1`
  font-size: 1.5rem;
`;
const Previeimage = styled.img`
  height: 170px;
  width: 170px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #6a0dad;
  transition: transform 0.3s ease;
  @media (max-width: 362px) {
    height: 100px;
    width: 100px;
  }
`;
export const BlogEditor = ({data , LoggedIn}) => {
  if (!LoggedIn) {
    return <Navigate to="/sign-up" replace />;

}
   const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [filepreview, setFile] = useState(null);
  const [img, setimg] = useState(null);
  const [category, setCategory] = useState(null);
  const [errors, setError] = useState(false);
  const [isVisible, setvisible] = useState(false);
  const [res, setRes] = useState("");
  const handleimage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setimg(file);
    }
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
  const handleSubmit = async() => {
    if (!title || !content || !img || !category) {
      setvisible(true);
      setRes("All Fields are required");
      setError(true);
      return;
    }
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("image", img);
    formdata.append("content", content);
    setTitle("");
    setCategory(null);
    setContent("");
    setFile(null);
    setimg(null);
    try{
      const res = await fetch(`/uploadpic/uploadData/${data.id}`,{
        method : 'POST' ,
        body : formdata,
      })
      const body = await res.json();
      
      if(res.ok){
        setvisible(true);
        setError(false);
        setRes(body.msg);
        setTimeout(()=>{
          navigate('/');
        },1000);
      }
      else{
        setvisible(true);
        setError(true);
        setRes(body.msg);
      }
    }
    catch(err){
      setvisible(true);
      setError(true);
      setRes("Error occured");
    }
  };
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setvisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  return (
    <MainDiv>
      <MsgConatiner visible={isVisible}>
        {res}
        <Line visible={isVisible} err={errors} />
      </MsgConatiner>
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
            value={
              category
                ? categoryOptions.find((option) => option.value === category)
                : null
            }
            onChange={(selectedOption) => setCategory(selectedOption?.value)}
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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ fontSize: "17px", fontWeight: 500 }}>
            Upload Blog Image
          </label>

          {/* Styled Upload Button */}
          <label
            htmlFor="fileupload"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#6a0dad",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              cursor: "pointer",
              width: "max-content",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#7c1fd3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6a0dad")
            }
          >
            Choose Image
          </label>

          {/* Hidden File Input */}
          <input
            type="file"
            onChange={handleimage}
            accept="image/*"
            id="fileupload"
            style={{ display: "none" }}
          />

          {/* Preview Section */}
          {filepreview && (
            <Fragment>
              <label> Preview Uploaded Image </label>
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#f3e8ff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  width: "max-content",
                  position: "relative",
                }}
              >
                <Previeimage
                  src={filepreview}
                  alt="Preview"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </Fragment>
          )}

          <label style={{ fontSize: "17px" }}>Write Your Blog Here</label>
          <Suspense fallback={Loader}>
          <LazyReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your blog content here..."
            theme="snow"
            style={{ marginTop: "7px" }}
          />
          </Suspense>
        </div>
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "purple",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "Nunito",
            width: "160px",
            alignSelf: "center",
          }}
        >
          Submit
        </button>
      </InnerDiv>
    </MainDiv>
  );
};
