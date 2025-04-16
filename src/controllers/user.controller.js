import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  updateUserPasswordService,
} from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/responses.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = deleteUserService(req.params.id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    await updateUserPasswordService(req.body);
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyInfo = async (req, res) => {
  const tokenHeader = req.headers.authorization;
  const tokenCookie = req.cookies.token;

  try {
    if (tokenHeader || tokenCookie) {
      const id = jwt.decode(tokenCookie ?? tokenHeader.split(" ")[1]).user_id;
  
      const user = await getUserByIdService(id);
  
      successResponse(res, user);
    }
  } catch (e) {
    errorResponse(res, e);
  }
};