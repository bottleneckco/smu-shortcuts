import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../contexts/ThemeContext';
import Icon from '../../Icon';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.div`
  height: 48px;
  width: 48px;
  color: ${(props) => props.theme.icon.color};

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.text300}AA;
    transform: scale(1);
  }
`;

interface Props {
  hideNavigation?: () => void;
}

const Settings: React.FC<Props> = (props) => {
  // const { hideNavigation } = props;
  const { theme, toggleTheme } = useDarkMode();

  return (
    <Wrapper>
      <StyledIcon onClick={toggleTheme}>
        <Icon name={theme === 'light' ? 'light_mode' : 'dark_mode'} />
      </StyledIcon>
    </Wrapper>
  );
};

export default Settings;
