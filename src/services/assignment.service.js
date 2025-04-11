import prisma from "../config/database.js";

export const getAssignmentsByCourseIdService = async (courseId) => {
  return prisma.assignments.findMany({
    where: {
      fk_assignments_course_id: Number(courseId)
    }
  });
}