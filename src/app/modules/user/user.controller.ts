import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
import { User } from '../user.model';

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not created',
      error: {
        code: 500,
        description: 'User not created!',
      },
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
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not fetched',
      error: {
        code: 404,
        description: 'User not fetched!',
      },
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error',
      },
    });
  }
};
//update the values of user
const putUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body; // Assuming the request body contains the fields to be updated
  const userToUpdate = await userServices.updateUserFromDB(userId);
  try {
    // Find the user by ID and update using updateOne
    await User.updateOne({ _id: userToUpdate }, { $set: updateData });

    if (updateData) {
      return res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: updateData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update failed!',
      error: {
        code: 500,
        description: 'Update failed!',
      },
    });
  }
};
// update the order property
const putUserOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;
  const orderToUpdate = await userServices.updateOrderFromDB(userId);

  try {
    const user = await User.findOne({ updateData });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
      return;
    }

    // Check if the user already has an 'orders' array
    if (!user.orders) {
      // If 'orders' array does not exist, create it and add the order data
      user.orders = [];
    }
    user.orders.push(orderToUpdate);

    // Save the updated user to the database
    await user.save();
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: updateData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update failed!',
      error: {
        code: 500,
        description: 'Update failed!',
      },
    });
  }
};
export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  putUser,
  putUserOrder,
};
