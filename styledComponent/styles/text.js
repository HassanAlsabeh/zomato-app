import React from 'react';
import styled from 'styled-components/native';

const SM = '3px';
const MD = '6px';
const LG = '10px';

const TextStyle = styled.Text`

  width: 100%;
  font-size: ${props => props.fontSize};
  color:${props => props.textColor};
  font-weight:${props => props.fontWeight};
    ${props => {
    if (props.bgColor) {
      return `background: ${props.bgColor};`
    }
  }}
  ${({ pdSM, pdMD, pdLG, pdSMLeft, pdMDLeft, pdLGLeft }) => {
    console
    switch (true) {
      case pdSM:
        return `padding: ${SM};`
      case pdMD:
        return `padding:${MD};`
      case pdLG:
        return `padding:${LG};`
      case pdSMLeft:
        return `padding-left: ${SM};`
      case pdMDLeft:
        return `padding-left:${MD};`
      case pdLGLeft:
        return `padding-left:${LG};`
    }

  }}

  ${({ pdSMBottom, pdMDBottom, pdLGBottom }) => {
    switch (true) {
      case pdSMBottom:
        return `padding-bottom:${SM};`
      case pdMDBottom:
        return `padding-bottom:${MD};`
      case pdLGBottom:
        return `padding-bottom:${LG};`
    }
  }}

`;

const Text = ({ pdSMBottom, pdMDBottom, pdLGBottom, pdSMLeft, pdMDLeft, pdLGLeft, pdSM, pdMD, pdLG, text, bgColor, textColor, fontSize, fontWeight }) => {
  return (
    <TextStyle
      pdSM={pdSM}
      pdMD={pdMD}
      pdLG={pdLG}
      pdSMLeft={pdSMLeft}
      pdMDLeft={pdMDLeft}
      pdLGLeft={pdLGLeft}
      pdSMBottom={pdSMBottom}
      pdMDBottom={pdMDBottom}
      pdLGBottom={pdLGBottom}
      bgColor={bgColor}
      fontWeight={fontWeight}
      textColor={textColor}
      fontSize={fontSize}
    >
      {text}
    </TextStyle>
  );
}

export default Text;