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

export const getAssignmentByIdService = async (id) => {
  const assignment = await prisma.assignments.findUnique({
    where: {
      assignment_id: Number(id)
    }
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
      assignment_id: Number(id)
    },
    data: {
      title: newData.title ?? assignment.title,
      description: newData.description ?? assignment.description,
      deadline: newData.deadline ?? assignment.deadline,
      file_url: newData.fileUrl ?? assignment.file_url
    }
  });
};

export const deleteAssignmentService = async (id) => {
  await getAssignmentByIdService(id);

  return await prisma.assignments.update({
    where: {
      assignment_id: Number(id)
    },
    data: {
      deleted_at: new Date()
    }
  });
};