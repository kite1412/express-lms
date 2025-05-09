import HttpError from "../errors/HttpError.js";
import {
  createAssignmentService,
  deleteAssignmentService,
  getAssignmentByIdService,
  getAssignmentsByCourseIdService,
  updateAssignmentService,
  getMyAssignmentsService,
} from "../services/assignment.service.js";
import {
  errorResponse,
  successResponse
} from "../utils/responses.js";

export const getAssigmentsByCourseId = async (req, res) => {
  try {
    const assignments = await getAssignmentsByCourseIdService(
      req.params.courseId
    );

    successResponse(res, assignments);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const getMyAssignments = async (req, res) => {
  try {
    const assignments = await getMyAssignmentsService(req.user.user_id);
    successResponse(res, assignments);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const createAssignment = async (req, res) => {
  try {
    const body = req.body;
    const newAssignment = await createAssignmentService({
      courseId: Number(req.params.courseId) ?? 0,
      title: body.title,
      description: body.description,
      deadline: new Date(body.deadline),
      fileUrl: body.fileUrl,
    });

    successResponse(res, newAssignment);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await getAssignmentByIdService(req.params.id);

    successResponse(res, assignment);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const newAssignment = await updateAssignmentService(
      req.params.id,
      req.body
    );

    successResponse(res, newAssignment);
  } catch (e) {
    errorResponse(res, e);
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await deleteAssignmentService(req.params.id);

    successResponse(res, deletedAssignment);
  } catch (e) {
    errorResponse(res, e);
  }
};
