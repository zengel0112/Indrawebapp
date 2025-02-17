import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const FireAnimation = ({ size = 48, streak = 0 }) => {
  // Get appropriate animation based on streak count
  const getFireAnimation = (streak) => {
    if (streak >= 10 && streak < 20) {
      // Blue fire animation for 10-19 streak
      return "https://lottie.host/18b68157-2f48-4967-a5a3-82aaa16f7413/UMdjR7ug0K.lottie";
    } else if (streak >= 20) {
      // Special fire animation for 20+ streak
      return "https://lottie.host/8310985e-eefb-4f4f-8922-8411821ba5e0/dECEcfOpae.lottie"; // You can add different animation for 20+
    } else {
      // Default orange fire animation for 0-9 streak
      return "https://lottie.host/7aea8e7a-d7ec-4f36-87e7-b12ca25022cd/KXiXfLF5ll.lottie";
    }
  };

  return (
    <div style={{ 
      width: size, 
      height: size,
      position: 'relative'
    }}>
      <DotLottieReact
        src={getFireAnimation(streak)}
        loop
        autoplay
      />
    </div>
  );
};

export default FireAnimation;

