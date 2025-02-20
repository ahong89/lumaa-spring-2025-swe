import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import sequelize, { User } from '../config'

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: {username: username} });

  try {
    // verify username exists
    if(!user) {
      res.status(401).json({error: "Either username or password is incorrect"});
      return;
    }

    // verify password is correct
    const correctPassword = await bcrypt.compare(password, user.password);
    if(!correctPassword) {
      res.status(401).json({error: "Either username or password is incorrect"});
      return;
    }

    res.status(200).json({message: "Logged in successfully"});
  } catch(error) {
    console.log(error);
    res.status(500).json({error: "User lgin has failed due to error"})
  }
})

authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // check if username already exists
    const userExists = await User.count({ where: {username: username} }) !== 0;
    if(userExists) {
      res.status(400).json({error: `User with username ${username} already exists`});
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({ username: username, password: hash});
    console.log(`New user created with id: ${newUser.id}`);
    res.status(200).json({message: `User with username ${username} has been created!`}); 
  } catch(error) {
    res.status(500).json({error: "User registration has failed due to error"});
  }
})

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if(!token) {
    return res.status(401).json({error: "Unauthorized"});
  }
  jwt.verify(token, 'secret', (err: any, decoded: any) => { // fix this!!!!
    if(err) {
      return res.status(401).json({error: "Unauthorized"});
    }
    next();
  })
}

export default authRouter;
