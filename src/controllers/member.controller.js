import {
  getCourseMembersService,
  deleteMemberFromCourseService,
} from "../services/member.service.js";

export const getCoursemembers = async (req, res) => {
  try {
    const courseMembers = getCourseMembersService(req.params.courseId);
    res.json({
      success: true,
      data: courseMembers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMemberFromCourse = async (req, res) => {
  try {
    const result = deleteMemberFromCourseService(
      req.params.courseId,
      req.user.user_id
    );
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
