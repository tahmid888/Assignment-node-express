import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();
router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllUsers);
router.get('/users/:userId', userControllers.getSingleUser);
router.put('/users/:userId', userControllers.putUser);
router.delete('/users/:userId', userControllers.deleteUser);
router.put('/users/:userId/orders', userControllers.putUserOrder);
router.get('/users/:userId/orders', userControllers.getOrder);
export const userRoutes = router;
