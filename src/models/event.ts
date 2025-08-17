import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user';

export class Event extends Model {
  id!: number;
  title!: string;
  description!: string;
  image!: string;
  date!: Date;
  time!: string;
  location!: string;
  type!: string;
  userId!: number;
}

Event.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, tableName: 'events' }
);

// Associations
Event.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Event, { foreignKey: 'userId' });
