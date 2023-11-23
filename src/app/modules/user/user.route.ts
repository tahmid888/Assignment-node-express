import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();
router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllUsers);
router.get('/users/:userId', userControllers.getSingleUser);

export const userRoutes = router;
