import prisma from "../config/database.js";

export const getAllSubmissionsByAssignmentService = async (assignmentId) => {
  return await prisma.submissions.findMany({
    where: {
      fk_submissions_assignment_id: Number(assignmentId),
    },
    select: {
      submission_id: true,
      fk_submissions_assignment_id: true,
      file_url: true,
      submitted_at: true,
      users: {
        select: {
          name: true,
          email: true,
        },
      },
      grades: true,
    },
  });
};

export const getSubmissionByIdService = async (submissionId) => {
  return await prisma.submissions.findFirst({
    where: {
      submission_id: Number(submissionId),
    },
    select: {
      submission_id: true,
      fk_submissions_assignment_id: true,
      file_url: true,
      submitted_at: true,
      users: {
        select: {
          name: true,
          email: true,
        },
      },
      grades: true,
    },
  });
};

export const getMySubmissionService = async (assignmentId, studentId) => {
  return await prisma.submissions.findFirst({
    where: {
      fk_submissions_assignment_id: Number(assignmentId),
      fk_submissions_student_id: studentId,
    },
    select: {
      submission_id: true,
      fk_submissions_assignment_id: true,
      file_url: true,
      submitted_at: true,
      users: {
        select: {
          name: true,
          email: true,
        },
      },
      grades: true,
    },
  });
};

export const createSubmissionService = async (
  assignmentId,
  studentId,
  fileUrl
) => {
  return await prisma.submissions.create({
    data: {
      fk_submissions_assignment_id: Number(assignmentId),
      fk_submissions_student_id: Number(studentId),
      file_url: fileUrl,
    },
  });
};

export const updateSubmissionService = async (submissionId, newFileUrl) => {
  return await prisma.submissions.update({
    where: {
      submission_id: Number(submissionId),
    },
    data: {
      file_url: newFileUrl,
    },
  });
};

export const deleteSubmissionService = async (submissionId) => {
  return await prisma.submissions.delete({
    where: {
      submission_id: Number(submissionId),
    },
  });
};
