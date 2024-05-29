import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Added.css'; // Import your CSS styles for the component

const Added = () => {
  const [showText, setShowText] = useState(true);

  const textAnimation = useSpring({
    opacity: showText ? 1 : 0,
    transform: showText ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 1000 },
  });

  // Function to hide the text after a delay
  const hideText = () => {
    setShowText(false);
  };

  // Reset the text after a delay
  setTimeout(() => {
    setShowText(true);
  }, 3000);

  return (
    <div className="added-container">
      <animated.div style={textAnimation} className="added-text">
        Product added successfully
      </animated.div>
    </div>
  );
};

export default Added;
