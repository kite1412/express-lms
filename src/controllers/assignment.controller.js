import { getAssignmentsByCourseIdService } from "../services/assignment.service.js";
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