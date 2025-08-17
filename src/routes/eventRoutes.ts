import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addAttendance,
  addComment
} from '../controllers/eventController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// Attendance & comments
router.post('/attendance', authMiddleware, addAttendance);
router.post('/comment', authMiddleware, addComment);

export default router;
