import prisma from "../config/database.js";
import { generateCourseCode } from "../utils/generateCourseCode.js";

const findActiveCourseById = async (id) => {
  return await prisma.courses.findFirst({
    where: {
      course_id: Number(id),
      deleted_at: null,
    },
    select: {
      course_id: true,
      name: true,
      description: true,
      code: true,
      created_at: true,
      course_img: true,
      users: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const findActiveCourseByIdOrThrow = async (id) => {
  const res = await findActiveCourseById(id);
  if (!res) {
    throw new Error("Course not found");
  }
  return res;
};

export const getAllCoursesService = async () => {
  return await prisma.courses.findMany({
    where: { deleted_at: null },
    select: {
      course_id: true,
      name: true,
      description: true,
      code: true,
      created_at: true,
      course_img: true,
      users: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getCourseByIdService = async (id) => {
  const course = await findActiveCourseById(id);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

export const createCourseService = async (newCourseData, teacherData) => {
  const courseCode = await generateCourseCode();
  return await prisma.courses.create({
    data: {
      name: newCourseData.name,
      description: newCourseData.description,
      fk_courses_teacher_id: teacherData.user_id,
      code: courseCode,
    },
  });
};

export const updateCourseService = async (id, newCourseData) => {
  if (!(await findActiveCourseById(id))) {
    throw new Error("Course not found");
  }

  return await prisma.courses.update({
    where: {
      course_id: Number(id),
    },
    data: {
      name: newCourseData.name,
      description: newCourseData.description,
      course_img: newCourseData.course_img,
    },
  });
};

export const deleteCourseService = async (id) => {
  if (!(await findActiveCourseById(id))) {
    throw new Error("Course not found");
  }

  return await prisma.courses.update({
    where: {
      course_id: Number(id),
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

export const joinCourseService = async (userData, code) => {
  const userId = userData.user_id;
  const course = await prisma.courses.findFirst({
    where: {
      code: code,
      deleted_at: null,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const user = await prisma.users.findUnique({
    where: {
      user_id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingMember = await prisma.course_members.findFirst({
    where: {
      fk_course_members_course_id: course.course_id,
      fk_course_members_user_id: userId,
    },
  });

  if (existingMember) {
    throw new Error("Already in this course");
  }

  return await prisma.course_members.create({
    data: {
      fk_course_members_course_id: course.course_id,
      fk_course_members_user_id: userId,
      role: user.role,
    },
  });
};

export const getMyCoursesService = async (userData) => {
  const userId = userData.user_id;
  return await prisma.courses.findMany({
    where: {
      deleted_at: null,
      course_members: {
        some: {
          fk_course_members_user_id: userId,
        },
      },
    },
    select: {
      course_id: true,
      name: true,
      description: true,
      code: true,
      created_at: true,
      course_img: true,
      users: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getAllContentsByCourseIdService = async (courseId) => {
  await findActiveCourseByIdOrThrow(courseId);

  return await prisma.courses.findFirst({
    where: {
      course_id: Number(courseId),
    },
    select: {
      attendances: {
        where: {
          deleted_at: null,
        },
        select: {
          attendance_id: true,
          notes: true,
          deadline: true,
          created_at: true,
        },
      },
      materials: {
        where: {
          deleted_at: null,
        },
        select: {
          material_id: true,
          title: true,
          created_at: true,
        },
      },
      assignments: {
        where: {
          deleted_at: null,
        },
        select: {
          assignment_id: true,
          title: true,
          deadline: true,
          created_at: true,
        },
      },
    },
  });
};
