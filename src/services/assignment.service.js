import prisma from "../config/database.js";
import { findActiveCourseByIdAndThrow } from "./course.service.js";

export const getAssignmentsByCourseIdService = async (courseId) => {
  return await prisma.assignments.findMany({
    where: {
      fk_assignments_course_id: Number(courseId)
    }
  });
};

export const createAssignmentService = async ({
  courseId,
  title,
  description,
  deadline,
  fileUrl
}) => {
  await findActiveCourseByIdAndThrow(courseId);

  return await prisma.assignments.create({
    data: {
      fk_assignments_course_id: courseId,
      title: title,
      description: description,
      deadline: deadline,
      file_url: fileUrl
    }
  })
};