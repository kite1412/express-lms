import prisma from "../config/database.js";
import { hashPassword } from "../utils/hashPassword.js";

export const initUserAdminService = async () => {
  const adminExists = await prisma.users.findFirst({
    where: {
      email: "admin@gmail.com",
    },
  });

  if (adminExists) {
    throw new Error("Admin already exist");
  }

  const hashedPassword = await hashPassword("admin123");

  return prisma.users.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  });
};
