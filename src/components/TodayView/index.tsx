import React, { useEffect, useState } from 'react';
import { Today, DateNow, Events } from './components';
import { Card } from '../index';

interface Props {
  cardStyle?: Record<string, unknown>;
  gridArea: string;
}

const TodayView: React.FC<Props> = (props) => {
  const { gridArea } = props;
  const [todayDate, setTodayDate] = useState(Date.now());
  const isSmall = false;

  return (
    <Card gridArea={gridArea} isSmall={isSmall}>
      <>
        <Today todayDate={todayDate} />
        <DateNow todayDate={todayDate} />
        <Events todayDate={todayDate} />
      </>
    </Card>
  );
};

export default TodayView;
