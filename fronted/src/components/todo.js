import React from "react";
import { Link } from "react-router-dom"

const ToDoItem = ({ todo, deleteTodo }) => {
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
      <td>
        {todo.is_active.toString()}
      </td>
      <td><button onClick={() => deleteTodo(todo.id)}
        type='button'> Delete ToDo</button>
      </td>
    </tr>
  )
}

const ToDoList = ({ todos, deleteTodo }) => {
  // console.log("itemId_1", todos)
  return (
    <div>
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
        <th>
          Status
        </th>
        {todos?.map((todo_) => <ToDoItem todo={todo_}
          deleteTodo={deleteTodo} />)}
      </table>
      <Link to='/todo/create'>Create ToDo</Link>
    </div>
  )
}

export default ToDoList