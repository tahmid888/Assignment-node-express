import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();
//The Routes where API are hits by these routes
router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllUsers);
router.get('/users/:userId', userControllers.getSingleUser);
router.put('/users/:userId', userControllers.putUser);
router.delete('/users/:userId', userControllers.deleteUser);
router.put('/users/:userId/orders', userControllers.putUserOrder);
router.get('/users/:userId/orders', userControllers.getOrder);
router.get('/users/:userId/orders/total-price', userControllers.calculateOrder);
export const userRoutes = router;
