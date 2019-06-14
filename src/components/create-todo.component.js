import React, { useState } from 'react'

const CreateTodo = (props) => {
  const [todoDescription, setTodoDescription] = useState('')
  const [todoResponsible, setTodoResponsible] = useState('')
  const [todoPriority, setTodoPriority] = useState('')
  const [todoCompleted, setTodoCompleted] = useState(false)

  const onChangeTodoDescription = (e) => {
    setTodoDescription(e.target.value)
  }

  const onChangeTodoResponsible = (e) => {
    setTodoResponsible(e.target.value)
  }

  const onChangeTodoPriority = (e) => {
    setTodoPriority(e.target.value)
  }

  const postNewTodo = async (data) => {
    const response = await fetch('http://localhost:4000/todos/add', {
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
    // console.log(`Form submitted:`);
    // console.log(`Todo Description: ${todoDescription}`);
    // console.log(`Todo Responsible: ${todoResponsible}`);
    // console.log(`Todo Priority: ${todoPriority}`);

    const newTodo = {
      todoDescription: todoDescription,
      todoResponsible: todoResponsible,
      todoPriority: todoPriority,
      todoCompleted: todoCompleted
    }

    postNewTodo(newTodo)



    setTodoDescription('')
    setTodoResponsible('')
    setTodoPriority('')
    setTodoCompleted(false)
  }
  return (
    <div style={{marginTop: 10}}>
        <h3>Create New Todo</h3>
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

            <div className="form-group">
                <input type="submit" value="Create Todo" className="btn btn-primary" />
            </div>
        </form>
    </div>
  )
}

export default CreateTodo
