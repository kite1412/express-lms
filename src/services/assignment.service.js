import prisma from "../config/database.js";
import { findActiveCourseByIdAndThrow } from "./course.service.js";
import { getMyCourses } from "../controllers/course.controller.js";

export const getAssignmentsByCourseIdService = async (courseId) => {
  return await prisma.assignments.findMany({
    where: {
      fk_assignments_course_id: Number(courseId),
    },
  });
};

export const getMyAssignmentsService = async (userId) => {
  const courses = await prisma.courses.findMany({
    where: {
      deleted_at: null,
      course_members: {
        some: {
          fk_course_members_user_id: Number(userId),
        },
      },
    },
  });

  const courseIds = courses.map((course) => course.course_id);

  if (courseIds.length === 0) {
    throw new Error("User is not enrolled in any courses");
  }

  return await prisma.assignments.findMany({
    where: {
      fk_assignments_course_id: {
        in: courseIds,
      },
    },
    select: {
      assignment_id: true,
      title: true,
      deadline: true,
    },
  });
};

export const createAssignmentService = async ({
  courseId,
  title,
  description,
  deadline,
  fileUrl,
}) => {
  await findActiveCourseByIdAndThrow(courseId);

  return await prisma.assignments.create({
    data: {
      fk_assignments_course_id: courseId,
      title: title,
      description: description,
      deadline: deadline,
      file_url: fileUrl,
    },
  });
};

export const getAssignmentByIdService = async (id) => {
  const assignment = await prisma.assignments.findUnique({
    where: {
      assignment_id: Number(id),
    },
  });

  if (!assignment) {
    throw new HttpError(400, "No assignment with id " + id);
  }

  return assignment;
};

export const updateAssignmentService = async (id, newData) => {
  const assignment = await getAssignmentByIdService(id);

  return await prisma.assignments.update({
    where: {
      assignment_id: Number(id),
    },
    data: {
      title: newData.title ?? assignment.title,
      description: newData.description ?? assignment.description,
      deadline: newData.deadline ?? assignment.deadline,
      file_url: newData.fileUrl ?? assignment.file_url,
    },
  });
};

export const deleteAssignmentService = async (id) => {
  await getAssignmentByIdService(id);

  return await prisma.assignments.update({
    where: {
      assignment_id: Number(id),
    },
    data: {
      deleted_at: new Date(),
    },
  });
};
