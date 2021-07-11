import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.card.overlay};
`;

export const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.card.background};
  width: 80%;
  min-height: 200px;
  max-height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  border-radius: 12px;
  overflow-y: auto;
  z-index: 6;
  box-sizing: border-box;
  color: ${(props) => props.theme.text900};

  h1 {
    margin: 0;
    font-size: 1.5em;
    padding-bottom: 16px;
    font-weight: 600;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    min-height: 250px;
    width: 90%;
  }
`;

export const PrimaryBtn = styled.a`
  box-sizing: border-box;
  text-align: center;
  font-weight: 500;
  font-size: 1em;
  color: ${(props) => props.theme.primary.blue};
  cursor: pointer;
  padding: 12px 16px;
  border: 2px solid ${(props) => props.theme.primary.blue}AA;
  border-radius: 6px;
  text-decoration: none;

  :hover {
    background-color: ${(props) => props.theme.primary.blue}26;
  }

  &:disabled {
    color: ${(props) => props.theme.text300};
    border-color: ${(props) => props.theme.text300};
    pointer-events: none;
  }
`;

export const DisabledPrimaryBtn = styled.div`
  box-sizing: border-box;
  text-align: center;
  font-weight: 500;
  font-size: 1em;
  padding: 12px 16px;
  color: ${(props) => props.theme.text300};
  border: 2px solid ${(props) => props.theme.text300}AA;
  border-radius: 6px;
`;
