import { Request, Response } from 'express';
import { userServices } from './user.service';
//create users
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
//get the users
export const userControllers = {
  createUser,
};
