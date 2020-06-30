import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { Component } from 'react';
import Navbar from './components/Layout/Navbar'
import Users from './components/Users/Users'
import User from './components/Users/User'
import axios from 'axios'
import Search from './components/Users/Search'
import Alert from './components/Layout/Alert'
import About from './components/pages/About'


class App extends Component{

  state = {
    users: [],
    user: {},
    repos:[],
    loading:false,
    alert:null
  }

  async componentDidMount() {

    const rui = {
      id: '1212',
      login:'Coura',
      avatar_url : 'https://avatars2.githubusercontent.com/u/9034171?s=460&u=d660bf696abbff5fc9210eda2efdb1c6468dad56&v=4',
      html_url : "https://github.com/Coura"
  }
    
    this.setState({loading:true})
    const res =  await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    res.data.unshift(rui)
    this.setState({users:res.data,loading:false})
  }

  //search Users prop recovery function
  searchUsers = async (text) => {
    this.setState({loading:true})
    
    const res =  await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    this.setState({users:res.data.items,loading:false,alert:null})
  }

  //get single user
  getUser = async (username) => {
    this.setState({loading:true})
    
    const res =  await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    this.setState({user:res.data,loading:false,alert:null})
  
  }

  //get user repos
  getUserRepos = async (username) => {
    this.setState({loading:true})
    
    const res =  await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    this.setState({repos:res.data,loading:false,alert:null})
  
  }

  //clear users from state
  clearUsers = () => this.setState({users:[],loading:false})

  setAlert = (msg,type) => {
      this.setState({alert: {msg,type}})

      setTimeout(()=> this.setState({alert:null}),5000)
  }

  render(){
    const {users, loading, alert, user, repos} = this.state;
    return (
      <Router>
        <div className="App">
        <Navbar />
        
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route 
            exact path='/' 
            render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers}
                  showClear={users.length>0 ? true : false} 
                  setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route 
            exact path='/about' 
            component={About} />
            <Route exact path='/user/:login' 
              render={props => (
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos}
                  user={user} 
                  repos={repos}
                  loading={loading} />
              )} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;