import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

const Analytics: React.FC = function () {
  useEffect(() => {
    const { GA } = process.env;

    if (!GA) {
      return;
    }

    ReactGA.initialize(GA);
  }, []);
  return null;
};

export default Analytics;
