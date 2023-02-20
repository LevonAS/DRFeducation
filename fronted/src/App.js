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
      'projects': []
    }
  }
  componentDidMount() {
    
    axios.get(`${API_URL}/usersapp${PAGE_SIZE}`)
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

    axios.get(`${API_URL}/projectapp${PAGE_SIZE}`)
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))

    axios.get(`${API_URL}/todoapp${PAGE_SIZE}`)
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))
  }


  render() {
    return (
      <div className="App">
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
              <ToDoList todos={this.state.todos} users={this.state.users} />} />
            <Route path="*" element={<NotFound404 />} />
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

  // render() {
  //   return (
  //     <div className="App">
  //       <BrowserRouter>
  //         <nav>
  //           <ul>
  //             <li>
  //               <Link to='/'>Home</Link>
  //             </li>
  //             <li>
  //               <Link to='/users'>All users</Link>
  //             </li>
  //             <li>
  //               <Link to='/projects'>Projects</Link>
  //             </li>
  //             <li>
  //               <Link to='/todo'>ToDo</Link>
  //             </li>
  //           </ul>
  //         </nav>
  //         <Switch>
  //           <Route exact path='/' component={() => <HomePage />} />
  //           <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
  //           <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
  //           <Route exact path='/todo' component={() => <ToDoList todos={this.state.todos} />} />
  //           <Redirect from='/home' to='/' />
  //           <Redirect from='/user' to='/users' />
  //           <Redirect from='/project' to='/projects' />
  //           <Redirect from='/todos' to='/todo' /> 
  //           <Route component={NotFound404} />
  //         </Switch>
  //         <div class="footer">
  //           <Footer />
  //         </div>
  //       </BrowserRouter>

  //     </div>
  //   )
  // }

  // render() {
  //   return (
  //     <div>
  //       <div class="menu">
  //         <Menu />
  //       </div>
  //       <div class="list users">
  //         <UserList users={this.state.users} />
  //       </div>
  //       <div class="list projects">
  //         <ProjectList projects={this.state.projects} />
  //       </div>
  //       <div class="list ToDo">
  //         <ToDoList todos={this.state.todos} />
  //       </div>
  //       <div class="footer">
  //         <Footer />
  //       </div>
  //     </div>
  //   )
  // }

}

export default App;
