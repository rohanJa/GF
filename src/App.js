import React, {Component} from 'react';
import axios from 'axios';

import './App.css';
import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Search from './components/users/Search'
import Users from './components/users/Users'

class App extends Component {

  state = {
    users: [],
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
  
    this.setState({users:res.data.items, loading:false}); // as this is search request data is in "res.data.items" not un "res.data" 
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

    const { users, loading } = this.state

    return (
      <div className="App">
        <Navbar />
        <div className='container'>

          <Alert alert={this.state.alert} />
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

        </div>
      </div>
    )
  }
}

export default App;
