import './App.css';
import { useState } from 'react';

function Tache(task) {
 const { title, completed, toggleCompletion, index} = task

  return(
    <div>
      <input type="checkbox" checked={completed}  onChange={() => toggleCompletion(task, index)}/>
      <span className="tache-text">{title}</span>
    </div>
  )
}

function TacheTable({tasks, setTasks, filterCompleted}){
  const toggleCompletion = (task, index) => {
    const newTask = {...task}
    newTask.completed = !task.completed
    const newList = [...tasks]
    newList[index] = newTask
    setTasks(newList)
  }
  return(
    <div>
    {tasks.map((task, index) => {
      if (filterCompleted && task.completed){
        return null;
      }
        return (
          <Tache
            key={task.id}
            title={task.title}
            index={index}
            completed={task.completed}
            id={task.id}
            toggleCompletion={toggleCompletion}
          />
        );
      })}
    </div>
  )
}

function AddTache({ addTask }){
  const [inputValue, setInputValue] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue(''); 
    }
  };
  return(
    <form className="add-tache" onSubmit={handleSubmit}>
      <button type="submit" className="add-button"> + </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Titre de la tâche"
        className="add-input"
      />
    </form>
  )
}

function Filter({ filterCompleted, toggleFilter }){
  return(
    <button className="filter-button" onClick={toggleFilter}>
    {filterCompleted ? 'Afficher toutes les tâches' : 'Masquer les tâches réalisées'}
    </button>
  )
}

export default function TodoTable(){
  const [tasks, setTasks] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState(false);

  const addTask = (text) => {
    const newTask = {
      id: tasks.length + 1,
      title: text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleFilter = () => {
    setFilterCompleted(!filterCompleted);
  };

  return(
    <div className="todo-table">
      <h1 className="todo-title">TO DO</h1>
      <TacheTable tasks={tasks} setTasks={setTasks} filterCompleted={filterCompleted} />
      <AddTache addTask= {addTask} />
      <Filter filterCompleted = {filterCompleted} toggleFilter = {toggleFilter}/>
    </div>
  )
}