import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 22px;
`;

const Card: React.FC = (props) => {
  const { children } = props;
  return <Wrapper>{children}</Wrapper>;
};

export default Card;
