import React from 'react'
import axios from 'axios'
// import logo from './logo.svg';
import './App.css'
import UserList from './components/User.js'
import ProjectsList from './components/projects.js'
import SearchBar from './components/SearchBar';
import ToDoList from './components/todo.js'
import ProjectSingle from "./components/projectSingle";
import Menu from './components/menu.js'
import HomePage from './components/homepage.js'
import Footer from './components/footer.js'
import NotFound404 from './components/NotFound404.js'
import LoginForm from './components/Auth.js'
import UserForm from './components/UserForm.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
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
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': '',
      'filterText': '',
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

  createUser(username, first_name, last_name, email) {
    const headers = this.get_headers()
    const data = { username: username, first_name:first_name, 
      last_name:last_name, email: email }
    console.log("app_cU_1", headers, data)
    axios.post(`${API_URL}/usersapp/`, data, { headers })
      .then(response => {
        let new_user = response.data
        console.log("app_cU_2", new_user)
        this.setState({ users: [...this.state.users, new_user] })
        console.log("Создан новый пользователь")
      }).catch(error => console.log(error))
  }

  deleteUser(id) {
    const headers = this.get_headers()
    console.log("app_dU_1", id, headers)
    axios.delete(`${API_URL}/usersapp/${id}/`, { headers })
      .then(response => {
        this.setState({
          users: this.state.users.filter((item) => item.id !== id)
        })
      }).catch(error => console.log(error))
  }
  
  handleFilterTextChange(filterText) {
    this.setState({
      'filterText': filterText
    });
  }
  
  createProject(name, users) {
    const headers = this.get_headers()
    const data = { name: name, users:users.split() }
    console.log("app_cP_1", headers, data)
    axios.post(`${API_URL}/projectapp/`, data, { headers })
      .then(response => {
        let new_project = response.data
        console.log("app_cP_2", new_project)
        const users = this.state.usersSS.filter((item) => item.id === new_project.users)[0]
        new_project.users = users
        this.setState({ projects: [...this.state.projects, new_project] })
        console.log("Создан новый проект")
      }).catch(error => console.log(error))
  }

  deleteProject(id) {
    const headers = this.get_headers()
    console.log("app_dP_1", id, headers)
    axios.delete(`${API_URL}/projectapp/${id}/`, { headers })
      .then(response => {
        this.setState({
          projects: this.state.projects.filter((item) => item.id !== id)
        })
      }).catch(error => console.log(error))
  }

  createTodo(project, text, creator) {
    const headers = this.get_headers()
    const data = { project:project, text:text, creator:creator  }
    console.log("app_cT_1", headers, data)
    axios.post(`${API_URL}/todoapp/`, data, { headers })
      .then(response => {
        let new_todo = response.data
        // console.log("app_cT_2", new_todo)
        // const user = this.state.usersSS.filter((item) => item.id === new_todo.creator)[0]
        // new_todo.creator = user
        // console.log("app_cT_3", new_todo)
        this.setState({ todos: [...this.state.todos, new_todo] })
        console.log("Создана новая заметка ToDo")
      }).catch(error => console.log(error))
  }

  deleteTodo(id) {
    const headers = this.get_headers()
    console.log("app_dT_1", id, headers)
    axios.delete(`${API_URL}/todoapp/${id}/`, { headers })
      .then(response => {
        this.setState({
          todos: this.state.todos.map(item => item.id === id ? {...item, is_active: false} : item)
        })
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
      'Content-Type': 'application/json'
    }
    if (this.is_auth()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }
  
  get_headers_vnd() {
    let headers = {
      'Content-Type': 'application/vnd.api+json'
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
            <Route path='/users' element={
                    <UserList 
                      usersSS={this.state.usersSS} 
                      deleteUser={(id) => this.deleteUser(id)} 
                    />} 
                  />
            <Route path="/users/create" element={
                    <UserForm 
                      createUser={(username, first_name, last_name, email) => 
                        this.createUser(username, first_name, last_name, email)} 
                    />} 
                  />
            <Route path='/projects' element={<>
                    <SearchBar
                      filterText={this.state.filterText}
                      onFilterTextChange={this.handleFilterTextChange}
                    />
                    <ProjectsList
                      projects={this.state.projects}
                      usersSS={this.state.usersSS}
                      filterText={this.state.filterText}
                      deleteProject={(id) => this.deleteProject(id)}
                    />
                  </>} />
            <Route path="/projects/create" element={
                    <ProjectForm 
                      usersSS={this.state.usersSS}
                      createProject={(name, users) => this.createProject(name, users)} 
                    /> } 
                  />
            <Route path='/projects/:id' element={
                    <ProjectSingle 
                      projects={this.state.projects} 
                      usersSS={this.state.usersSS} 
                    />} 
                  />
            <Route path="/todo/create" element={
                    <TodoForm 
                      usersSS={this.state.usersSS} 
                      projects={this.state.projects}
                      createTodo={(project, text, creator) => this.createTodo(project, text, creator)} 
                    />} 
                  />
            <Route path='/todo' element={
                    <ToDoList 
                      todos={this.state.todos} 
                      deleteTodo={(id) => this.deleteTodo(id)} 
                    />} 
                  />
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
