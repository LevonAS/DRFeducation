import React from "react";

const ToDoItem = ({ todo, usersSS }) => {
  return (
    <tr>
      {/* <td>
        {todo.id}
      </td> */}
      <td>
        {todo.project}
      </td>
      <td>
        {todo.text}
      </td>
      <td>
        {todo.creator}
      </td>
    </tr>
  )
}

const ToDoList = ({ todos, usersSS }) => {
  console.log("itemId_1", todos)
  return (
    <table>
      {/* <th>
        ID
      </th> */}
      <th>
        Project
      </th>
      <th>
        Text
      </th>
      <th>
        Creator
      </th>
      {todos?.map((todo_) => <ToDoItem todo={todo_} usersSS={usersSS} />)}
    </table>
  )
}

export default ToDoList