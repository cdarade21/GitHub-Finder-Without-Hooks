import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';

class App extends Component{

  state = {
    users:[],
    user:{},
    repos:[],
    loading : false,
    alert: null
  }

  async componentDidMount(){
      this.setState({loading:true});
      //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({users:res.data,loading:false});
  }


// Search Git-Hub Users
  searchUsers = async text => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users:res.data.items,loading:false});
  }

// Get Git-Hub Users
  getUser = async (username) => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user:res.data,loading:false});
  }

  // Get latest 5 repos of Git-Hub User
  getUserRepos = async (username) => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos:res.data,loading:false});
  }

  //Clear Git-Hub Users
  clearUsers = () => this.setState({users:[],loading:false})

  //Show alert if user enter nothing in a search bar
  showAlert = (msg,type) => {
    this.setState({alert:{msg,type}, loading:false})
    setTimeout(()=>{this.setState({alert:null})},4000)
  }

  render() {
    const {users, user, repos, loading} = this.state
     return (
       <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear = {users.length>0 ? true : false}
                    showAlert = {this.showAlert}/>
                  <Users users={users} loading={loading}/>
                </Fragment>
              )
              }/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props =>(
                <Fragment>
                  <User 
                  {...props}
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos} 
                  user={user}
                  repos={repos}
                  loading={loading}/>
                </Fragment>
              )}></Route>
            </Switch>
            
          </div>
        </div>
       </Router>
    );
  }
}

export default App;
