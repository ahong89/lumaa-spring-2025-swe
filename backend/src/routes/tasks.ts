import express from 'express';
import type { Request, Response } from 'express';

import { Task, User } from '../config'

const taskRouter = express.Router();

taskRouter.get('/tasks', async (req: Request, res: Response) => {
  const username = req.query.username;
  try {
    const user = await User.findOne({ where: {username: username} })
    if(!user) {
      res.status(400).json({"error": "user doesn't exist, please sign in again"});
      return;
    }

    // get tasks
    const userTasks = await Task.findAll({ where: {userId: user.id} });
    console.log(userTasks);
    res.status(200).json({"message": "tasks have been gotten"});
  } catch(error) {
    res.status(500).json({"error": "getting tasks failed due to server error"});
  }
})

taskRouter.post('/tasks', async (req: Request, res: Response) => {
  const [id, title, description, isComplete] = req.body;
  try {
    await Task.create({
      id: id,
      title: title,
      description: description,
      isComplete: isComplete
    });
    res.status(200).json({"message": "task successfully added"});
  } catch(error) {
    res.status(500).json({"error": "adding task failed due to server error"});
  }
})

export default taskRouter;
