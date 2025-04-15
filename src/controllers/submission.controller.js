import {
  getAllSubmissionsByAssignmentService,
  getSubmissionByIdService,
  getMySubmissionService,
  createSubmissionService,
  updateSubmissionService,
  deleteSubmissionService,
} from "../services/submission.service.js";

export const getAllSubmissionsByAssignment = async (req, res) => {
  try {
    const submissions = await getAllSubmissionsByAssignmentService(
      req.query.assignmentId
    );
    const filteredSubmissions = submissions.map((submission) => ({
      submission_id: submission.submission_id,
      assignment_id: submission.fk_submissions_assignment_id,
      file_url: submission.file_url,
      submitted_at: submission.submitted_at,
      owner: submission.users,
      grades: submission.grades,
    }));
    res.json({
      success: true,
      data: filteredSubmissions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const submission = await getSubmissionByIdService(req.params.submissionId);
    const filteredSubmission = {
      submission_id: submission.submission_id,
      assignment_id: submission.fk_submissions_assignment_id,
      file_url: submission.file_url,
      submitted_at: submission.submitted_at,
      owner: submission.users,
      grades: submission.grades,
    };
    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }
    res.json({
      success: true,
      data: filteredSubmission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMySubmission = async (req, res) => {
  try {
    const submission = await getMySubmissionService(
      req.params.assignmentId,
      req.user.user_id
    );
    const filteredSubmission = {
      submission_id: submission.submission_id,
      assignment_id: submission.fk_submissions_assignment_id,
      file_url: submission.file_url,
      submitted_at: submission.submitted_at,
      owner: submission.users,
      grades: submission.grades,
    };
    res.json({
      success: true,
      data: filteredSubmission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSubmission = async (req, res) => {
  try {
    const submission = await createSubmissionService(
      req.query.assignmentId,
      req.user.user_id,
      req.body.file_url
    );
    res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSubmission = async (req, res) => {
  try {
    const { file_url } = req.body;
    const submission = await updateSubmissionService(
      req.params.submissionId,
      file_url
    );

    res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSubmission = async (req, res) => {
  try {
    const submission = await deleteSubmissionService(req.params.submissionId);
    res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
