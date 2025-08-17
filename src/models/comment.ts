import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user';
import { Event } from './event';

export class Comment extends Model {
  id!: number;
  content!: string;
  userId!: number;
  eventId!: number;
}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    eventId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, tableName: 'comments' }
);

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Event, { foreignKey: 'eventId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Event.hasMany(Comment, { foreignKey: 'eventId' });
