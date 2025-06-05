import React from 'react';
import Content from '../ui/Content';
import Stats from '../components/Stats/Stats';
import Team from '../components/Team/Team';
import Event from '../components/Event/Event';

const Dashboard = ({ darkMode }) => {
  return (
    <Content>
      <Stats darkMode={darkMode} />
      <div className="flex flex-col gap-3 lg:flex-row">
        <Team />
        <Event />
      </div>
    </Content>
  );
};

export default Dashboard;