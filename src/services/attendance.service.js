import prisma from "../config/database.js";
import HttpError from "../errors/HttpError.js";
import { findActiveCourseByIdOrThrow } from "./course.service.js";

export const findAttendanceOrThrow = async (id) => {
  const res = await prisma.attendances.findFirst({
    where: {
      attendance_id: Number(id),
      deleted_at: null,
    },
  });

  if (!res) {
    throw new HttpError(400, "No Attendance found with id: " + id);
  }

  return res;
};

export const getAttendancesByCourseIdService = async (courseId) => {
  return await prisma.attendances.findMany({
    where: {
      fk_attendances_course_id: Number(courseId),
    },
  });
};

export const createAttendanceService = async ({
  courseId,
  notes,
  deadline,
}) => {
  return await prisma.attendances.create({
    data: {
      fk_attendances_course_id: Number(courseId),
      notes: notes ?? null,
      deadline: deadline ?? null,
    },
  });
};

const resolveAttendanceStatus = (deadline) => {
  const now = new Date();

  if (deadline) {
    if (now < deadline) return "present";
    else return "late";
  } else return "present";
};

export const fillAttendanceService = async ({
  attendanceId,
  studentId,
  isExcused,
}) => {
  const res = await findAttendanceOrThrow(attendanceId);

  return prisma.attendance_records.create({
    data: {
      fk_attendance_records_attendances_id: Number(attendanceId),
      fk_attendance_records_student_id: Number(studentId),
      status: isExcused ? "excused" : resolveAttendanceStatus(res.deadline),
    },
  });
};

export const getAttendanceRecordsService = async (attendanceId) => {
  return await prisma.attendance_records.findMany({
    where: {
      fk_attendance_records_attendances_id: Number(attendanceId),
    },
    select: {
      attendance_record_id: true,
      status: true,
      fill_date: true,
      users: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

export const deleteAttendanceService = async (id) => {
  await findAttendanceOrThrow(id);

  return await prisma.attendances.update({
    where: {
      attendance_id: Number(id),
    },
    data: {
      deleted_at: new Date(),
    },
  });
};
