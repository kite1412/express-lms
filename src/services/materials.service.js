import prisma from "../config/database.js";

export const getAllMaterialsByCourseIdService = async (courseId) => {
  return await prisma.materials.findMany({
    where: {
      fk_materials_course_id: courseId,
      deleted_at: null,
    },
  });
};

export const getMaterialByIdService = async (materialId) => {
  return await prisma.materials.findFirst({
    where: {
      material_id: Number(materialId),
      deleted_at: null,
    },
  });
};

export const createNewMaterialService = async (
  teacherId,
  courseId,
  title,
  description,
  fileUrl
) => {
  return await prisma.materials.create({
    data: {
      fk_materials_course_id: courseId,
      fk_materials_teacher_id: teacherId,
      title: title,
      description: description,
      file_url: fileUrl,
    },
  });
};

export const updateMaterialService = async (
  materialId,
  title,
  description,
  fileUrl
) => {
  return await prisma.materials.update({
    where: {
      material_id: materialId,
      deleted_at: null,
    },
    data: {
      title: title,
      description: description,
      file_url: fileUrl,
    },
  });
};

export const deleteMaterialService = async (materialId) => {
  return await prisma.materials.update({
    where: {
      material_id: materialId,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};
