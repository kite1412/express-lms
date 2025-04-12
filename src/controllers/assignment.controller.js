import { createAssignmentService, getAssignmentByIdService, getAssignmentsByCourseIdService } from "../services/assignment.service.js";
import { sendServerErrorJson } from "../utils/responses.js";

export const getAssigmentsByCourseId = async (req, res) => {
  try {
    const assignments = await getAssignmentsByCourseIdService(req.params.courseId);
    res.json({
      success: true,
      data: assignments
    });
  } catch (e) {
    sendServerErrorJson(res, e.message);
  }
}

export const createAssignment = async (req, res) => {
  try {
    const body = req.body; 
    const newAssignment = await createAssignmentService({
      courseId: Number(body.courseId) ?? 0,
      title: body.title,
      description: body.description,
      deadline: new Date(body.deadline),
      fileUrl: body.fileUrl
    });
    res.json({
      success: true,
      data: newAssignment
    })
  } catch (e) {
    sendServerErrorJson(res, e.message);
  }
}

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await getAssignmentByIdService(req.params.id);

    res.json({
      success: true,
      data: assignment
    });
  } catch (e) {
    sendServerErrorJson(res, e.message);
  }
}