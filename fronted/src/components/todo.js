import React from "react";

const ToDoItem = ({ todo }) => {
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

const ToDoList = ({ todos }) => {
  // console.log("itemId_1", todos)
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
      {todos?.map((todo_) => <ToDoItem todo={todo_} />)}
    </table>
  )
}

export default ToDoList