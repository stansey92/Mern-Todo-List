import React, { useState, useEffect } from 'react'

const EditTodo = (props) => {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoResponsible, setTodoResponsible] = useState('')
  const [todoPriority, setTodoPriority] = useState('')
  const [todoCompleted, setTodoCompleted] = useState(false)
  const count = 0

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`http://localhost:4000/todos/${props.match.params.id}`)
      const json = await response.json()
      setTodoDescription(json.todoDescription)
      setTodoResponsible(json.todoResponsible)
      setTodoPriority(json.todoPriority)
      setTodoCompleted(json.todoCompleted)
    }
    fetchItem()
  }, [count])

  const onChangeTodoDescription = (e) => {
    setTodoDescription(e.target.value)
  }

  const onChangeTodoResponsible = (e) => {
    setTodoResponsible(e.target.value)
  }

  const onChangeTodoPriority = (e) => {
    setTodoPriority(e.target.value)
  }

  const onChangeTodoCompleted = (e) => {
    setTodoCompleted(!todoCompleted)
  }


  const editTodo = async (data) => {
    const response = await fetch(`http://localhost:4000/todos/update/${props.match.params.id}`, {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
      body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const editedTodo = {
      todoDescription: todoDescription,
      todoResponsible: todoResponsible,
      todoPriority: todoPriority,
      todoCompleted: todoCompleted
    }
    editTodo(editedTodo)
    props.history.push('/')
  }


  return (
    <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Description: </label>
                <input  type="text"
                        className="form-control"
                        value={todoDescription}
                        onChange={onChangeTodoDescription}
                        />
            </div>
            <div className="form-group">
                <label>Responsible: </label>
                <input
                        type="text"
                        className="form-control"
                        value={todoResponsible}
                        onChange={onChangeTodoResponsible}
                        />
            </div>
            <div className="form-group">
                <div className="form-check form-check-inline">
                    <input  className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={todoPriority==='Low'}
                            onChange={onChangeTodoPriority}
                            />
                    <label className="form-check-label">Low</label>
                </div>
                <div className="form-check form-check-inline">
                    <input  className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={todoPriority==='Medium'}
                            onChange={onChangeTodoPriority}
                            />
                    <label className="form-check-label">Medium</label>
                </div>
                <div className="form-check form-check-inline">
                    <input  className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={todoPriority==='High'}
                            onChange={onChangeTodoPriority}
                            />
                    <label className="form-check-label">High</label>
                </div>
            </div>
            <div className="form-check">
                <input  className="form-check-input"
                        id="completedCheckbox"
                        type="checkbox"
                        name="completedCheckbox"
                        onChange={onChangeTodoCompleted}
                        checked={todoCompleted}
                        value={todoCompleted}
                        />
                <label className="form-check-label" htmlFor="completedCheckbox">
                    Completed
                </label>
            </div>
            <br />
            <div className="form-group">
                <input type="submit" value="Update Todo" className="btn btn-primary" />
            </div>
        </form>
    </div>
  )
}

export default EditTodo
