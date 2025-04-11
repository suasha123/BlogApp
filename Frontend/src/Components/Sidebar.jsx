import styles from "./Navbar.module.css";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/Bloglogo.png";
import { useState } from "react";

export const Sidebar = ({ isopen , setopen}) => {
  const categories = [
    "Home",
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

  const [isClosing, setIsClosing] = useState(false);

  const handleCloseClick = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      setopen(false);
      setIsClosing(false);
    }
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isClosing ? styles.fadeOut : styles.fadeIn
        }`}
        onClick={handleCloseClick}
      ></div>

      <div
        className={`${styles.sidebar} ${
          isClosing ? styles.close : styles.open
        }`}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <img src={logo} alt="Logo" />
          <span className={styles.toggle} onClick={handleCloseClick}>
            <IoMdClose className={styles.tt} />
          </span>
        </div>

        <ul>
          {categories.map((category, index) => (
            <li key={index} className={styles.sidebarItem}>
              <a href="#" className={styles.sidebarLink}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
