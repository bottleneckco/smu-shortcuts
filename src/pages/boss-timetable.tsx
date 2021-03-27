import React from 'react';
import BOSSTimetable from '../components/BOSSTimetable';

import DefaultLayout from '../layouts/DefaultLayout';

export const BOSSTimetablePage: React.FC = () => {
  return (
    <DefaultLayout title="BOSS Timetable">
      <BOSSTimetable />
    </DefaultLayout>
  );
};

export default BOSSTimetablePage;
