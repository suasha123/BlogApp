import { useEffect, useState } from "react";
import styled from "styled-components"

const ContentCardMain = styled.div`
     width : 100%;
     height : max-content;
     background-color : yellow;
     display : flex;
     justify-content : center;
     gap : 30px;
     padding : 2rem;
     flex-wrap:wrap;
`;

const ContentCardInner = styled.div`
  height : 300px;
  min-width : 300px;

  background-color : blue;
   
`;

export const ContentCard = ()=>{

  const fetchAllposts = async()=>{
         try{
          const res = await fetch('/allposts');
          const data = await res.json();
          if(res.ok){
            console.log(data.msg);
          }
          else{
            console.log(data.msg);
          }
         }
         catch(err){
          console.log("Error Occurred:", err);
         }

  }

  useEffect(()=>{
      fetchAllposts();
  },[])
  return(
    <ContentCardMain>
    <ContentCardInner>

    </ContentCardInner>
    <ContentCardInner>

</ContentCardInner>
   <ContentCardInner>

</ContentCardInner>
   <ContentCardInner>

</ContentCardInner>
   <ContentCardInner>

</ContentCardInner>
    </ContentCardMain>

  )
}