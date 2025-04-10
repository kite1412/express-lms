import prisma from "../config/database.js";

export const getCourseMembersService = async (courseId) => {
  return await prisma.course_members.findMany({
    where: {
      fk_course_members_course_id: Number(courseId),
    },
    include: {
      users: {
        name: true,
        role: true,
      },
    },
  });
};

export const deleteMemberFromCourseService = async (courseId, userId) => {
  return await prisma.course_members.delete({
    where: {
      fk_course_members_course_id_fk_course_members_user_id: {
        fk_course_members_course_id: Number(courseId),
        fk_course_members_user_id: Number(userId),
      },
    },
  });
};
