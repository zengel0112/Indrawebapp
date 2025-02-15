import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const FireAnimation = ({ size = 48 }) => {
  return (
    <div style={{ 
      width: size, 
      height: size,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible'
    }}>
      <DotLottieReact
        src="https://lottie.host/7aea8e7a-d7ec-4f36-87e7-b12ca25022cd/KXiXfLF5ll.lottie"
        loop
        autoplay
        style={{ 
          width: '200%',
          height: '200%',
          position: 'absolute',
          top: '45%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex:-10
        }}
      />
    </div>
  );
};

export default FireAnimation;