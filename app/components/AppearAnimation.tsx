import React, { useEffect, useState, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  children: ReactNode;
  type?: 'bounceInRight' | 'appearInBottom';
  duration?: number; // duration in seconds
  delay?: number; // delay in seconds
  className?: string; // additional classes
}

const bounceInRight = keyframes`
  0% {
    -webkit-transform: translateX(600px);
            transform: translateX(600px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateX(68px);
            transform: translateX(68px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateX(32px);
            transform: translateX(32px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateX(8px);
            transform: translateX(8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;

const appearInBottom = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AppearDiv = styled.div<{ duration: number; delay: number; type: 'bounceInRight' | 'appearInBottom' }>`
  ${({ duration, delay, type }) => css`
    animation: ${type === 'appearInBottom' ? appearInBottom : bounceInRight} ${duration}s both ${delay}s;
  `}
`;

function AppearAnimation({ children, type = 'bounceInRight', duration = 1.1, delay = 0, className = '' }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AppearDiv duration={duration} delay={delay} type={type} className={`${isVisible ? 'appear-animation' : ''} ${className}`}>
      {children}
    </AppearDiv>
  );
}

export default AppearAnimation;