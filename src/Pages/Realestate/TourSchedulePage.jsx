// components/TourSchedulePage.js

import React from 'react';
import TopBar from './TopBar';
import Menu from './Menu';

const TourSchedulePage = () => {
  return (
    <div className="tour-schedule-page">
      <TopBar />
      <Menu />
      <div className="background-image"></div>
      {/* Add your Tour Schedule content here */}
      <h2>Tour Schedule Page</h2>
    </div>
  );
};

export default TourSchedulePage;
