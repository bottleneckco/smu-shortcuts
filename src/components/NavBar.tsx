import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

const NavBarContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  letter-spacing: 1.2px;
  display: flex;

  @media screen and (max-width: 720px) {
    justify-content: center;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  color: #2b2b2b;
  padding-right: 24px;

  :hover {
    text-decoration: underline solid;
    text-decoration-thickness: 3px;
    text-decoration-color: rgba(43, 43, 43, 0.87);
    color: rgba(43, 43, 43, 0.87);
  }
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <StyledLink href="/">
        <span>Home</span>
      </StyledLink>
      <StyledLink href="/boss-timetable">
        <span>BOSS Timetable</span>
      </StyledLink>
      <StyledLink href="/about">
        <span>About</span>
      </StyledLink>
    </NavBarContainer>
  );
};

export default NavBar;
