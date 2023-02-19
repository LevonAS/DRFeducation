import React from 'react'


const UserItem = ({ user }) => {
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
    </tr>
  )
}

const UserList = ({ usersSS }) => {
  return (
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
      {usersSS?.map((user_) => <UserItem user={user_} />)}
    </table>
  )
}

export default UserList
