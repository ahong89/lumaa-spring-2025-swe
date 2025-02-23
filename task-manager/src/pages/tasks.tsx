import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './tasks.css';
import Modal from '../components/modal';
import { fetchTasksAPI, addTaskAPI, updateTaskAPI, removeTaskAPI } from '../api/tasks';

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

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number>(0);
  const [editTaskTitle, setEditTaskTitle] = useState<string>("");
  const [editTaskDescription, setEditTaskDescription] = useState<string>("");

  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    const initTasks = async () => {
      const accessToken: string | null = localStorage.getItem('accessToken');
      if(accessToken) {
        setJwtToken(accessToken);
        const response = await fetchTasksAPI(accessToken);
        if(response?.status == 200) {
          setTasks([...tasks, ...response.data.tasks]);
          return;
        }
      }
      navigate('/login');
    }
    initTasks();
  }, [])

  function logout() {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }
  
  function completeTask(event: React.ChangeEvent<HTMLInputElement>, taskId: number) {
    updateTaskAPI(jwtToken, taskId, "isComplete", event.target.checked);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? {...task, isComplete: event.target.checked} : task
      )
    )
  }

  function addNewTask() {
    addTaskAPI(jwtToken, currTaskId+1, newTaskTitle, newTaskDescription, false);
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

  function openTaskModal(taskId: number) {
    setEditTaskId(taskId);
    setIsEditOpen(true);
  }

  function closeTaskModal(save: boolean) {
    setIsEditOpen(false);
    setEditTaskTitle("");
    setEditTaskDescription("");
    if(save) {
      updateTaskAPI(jwtToken, editTaskId, "title", editTaskTitle);
      updateTaskAPI(jwtToken, editTaskId, "description", editTaskDescription);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? {
            id: editTaskId,
            title: editTaskTitle,
            description: editTaskDescription,
            isComplete: task.isComplete
          } : task
        )
      )
    }
  } 

  function removeTask(taskId: number) {
    removeTaskAPI(jwtToken, taskId);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    )
  }

  return (
    <div className="TasksPage">
      <Modal isOpen={isEditOpen} onClose={() => closeTaskModal(false)}>
        <h1>Edit Task</h1>
        <input 
          className="EditTaskTitle"
          type="text"
          placeholder="New Task Title..."
          value={editTaskTitle}
          onChange={(e) => setEditTaskTitle(e.target.value)}
        />
        <input 
          className="EditTaskDescription"
          type="text"
          placeholder="New Description..."
          value={editTaskDescription}
          onChange={(e) => setEditTaskDescription(e.target.value)}
        />
        <button onClick={() => closeTaskModal(true)}>Save!</button>
      </Modal>
      <button className="LogoutButton" onClick={logout}>Logout !</button>
      <div className="TasksContainer">
        <h1>Tasks</h1>
          <div className="TasksList">
            {tasks.map((task) => (
              <div className="TaskContainer">
                <input className="TaskCheckbox" type="checkbox" checked={task.isComplete} onChange={(e) => completeTask(e, task.id)}/>
                <h3 className="TaskTitle">{task.title}</h3>
                <p className="TaskDescription">{task.description}</p>
                <div className="EditContainer">
                  <button className="EditTaskButton" onClick={() => openTaskModal(task.id)}>Edit</button>
                  <button className="RemoveTaskButton" onClick={() => removeTask(task.id)}>X</button>
                </div>
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
