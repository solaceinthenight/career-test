// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const handleClick = () => {
    const GITHUB = "https://github.com/solaceinthenight";
    window.location.href = GITHUB;
  };

  return (
    <footer style={{ marginTop: "2rem", textAlign: "center" }}>
      <p>
        Created by <span onClick={handleClick}>solaceinthenight</span>
      </p>
    </footer>
  );
};

export default Footer;
