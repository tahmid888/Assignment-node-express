import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
//create users and show
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // data validation by zod
    const zodValidationData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodValidationData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: {
        userId: userData.userId,
        username: userData.username,
        fullName: userData.fullName,
        age: userData.age,
        email: userData.email,
        isActive: userData.isActive,
        hobbies: userData.hobbies,
        address: userData.address,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong,Checked carefully',
      error: err,
    });
  }
};
//get all the users from database and field filtering to access the specific data
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    const includeUsers = result.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: includeUsers,
    });
  } catch (err) {
    console.log(err);
  }
};
// get only a single users
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userExists = await userServices.getSingleUserFromDB(userId);

    if (userExists) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: userExists,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
