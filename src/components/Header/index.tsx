import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  h1 {
    font-size: 1.75em;
    margin: 0;
  }
`;

interface Props {
  title: string;
  showSearch?: boolean;
}

const Header: React.FC<Props> = (props) => {
  const { title, showSearch = false } = props;

  return (
    <Wrapper>
      <h1>{title}</h1>
    </Wrapper>
  );
};

export default Header;
