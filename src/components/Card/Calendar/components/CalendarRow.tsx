import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 0;

  font-weight: 500;
  font-size: 1.1em;
  color: ${(props) => props.theme.text900};
`;

const Color = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.calendarRed};
  margin-right: 8px;
`;

const CalendarRow: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <Wrapper>
      <Color color="" />
      {title}
    </Wrapper>
  );
};

export default CalendarRow;
