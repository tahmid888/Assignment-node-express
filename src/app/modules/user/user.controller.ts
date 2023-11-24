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
    const userId = req.params.userId;
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
  const updateData = req.body;
  const userToUpdate = await userServices.updateUserFromDB(userId);

  try {
    // Find the user by ID and update using updateOne
    await User.updateOne(
      { _Id: userToUpdate },
      { $set: updateData },
      { new: true, projection: { password: 0 } },
    );

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

// delete the users by their id

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const result = await User.deleteOne({ userId: userId });
    // If deletedCount is 0, it means the user was not found
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'delete failed!',
      error: {
        code: 500,
        description: 'delete failed!',
      },
    });
  }
};

// update the order property
const putUserOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    const user = await userServices.updateOrderFromDB(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }
    // Checking if the user  has an orders
    if (!user.orders) {
      // If orders array does not exist create order and add the order data
      user.orders = [];
    }
    user.orders.push(updateData);

    await user.save();
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update failed to order!',
      error: {
        code: 500,
        description: 'Update failed to order!',
      },
    });
  }
};
// get  the order property
const getOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await userServices.getOrderFromDB(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    // If the user has no orders it will an return  empty array
    if (!user.orders || user.orders.length === 0) {
      return res.json({
        success: true,
        message: 'No orders found for the user',
        data: { orders: [] },
      });
    }
    const ordersPlaced = user.orders.map((order) => ({
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
    }));

    res.json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: ordersPlaced },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Filed to find order',
      error: {
        code: 500,
        description: 'Filed to find order',
      },
    });
  }
};
// calculate the total price of order
const calculateOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await userServices.calculateOrderFromDB(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    // If the user has no orders then  return total price
    if (!user.orders || user.orders.length === 0) {
      return res.json({
        success: true,
        message: 'No orders found for the user',
        data: { totalPrice: 0 },
      });
    }

    // Calculate the total price of all orders in the list
    const totalPrice = user.orders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    );

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate total price',
      error: {
        code: 500,
        description: 'Failed to calculate total price',
      },
    });
  }
};
export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  putUser,
  deleteUser,
  putUserOrder,
  getOrder,
  calculateOrder,
};
