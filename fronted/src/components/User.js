import React from 'react'
import { Link } from "react-router-dom"

const UserItem = ({ user, deleteUser }) => {
  return (
    <tr>
      <td>
        {user.username}
      </td>
      <td>
        {user.first_name}
      </td>
      <td>
        {user.last_name}
      </td>
      <td>
        {user.email}
      </td>
      <td><button onClick={() => deleteUser(user.id)}
        type='button'>Delete user</button>
      </td>
    </tr>
  )
}

const UserList = ({ usersSS, deleteUser }) => {
  return (
    <div>

      <table>
        <th>
          Username
        </th>
        <th>
          First name
        </th>
        <th>
          Last Name
        </th>
        <th>
          Email address
        </th>
        <th></th>
        {usersSS?.map((user_) => <UserItem user={user_} deleteUser={deleteUser} />)}
      </table>
      <Link to='/users/create'> Create user</Link>
    </div>
  )
}

export default UserList
