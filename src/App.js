import React, { useState, useEffect, useRef } from "react";
import gifImage from "./gif.gif"; 

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const newX = event.clientX;
      const newY = event.clientY;
      setPosition({ x: newX, y: newY });

      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = newX - centerX;
      const deltaY = newY - centerY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotation(angle);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={logoRef}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transition: "all 3s ease",
        // transform: rotate(${rotation}deg),
      }}
    >
      <img
        src={gifImage}
        style={{
          height: 40,
          width: 40,
          animationDuration: "150s",
          // transform: rotate(${rotation}deg),
        }}
        alt="Moving GIF"
      />
    </div>
  );
};

export default App;