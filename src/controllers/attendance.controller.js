import {
  createAttendanceService,
  deleteAttendanceService,
  fillAttendanceService,
  findAttendanceOrThrow,
  getAttendancesByCourseIdService,
  getAttendanceRecordsService,
} from "../services/attendance.service.js";
import { successResponse, errorResponse } from "../utils/responses.js";

export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await findAttendanceOrThrow(req.params.id);

    successResponse(res, attendance);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const getAttendancesByCourseId = async (req, res) => {
  try {
    const attendances = await getAttendancesByCourseIdService(
      req.params.courseId
    );

    successResponse(res, attendances);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const getAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await getAttendanceRecordsService(
      req.params.attendanceId
    );

    const filteredAttendanceRecords = attendanceRecords.map((record) => ({
      attendance_record_id: record.attendance_record_id,
    }));
    successResponse(res, attendanceRecords);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const createAttendance = async (req, res) => {
  try {
    const newAttendance = await createAttendanceService(req.body);

    successResponse(res, newAttendance);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const fillAttendance = async (req, res) => {
  try {
    const body = req.body;
    const newRecord = await fillAttendanceService({
      attendanceId: req.params.id,
      studentId: req.user.user_id,
      isExcused: body.isExcused ?? false,
    });

    successResponse(res, newRecord);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const deleted = await deleteAttendanceService(req.params.id);

    successResponse(res, deleted);
  } catch (e) {
    errorResponse(res, e);
  }
};
