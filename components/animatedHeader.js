
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { AnimatedView } from '../styledComponent/styles/animatedHeaderStyle';

const AnimatedHeader = ({ header, headerMainHeight, headerCollapsedHeight, children }) => {
  let { width } = useWindowDimensions();

  const collapsed = header.interpolate({
    inputRange: [0, headerMainHeight - headerCollapsedHeight],
    outputRange: [headerMainHeight, headerCollapsedHeight],
    extrapolate: 'clamp'
  });


  return (
    <AnimatedView
      width={width}
      height={collapsed}
    >
      {children}
    </AnimatedView>
  );
}

export default AnimatedHeader;
