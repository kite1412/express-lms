import {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
  joinCourseService,
  getMyCoursesService,
} from "../services/course.service.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCoursebyId = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await createCourseService(req.body, req.user);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await updateCourseService(req.params.id, req.body);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await deleteCourseService(req.params.id);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const joinCourse = async (req, res) => {
  try {
    const course = await joinCourseService(req.user, req.params.code);
    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await getMyCoursesService(req.user);
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
