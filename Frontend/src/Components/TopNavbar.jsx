import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { useRef, useState, useEffect } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
`;

const MainDiv = styled.div`
  padding: 10px 20px;
  background-color: #6a0dad;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  gap: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.a`
  text-decoration: none;
  background-color: #7c20e0;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  white-space: nowrap;
  font-size: 0.8rem;
  padding: 0px 10px;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    background-color: white;
    color: #7c20e0;
  }
`;

const HomeButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: white;
  color: #6a0dad;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  text-decoration: none;

  &:hover {
    background-color: #eaeaea;
  }
`;

const FadeLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to right, #6a0dad, transparent);
  pointer-events: none;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const FadeRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to left, #6a0dad, transparent);
  pointer-events: none;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ArrowLeft = styled(IoIosArrowDropleftCircle)`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 24px;
  z-index: 2;
  cursor: pointer;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ArrowRight = styled(IoIosArrowDroprightCircle)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 24px;
  z-index: 2;
  cursor: pointer;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const TopNav = () => {
  const scrollRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    setShowLeft(scrollEl.scrollLeft > 10);
    setShowRight(scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 10);
  };

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  let items = [
    "Business",
    "Education & Career",
    "Entertainment",
    "Fashion and Beauty",
    "Food & Drinks",
    "Humanities & Law",
    "News & Politics",
    "Technology",
    "Sports",
  ];

  return (
    <Wrapper>
      <ArrowLeft onClick={() => scroll(-200)} show={showLeft} />
      <ArrowRight onClick={() => scroll(200)} show={showRight} />
      <FadeLeft show={showLeft} />
      <FadeRight show={showRight} />
      <MainDiv ref={scrollRef}>
        <HomeButton href="#">
          <IoHomeOutline size={18} />
          Home
        </HomeButton>
        {items.map((item, index) => (
          <Item href="#" key={index}>
            {item}
          </Item>
        ))}
      </MainDiv>
    </Wrapper>
  );
};
