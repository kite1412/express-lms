import { 
  createAttendanceService, 
  deleteAttendanceService, 
  fillAttendanceService, 
  findAttendanceOrThrow 
} from "../services/attendance.service.js";
import {
  successResponse,
  errorResponse
} from "../utils/responses.js";

export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await findAttendanceOrThrow(req.params.id);

    successResponse(res, attendance);
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
      studentId: body.studentId,
      isExcused: body.isExcused ?? false
    })

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