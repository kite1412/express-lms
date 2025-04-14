import {
  getCourseMembersService,
  deleteMemberFromCourseService,
} from "../services/member.service.js";

export const getCoursemembers = async (req, res) => {
  try {
    const courseMembers = await getCourseMembersService(req.params.courseId);
    const filteredMembers = courseMembers.map((member) => ({
      name: member.users.name,
      role: member.role,
      joined_at: member.joined_at,
    }));
    res.json({
      success: true,
      data: filteredMembers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMemberFromCourse = async (req, res) => {
  try {
    const result = await deleteMemberFromCourseService(
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
