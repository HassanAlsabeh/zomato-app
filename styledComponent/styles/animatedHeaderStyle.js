import styled from 'styled-components';
import { Animated, Dimensions, View } from 'react-native';

export const Circle = styled(View)`

    width: ${Dimensions.get("window").height * 0.2};
    height: ${Dimensions.get("window").height * 0.2};
    background: #DF0038;
    border-top-right-radius: 150px;
    position: absolute;
    ${({ left, right, bottom, top }) => {
    switch (true) {
      case left && bottom:
        return `left: ${-Dimensions.get('screen').width * 0.1};
                    bottom: ${-Dimensions.get('screen').width * 0.05}`
      case right && top:
        return `right: ${-Dimensions.get('screen').width * 0.1};
                    top: ${-Dimensions.get('screen').width * 0.05}`

    }
  }
  }}
`;

export const AnimatedView = styled(Animated.View)`

   overflow: hidden;
   z-index:1000;
   ${({ height, width }) => {
    switch (true) {
      case height:
        return `height:${height};`
      case width:
        return `width:${width};`
    }
  }}
   flex: 1; 
   alignItems: center; 
   justifyContent: center; 
   backgroundColor: #fff; 
   position: absolute; 
   top: 0; 
   left: 0;
`;

export const AnimatedText = styled(Animated.Text)`

    position: absolute; 
    fontSize: 20; 
    width: ${Dimensions.get('screen').width * 0.35};
    ${({ center }) => {
    switch (true) {
      case center:
        return `text-align:center;`
        case center:
          return `font-family:center;`
    }
  }}
`;