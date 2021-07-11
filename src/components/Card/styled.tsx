import styled from 'styled-components';

export const CardTemplate = styled.div`
  box-sizing: border-box;
  padding: 16px;
  border-radius: 22px;
  background: ${(props) => props.theme.blurBackgroundBackwardsCompatible};

  @supports (backdrop-filter: ${(props) => props.theme.blur}) {
    background: ${(props) => props.theme.blurBackground};
    backdrop-filter: ${(props) => props.theme.blur};
  }
`;
