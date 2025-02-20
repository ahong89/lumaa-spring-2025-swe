import { Sequelize, Model, DataTypes } from 'sequelize';

// Set up Sequelize instance
const dotenv = require('dotenv');
dotenv.config();

const postgres_url: string = "postgres://postgres:psqlpassword@localhost:5432/task_db";
const sequelize = new Sequelize(postgres_url);

// Define a User model
export class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
}

export class Task extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare isComplete: boolean;
  declare userId: number;
}

User.init(
  { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'User',
  }
);

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Task',
  }
)

User.hasMany(Task, {
  foreignKey: 'userId'
})
Task.belongsTo(User)

export default sequelize;
