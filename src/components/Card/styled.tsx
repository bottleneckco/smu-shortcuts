import styled from 'styled-components';

export const CardTemplate = styled.div`
  box-sizing: border-box;
  padding: 16px;
  border-radius: 22px;
  background: ${(props) => props.theme.blur.backgroundBackwards};

  @supports (backdrop-filter: ${(props) => props.theme.blur.blur}) {
    background: ${(props) => props.theme.blur.background};
    backdrop-filter: ${(props) => props.theme.blur.blur};
  }
`;
