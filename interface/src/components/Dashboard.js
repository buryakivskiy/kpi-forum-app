import React from 'react';
import Navigation from './Navigation'
import Posts from './posts/Posts'


  const Dashboard = () => {
    return (
      <div id="page-container">
        <Navigation />
        <Posts />
      </div>
    )
  }

  export default Dashboard;

