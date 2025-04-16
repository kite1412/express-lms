import prisma from "../config/database.js";
import { hashPassword } from "../utils/hashPassword.js";

const findActiveUserById = async (id) => {
  return await prisma.users.findFirst({
    where: {
      user_id: Number(id),
      deleted_at: null,
    },
  });
};

export const getAllUsersService = async () => {
  return await prisma.users.findMany({
    where: { deleted_at: null },
  });
};

export const getUserByIdService = async (id) => {
  if (!(await findActiveUserById(id))) {
    throw new Error("User not found");
  }

  return await prisma.users.findUnique({
    where: {
      user_id: Number(id),
    },
  });
};

export const createUserService = async (newUserData) => {
  const hashedPassword = await hashPassword(newUserData.password);
  return await prisma.users.create({
    data: {
      name: newUserData.name,
      email: newUserData.email,
      password: hashedPassword,
      role: newUserData.role,
    },
  });
};

export const updateUserService = async (id, newUserData) => {
  if (!(await findActiveUserById(id))) {
    throw new Error("User not found");
  }

  return await prisma.users.update({
    where: {
      user_id: Number(id),
    },
    data: {
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
    },
  });
};

export const deleteUserService = async (id) => {
  return await prisma.users.update({
    where: {
      user_id: Number(id),
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

export const updateUserPasswordService = async (id, password) => {
  if (!(await findActiveUserById(id))) {
    throw new Error("User not found");
  }

  const hashedPassword = hashPassword(password);

  return await prisma.users.update({
    where: {
      user_id: Number(id),
    },
    data: {
      password: hashedPassword,
    },
  });
};