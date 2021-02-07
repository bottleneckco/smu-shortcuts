import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  todayDate: number;
}

const DateNow: React.FC<Props> = (props) => {
  const { todayDate } = props;
  const [today, setToday] = useState('');

  useEffect(() => {
    const todayList = new Date(todayDate).toDateString().split(' ');
    setToday(`${todayList[2]} ${todayList[1]} ${todayList[3]}`);
  }, []);

  return <TimerContainer>{today}</TimerContainer>
};

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 10%;

  font-weight: 800;
  font-size: 1.35rem;
  color: #272727;

  border-bottom: 3px solid #272727;

  @media screen and (max-width: 1100px) {
    font-size: 2vw;
  }

  @media screen and (max-width: 720px) {
    font-size: 6vw;
  }
`;

DateNow.defaultProps = {
  todayDate: Date.now(),
};

export default DateNow;
