import cors from "cors";

import authRouter from './routes/auth';
import taskRouter from './routes/tasks';

import sequelize from './config';

try {
  await sequelize.authenticate();
  sequelize.sync({alter: true}).then(() => {
    console.log("Tables synced!");
  })
  console.log("Database established!");
} catch(error) {
  console.log("Unable to connect", error);
}

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use(taskRouter);

export default app;
