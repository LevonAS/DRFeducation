import React from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import Menu from './components/menu.js'
import Footer from './components/footer.js'
const API_URL = 'http://127.0.0.1:8000/api';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }
  componentDidMount() {
    axios.get(`${API_URL}/usersapp`)
    .then(response => {
      const users = response.data
        this.setState(
          {
            'users': users
          }
        )
    }).catch(error => console.log(error))   
  }
  
  render() {
    return (
      <div>
        <div class="menu">
          <Menu/>
        </div>
        <div class="list users">
          <UserList users={this.state.users} />
        </div>
        <div class="footer">
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App;
