import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { type JwtPayload } from 'jsonwebtoken';

import { User } from '../config'

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: {username: username} });

  try {
    // verify username exists
    if(!user) {
      console.log("Username incorrect");
      res.status(401).json({error: "Either username or password is incorrect"});
      return;
    }

    // verify password is correct
    const correctPassword = await bcrypt.compare(password, user.password);
    if(!correctPassword) {
      res.status(401).json({error: "Either username or password is incorrect"});
      return;
    }
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if(JWT_SECRET == undefined) {
      throw new Error("JWT_SECRET in .env undefined");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h'});

    res.status(200).json({token});
  } catch(error) {
    console.log(error);
    res.status(500).json({error: "User login has failed due to error"})
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

export interface ExtendedRequest extends Request {
  token: JwtPayload;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace("Bearer ", "");
  console.log(token);
  if(!token) {
    res.status(401).json({error: "Unauthorized"});
    return;
  }
  try {
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if(JWT_SECRET == undefined) {
      throw new Error("JWT_SECRET in .env undefined");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as ExtendedRequest).token = decoded as JwtPayload;
    console.log((req as ExtendedRequest).token.userId);
    next();
  } catch(error) {
    console.log(error);
    res.status(403).json({error: "Invalid token"});
    return;
  }
}

export default authRouter;
