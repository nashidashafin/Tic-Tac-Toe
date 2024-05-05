import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useSpring,animated } from 'react-spring'


function ConfettiAnimation({play}) {

    const [animationComplete, setAnimationComplete] = useState(false);

    const animationProps = useSpring({
        from: { opacity: 0, translateY: -100 },
        to: { opacity: 1, translateY: 0 },
        config: { tension: 200, friction: 10 },
        delay: 500, // Delay animation to start after 500ms
        immediate: !play, // Only start animation when play is true
      });

     // Reset animation when play prop changes
  useEffect(() => {
    if (play) {
      // Start animation
      setAnimationComplete(false);
      // Stop animation after 5 seconds
      const timeout = setTimeout(() => {
        setAnimationComplete(true);
      }, 4000);
      // return () => clearTimeout(timeout);
    } else {
      // Stop animation immediately when play is false
      setAnimationComplete(true);
    }
  }, [play]);

  return (
    <div>
      <animated.div style={animationProps}>
      {play && !animationComplete && <Confetti />}
    </animated.div>
    </div>
  )
}

export default ConfettiAnimation
