import {
  getGradeBySubmissionIdService,
  getGradesByAssignmentIdService,
  getGradesByStudentIdService,
  getMyGradeByAssignmentIdService,
  createGradeService,
  updateGradeService,
  deleteGradeService,
} from "../services/grade.service.js";

export const getMyGradeByAssignmentId = async (req, res) => {
  try {
    const grade = await getMyGradeByAssignmentIdService(
      req.params.assignmentId,
      req.user.user_id
    );
    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGradesByAssignmentId = async (req, res) => {
  try {
    const grades = await getGradesByAssignmentIdService(
      req.params.assignmentId
    );
    res.json({
      success: true,
      data: grades,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGradesByStudentId = async (req, res) => {
  try {
    const grades = await getGradesByStudentIdService(req.params.studentId);
    res.json({
      success: true,
      data: grades,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGradeBySubmissionId = async (req, res) => {
  try {
    const grade = await getGradeBySubmissionIdService(req.params.submissionId);
    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGrade = async (req, res) => {
  try {
    const { submission_id, score, feedback } = req.body;
    const grade = await createGradeService(
      req.user.user_id,
      submission_id,
      score,
      feedback
    );
    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const grade = await updateGradeService(
      req.user.user_id,
      req.params.gradeId,
      score,
      feedback
    );
    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    const grade = await deleteGradeService(req.params.gradeId);
    res.json({
      success: true,
      data: grade,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
