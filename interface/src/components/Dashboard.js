import React from 'react';
import Navigation from './Navigation'
import Welcome from './Welcome';
import Posts from './posts/Posts'
import Categories from './categories/Categories';
import './Dashboard.css'


const Dashboard = () => {
    return (
      <div id="page-container">
        <Navigation />
        <Welcome />
        <Categories />
        <h2 className='other-posts-title'>Популярні теми:</h2>
        <Posts />
      </div>
    )
  }

  export default Dashboard;

