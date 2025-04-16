import prisma from "../config/database.js";
import HttpError from "../errors/HttpError.js";

const statuses = [
  "absent",
  "present",
  "excused",
  "late"
];

const findAttendanceOrThrow = async (id) => {
  const res = await prisma.attendances.findFirst({
    where: {
      attendance_id: id,
      deleted_at: null
    }
  });

  if (!res) {
    throw new HttpError(400, "No Attendance found with id: " + id);
  }

  return res;
}

export const createAttendanceService = async ({
  courseId,
  notes,
  deadline
}) => {
  return prisma.attendances.create({
    data: {
      fk_attendances_course_id: courseId,
      notes: notes ?? null,
      deadline: deadline ?? null   
    }
  })
};

const resolveAttendanceStatus = (deadline) => {
  const now = new Date();

  if (deadline) {
    if (now < deadline) return "present"
    else return "late";
  } else return "present";
};

export const fillAttendanceService = async ({
  attendanceId,
  studentId,
  isExcused
}) => {
  const res = await findAttendanceOrThrow(attendanceId);

  return prisma.attendance_records.create({
    data: {
      fk_attendance_records_attendances_id: attendanceId,
      fk_attendance_records_student_id: studentId,
      status: isExcused ? "excused" : resolveAttendanceStatus(res.deadline)
    }
  });
};

export const deleteAttendanceService = async (id) => {
  return prisma.attendances.delete({
    where: {
      attendance_id: id
    }
  })
};