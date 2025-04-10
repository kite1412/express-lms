import { randomBytes } from "crypto";
import prisma from "../config/database.js";

export const generateCourseCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = "C" + randomBytes(3).toString("hex").slice(0, 6);
    const existing = await prisma.courses.findUnique({
      where: {
        code: code,
      },
    });

    if (!existing) isUnique = true;
  }

  return code;
};
