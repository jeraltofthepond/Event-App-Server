import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user';
import { Event } from './event';

export class Attendance extends Model {
  id!: number;
  status!: 'going' | 'interested' | 'not going';
  userId!: number;
  eventId!: number;
}

Attendance.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.ENUM('going', 'interested', 'not going'), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    eventId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, tableName: 'attendances' }
);

// Associations
Attendance.belongsTo(User, { foreignKey: 'userId' });
Attendance.belongsTo(Event, { foreignKey: 'eventId' });
User.hasMany(Attendance, { foreignKey: 'userId' });
Event.hasMany(Attendance, { foreignKey: 'eventId' });
