import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Search from './components/users/Search'
import Users from './components/users/Users'
import User from './components/users/User'


class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  async componentDidMount() {
    this.setState({loading:true});
  
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
    this.setState({users:res.data, loading:false}); 
  }
  
  //to get text from search to parent app through invoking function of parent by passing props to child
  searchUsers = async (text) => {
    this.setState({loading:true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  
    this.setState({users: res.data.items, loading:false}); // as this is search request data is in "res.data.items" not un "res.data" 
  }

  //Get details of single github users
  getUser = async (username) => {
    this.setState({loading:true});

    const res = await axios.get(`https://api.github.com/search/users/${username}`)
    console.log(res.data)
    this.setState({user: res.data, loading:false}); // as this is get request data is in "res.data" not in
                                                    // "res.data.items" as it return object of single users 
  }


  
  //clear user from state
  clearUsers = () =>{
    this.setState({users: [],loading: false})
  }

  //Set alert
  setAlert = (msg,type) => {
    this.setState({ alert:{ msg:msg, type:type } })

    setTimeout(() => this.setState({alert:null}),5000)

  }

  render(){

    const { users, loading, user } = this.state

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>

            <Alert alert={this.state.alert} />
            <Switch>
              <Route 
                exact 
                path='/' 
                render={props =>(
                  <Fragment>
                    <Search 
                          searchUsers={this.searchUsers} 
                          clearUsers={this.clearUsers} 
                          showClear={ users.length>0 ? true : false } //pass true to child when user are their to display clear button
                          setAlert={this.setAlert}
                    />               
                    <Users 
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )} 
              />

              <Route 
                exact path='/about' 
                component={About}
              />

              <Route
                exact path='/user/:login' render={props =>(
                  <User 
                    { ...props } 
                    getUser={this.getUser} 
                    user={user} 
                    loading={loading}
                  />
                )}
              />
          
          
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
