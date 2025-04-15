import prisma from "../config/database.js";

export const getMyGradeByAssignmentIdService = async (
  assignmentId,
  studentId
) => {
  return await prisma.grades.findFirst({
    where: {
      submissions: {
        fk_submissions_assignment_id: Number(assignmentId),
        fk_submissions_student_id: Number(studentId),
      },
    },
  });
};

export const getGradesByAssignmentIdService = async (assignmentId) => {
  return await prisma.grades.findMany({
    where: {
      submissions: {
        fk_submissions_assignment_id: Number(assignmentId),
      },
    },
  });
};

export const getGradesByStudentIdService = async (studentId) => {
  return await prisma.grades.findMany({
    where: {
      submissions: {
        fk_submissions_student_id: Number(studentId),
      },
    },
  });
};

export const getGradeBySubmissionIdService = async (submissionId) => {
  return await prisma.grades.findFirst({
    where: {
      fk_grades_submission_id: Number(submissionId),
    },
  });
};

export const createGradeService = async (
  teacherId,
  submissionId,
  score,
  feedback
) => {
  const existingGrade = await prisma.grades.findFirst({
    where: {
      fk_grades_submission_id: Number(submissionId),
    },
  });

  if (existingGrade) {
    throw new Error("Already graded");
  }

  return await prisma.grades.create({
    data: {
      fk_grades_submission_id: Number(submissionId),
      fk_grades_teacher_id: Number(teacherId),
      score: score,
      feedback: feedback,
      graded_at: new Date(),
    },
  });
};

export const updateGradeService = async (
  teacherId,
  gradeId,
  score,
  feedback
) => {
  return await prisma.grades.update({
    where: {
      grades_id: Number(gradeId),
    },
    data: {
      fk_grades_teacher_id: Number(teacherId),
      score: score,
      feedback: feedback,
      graded_at: new Date(),
    },
  });
};

export const deleteGradeService = async (gradeId) => {
  return await prisma.grades.delete({
    where: {
      grades_id: Number(gradeId),
    },
  });
};
