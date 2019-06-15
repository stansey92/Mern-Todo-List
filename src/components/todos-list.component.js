import React, { useState, useEffect, button } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'


const TodosList = (props) => {
  const [todos, setTodos] = useState([])
  const count = 0

  const Todo = props => (
      <tr>
          <td className={props.todo.todoCompleted ? 'completed' : '' }>{props.todo.todoDescription}</td>
          <td className={props.todo.todoCompleted ? 'completed' : '' }>{props.todo.todoResponsible}</td>
          <td className={props.todo.todoCompleted ? 'completed' : '' }>{props.todo.todoPriority}</td>
          <td>
              <Link to={"/edit/"+props.todo._id}>Edit</Link>
          </td>
          <td><button onClick={() => removeItem(props.todo._id)}>Remove</button></td>
      </tr>
  )

  const fetchItems = async () => {
    const response = await fetch('http://localhost:4000/todos/')
    const json = await response.json()
    setTodos(json)
  }

  useEffect(() => {
    fetchItems()

  }, [count])

  const todoList = () => {
    return todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />
    })
  }

  const removeItem = async (id) => {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    const json = await response.json()
    console.log(json)

    fetchItems()
  }
  return (
    <div>
      <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Responsible</th>
                    <th>Priority</th>
                    <th>Action</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                { todoList() }
            </tbody>
        </table>
    </div>
  )
}

export default TodosList
