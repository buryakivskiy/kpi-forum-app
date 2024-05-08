import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import CreatePost from './components/posts/CreatePost'
import PostDetails from './components/posts/PostDetails'
import Profile from './components/users/Profile';
import { history } from './history'



const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/posts/:id' component={PostDetails} />
            <Route path='/profile/:id' component={Profile} />
          </Switch>
        </div>
      </Router>
      
    );
}

export default Routes;

