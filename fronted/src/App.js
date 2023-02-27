import React from 'react'
import axios from 'axios'
// import logo from './logo.svg';
import './App.css'
import UserList from './components/User.js'
import ProjectsList from './components/projects.js'
import ToDoList from './components/todo.js'
import ProjectSingle from "./components/projectSingle";
import Menu from './components/menu.js'
import HomePage from './components/homepage.js'
import Footer from './components/footer.js'
import NotFound404 from './components/NotFound404.js'
import LoginForm from './components/Auth.js'
import Cookies from "universal-cookie";
// eslint-disable-next-line
import { HashRouter, BrowserRouter, Switch, Routes, Route, Link, NavLink, Redirect, Navigate } from "react-router-dom"

const API_URL = 'http://127.0.0.1:8000/api'

// objectsPerPage - определяет количество забираемых объектов с API,
// этот параметр можно согласовать с возможной пагинацией уже в REST.
// Не знаю как загнать в него значение .count страницы без 
// предварительного запроса самой страницы 
const objectsPerPage = 100
const PAGE_SIZE = `/?page_size=${objectsPerPage}`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': '',
      'loginUser': '',
    }
  }

  load_data() {
    const headers = this.get_headers()
    axios.get(`${API_URL}/usersapp${PAGE_SIZE}`, { headers })
      .then(response => {
        // console.log("rd_1", +response.data.count)
        // console.log("rd_2", response.data.results)
        const users = response.data.results
        // console.log("rd_3", users)
        this.setState(
          {
            'usersSS': users
          }
        )
      }).catch(error => console.log(error))

    axios.get(`${API_URL}/projectapp${PAGE_SIZE}`, { headers })
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))

    axios.get(`${API_URL}/todoapp${PAGE_SIZE}`, { headers })
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))
  }

  set_token(token) {
    let cookies = new Cookies()
    cookies.set('token', token)
    console.log("app_4", cookies)
    this.setState({ 'token': token }, () => this.load_data())
  }
  get_token(username, password) {
    // console.log("app_1", username, password)    
    const data = { username: username, password: password }
    axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
      console.log("app_3", response.data)
      this.set_token(response.data['token'])
    }).catch(error => alert('Неверный пароль или логин'))
    this.setState({ 'loginUser': username })
    // console.log("app_2", this.state.username)
  }

  is_auth() {
    return !!this.state.token
  }
  get_headers() {
    let headers = {
      'Content-Type': 'applications/json'
    }
    if (this.is_auth()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token_from_cookies() {
    const cookies = new Cookies()
    const token = cookies.get('token')

    this.setState({ 'token': token }, () => this.load_data())
  }

  logout() {
    this.set_token('')
    this.setState({ 'authors': [] }, () => this.load_data())
    this.setState({ 'books': [] }, () => this.load_data())
    this.setState({ 'token': '' }, () => this.load_data())
    this.setState({ 'loginuser': '' }, () => this.load_data())
  }

  login() {
    console.log("rd_4")
    window.location.assign('/login')
    // Location.href = 'http://192.168.42.140:3000/login'
    console.log("rd_5")
  }

  componentDidMount() {
    this.get_token_from_cookies()
  }


  render() {
    return (
      <div className="App">
        <div>
          <p>{this.state.loginUser}</p>
          {this.is_auth() ? <button onClick={() => this.logout()}>Logout </button> :
            <button type="submit" onClick={() => this.login()}>Login </button>}
        </div>
        <BrowserRouter>
          <div className="menu">
            <Menu />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/users' element={<UserList usersSS={this.state.usersSS} />} />
            <Route path='/projects' element={
              <ProjectsList projects={this.state.projects} usersSS={this.state.usersSS} />} />
            <Route path='/projects/:id' element={
              <ProjectSingle projects={this.state.projects} usersSS={this.state.usersSS} />} />
            <Route path='/todo' element={
              <ToDoList todos={this.state.todos} />} />
            <Route path="*" element={<NotFound404 />} />
            <Route exact path='/login' element={<LoginForm
              get_token={(username, password) => this.get_token(username, password)} />} />
            {/* Redirects */}
            <Route path='/home' element={<Navigate to='/' />} />
            <Route path='/user' element={<Navigate to='/users' />} />
            <Route path='/project' element={<Navigate to='/projects' />} />
            <Route path='/todos' element={<Navigate to='/todo' />} />
          </Routes>
        </BrowserRouter>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }


}

export default App;
