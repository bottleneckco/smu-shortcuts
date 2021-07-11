import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

const Wrapper = styled.header`
  width: 100%;
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  color: ${(props) => props.theme.text900};

  h1 {
    font-size: 1.75em;
    margin: 0;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    height: 56px;
  }
`;

const MenuWrapper = styled.button`
  border: none;
  background-color: unset;
  text-align: center;
  display: flex;
  margin-top: 6px;
  margin-right: 16px;
  padding: 0;
  display: none;
  color: ${(props) => props.theme.text900};

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    display: unset;
  }
`;

interface Props {
  title: string;
  showSearch?: boolean;
  showNavigation?: () => void;
}

const Header: React.FC<Props> = (props) => {
  const { title, showSearch = false, showNavigation } = props;

  return (
    <Wrapper>
      <div className="title">
        <MenuWrapper onClick={showNavigation}>
          <Icon name="menu" />
        </MenuWrapper>
        <h1>{title}</h1>
      </div>
    </Wrapper>
  );
};

export default Header;
