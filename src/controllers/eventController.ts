import { Request, Response } from 'express';
import { Event } from '../models/event';
import { Attendance } from '../models/attendance';
import { Comment } from '../models/comment';
import { Op } from 'sequelize';

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const existing = await Event.findOne({ where: { title: req.body.title } });
    if (existing) return res.status(400).json({ message: 'Event title must be unique' });

    const newEvent = await Event.create({ ...req.body, userId: (req as any).user.id });
    res.status(201).json(newEvent);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get Events with search & pagination
export const getEvents = async (req: Request, res: Response) => {
  const { page = 1, limit = 50, search, location, date } = req.query;
  const offset = (+page - 1) * +limit;

  const where: any = {};
  if (search) where.title = { [Op.iLike]: `%${search}%` };
  if (location) where.location = { [Op.iLike]: `%${location}%` };
  if (date) where.date = date;

  const Events = await Event.findAll({
    where,
    limit: +limit,
    offset,
    include: [{ model: Attendance }, { model: Comment }]
  });

  res.json(Events);
};

// Get single Event
export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const e = await Event.findByPk(id, { include: [Attendance, Comment] });
  if (!e) return res.status(404).json({ message: 'Event not found' });
  res.json(e);
};

// Update Event (only owner)
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const e = await Event.findByPk(id);
  if (!e) return res.status(404).json({ message: 'Event not found' });
  if (e.userId !== (req as any).user.id) return res.status(403).json({ message: 'Forbidden' });

  await e.update(req.body);
  res.json(e);
};

// Delete Event (only owner)
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const e = await Event.findByPk(id);
  if (!e) return res.status(404).json({ message: 'Event not found' });
  if (e.userId !== (req as any).user.id) return res.status(403).json({ message: 'Forbidden' });

  await e.destroy();
  res.json({ message: 'Event deleted' });
};

// Add Attendance
export const addAttendance = async (req: Request, res: Response) => {
  const { EventId, status } = req.body;
  const existing = await Attendance.findOne({ where: { EventId, userId: (req as any).user.id } });
  if (existing) {
    await existing.update({ status });
    return res.json(existing);
  }
  const newAtt = await Attendance.create({ EventId, userId: (req as any).user.id, status });
  res.json(newAtt);
};

// Add Comment
export const addComment = async (req: Request, res: Response) => {
  const { EventId, content } = req.body;
  const newComment = await Comment.create({ EventId, userId: (req as any).user.id, content });
  res.json(newComment);
};
