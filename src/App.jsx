import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit, MdDelete } from "react-icons/md";

const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([]) //All of our todos
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS()

  }
  const handleDelete = (e, id) => {
    // if (confirm("Are you sure you want to delete this Todo?")) {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS()
    // }
    // saveToLS()

  }
  const handleAdd = () => {
    let aux = { todo };
    let adt = aux.todo;
    console.log(aux.todo)
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-auto p-5 bg-slate-700 my-5 rounded-xl min-h-[80vh] md:w-1/2 ">
        <div className="addTodos">
          <div className="flex flex-col my-2">
            <div className="text-4xl mx-auto py-2 font-bold">सूची</div>
            <h2 className='text-3xl font-bold'>Add Todos</h2>
            <input onChange={handleChange} value={todo} type="text" className='rounded-xl w-full my-2 p-1' />
            <button onClick={handleAdd} className='bg-violet-800 hover:bg-purple-950 px-3 py-1 font-bold text-white mx-6 rounded-xl disabled:bg-violet-400' disabled={todo.length < 3}>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished Todos
        <div className='h-[1px] bg-black w-3/4'></div>
        <h2 className='text-xl font-bold'> Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display. Add one?</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between">
              <div className="flex gap-5">
                <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleCheckbox} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full gap-2">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-white rounded-md text-sm'><MdEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-white text-sm rounded-md'><MdDelete /></button>

              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
