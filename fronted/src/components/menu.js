import React from 'react'
import { NavLink } from "react-router-dom"


const activeStyle = ({ isActive }) => ({ color: isActive ? 'var(--color-active)' : 'blue' })

const Menu = () => (
  <nav>
    <ul>
      <li>
        <NavLink to='/' className={() => ''} style={activeStyle}>Home</NavLink>
      </li>
      <li>
        <NavLink to='/users' className={() => ''} style={activeStyle}>All users</NavLink>
      </li>
      <li>
        <NavLink to='/projects' className={() => ''} style={activeStyle}>Projects</NavLink>
        {/* <a href='/projects'>Projects</a> */}
      </li>
      <li>
        <NavLink to='/todo' className={() => ''} style={activeStyle}>ToDo</NavLink>
      </li>
    </ul>
  </nav>

  // <div className="container-fluid">
  //   <nav className="top-menu">
  //     <ul className="menu-main">
  //       <li><a href="\">Home</a></li>
  //       <li><a href="\">All users</a></li>
  //       <li><a href="\">Projects</a></li>
  //       <li><a href="\">ToDo</a></li>
  //     </ul>
  //   </nav>
  // </div>
)

export default Menu;