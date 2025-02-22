import express from 'express';
import type { Request, Response } from 'express';

import { Task, User } from '../config'
import { type ExtendedRequest } from './auth'
import { verifyToken } from './auth'

const taskRouter = express.Router();

taskRouter.get('/tasks', verifyToken, async (req: Request, res: Response) => {
  const userId = (req as ExtendedRequest).token.userId;
  try {
    const user = await User.findOne({ where: {id: userId} })
    if(!user) {
      res.status(400).json({"error": "user doesn't exist, please sign in again"});
      return;
    }

    // get tasks
    const userTasks = await Task.findAll({where: {userId: userId}});
    res.status(200).json({"tasks": userTasks});
  } catch(error) {
    console.log(error);
    res.status(500).json({"error": "getting tasks failed due to server error"});
  }
})

taskRouter.post('/tasks', verifyToken, async (req: Request, res: Response) => {
  const userId = (req as ExtendedRequest).token.userId;
  const {id, title, description, isComplete} = req.body;
  try {
    await Task.create({
      id: id,
      title: title,
      description: description,
      isComplete: isComplete,
      userId: userId,
    });
    res.status(200).json({"message": "task successfully added"});
  } catch(error) {
    res.status(500).json({"error": "adding task failed due to server error"});
  }
})

taskRouter.put('/tasks/:id', verifyToken, async (req: Request, res: Response) => {
  const {attribute, newValue} = req.body;
  const validAttributes = ['isComplete', 'title', 'description']
  if(attribute in validAttributes) {
    res.status(400).json({"error": "attribute invalid"});
    return;
  }

  const userId = (req as ExtendedRequest).token.userId;
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({where: {id: taskId, userId: userId}});
    if(!task) {
      res.status(400).json({"error": "task doesn't exist"});
      return;
    }
    task.update({[attribute]: newValue});
    await task.save();
    res.status(200).json({"message": "task successfully updated"});
  } catch(error) {
    res.status(500).json({"error": "server error occured"});
  }
})

taskRouter.delete('/tasks/:id', verifyToken, async (req: Request, res: Response) => {
  const userId = (req as ExtendedRequest).token.userId;
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({where: {id: taskId, userId: userId}});
    if(!task) {
      res.status(400).json({"error": "task does not exist"});
    }
    await Task.destroy({where: {id: taskId}});
    res.status(200).json({"message": `task ${taskId} has been removed`});
  } catch(error) {
    res.status(400).json({"error": "server error occured while removing task"});
  }
})

export default taskRouter;
