import { Router } from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController';
import cookieParser from 'cookie-parser';

const router = Router();
router.use(cookieParser());

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
