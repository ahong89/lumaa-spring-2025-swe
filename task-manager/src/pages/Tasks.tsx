import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './Tasks.css';

function Tasks() {
  const navigate = useNavigate();

  interface TaskType {
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
  }
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [currTaskId, setCurrTaskId] = useState<number>(0);

  function logout() {
    navigate('/login');
  }
  
  function completeTask(event: React.ChangeEvent<HTMLInputElement>) {
    const currTaskId: number = parseInt(event.target.id);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id == currTaskId ? {...task, isComplete: event.target.checked} : task
      )
    )
  }

  function addNewTask() {
    if(newTaskTitle.trim() === "") {
      return;
    }
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: currTaskId+1,
        title: newTaskTitle,
        description: newTaskDescription,
        isComplete: false
      }
    ])
    setNewTaskTitle("");
    setNewTaskDescription("");
    setCurrTaskId((prev) => prev+1);
  }

  function removeTask(taskId: number) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    )
  }

  return (
    <div className="TasksPage">
      <button className="LogoutButton" onClick={logout}>Logout !</button>
      <div className="TasksContainer">
        <h1>Tasks</h1>
          <div className="TasksList">
            {tasks.map((task) => (
              <div className="TaskContainer">
                <input className="TaskCheckbox" type="checkbox" checked={task.isComplete} onChange={completeTask} id={task.id.toString()}/>
                <h3 className="TaskTitle">{task.title}</h3>
                <p className="TaskDescription">{task.description}</p>
                <button className="RemoveTaskButton" onClick={() => removeTask(task.id)} id={task.id.toString()}>X</button>
              </div>
            ))}
          </div>
        <div className="TaskContainer">
          <input className="TaskCheckbox"
            type="checkbox"
            checked={false}
            disabled={true}
            readOnly
          />
          <input
            type="text"
            className="TaskTitle"
            placeholder="New Task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <input
            className="TaskDescription"
            placeholder="New Description..."
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <button className="SubmitNewTask" onClick={addNewTask}>Add New Task</button>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
