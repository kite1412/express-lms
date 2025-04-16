import {
  getMaterialByIdService,
  getAllMaterialsByCourseIdService,
  createMaterialService,
  updateMaterialService,
  deleteMaterialService,
} from "../services/materials.service.js";

export const getAllMaterialsByCourseId = async (req, res) => {
  try {
    const materials = await getAllMaterialsByCourseIdService(
      req.params.courseId
    );
    res.json({
      success: true,
      data: materials,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMaterialById = async (req, res) => {
  try {
    const material = await getMaterialByIdService(req.params.materialId);
    res.json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const { course_id, title, description, file_url } = req.body;
    const material = await createMaterialService(
      req.user.user_id,
      course_id,
      title,
      description,
      file_url
    );
    res.json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const { title, description, file_url } = req.body;
    const material = await updateMaterialService(
      req.params.materialId,
      title,
      description,
      file_url
    );
    res.json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const material = await deleteMaterialService(req.params.materialId);
    res.json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
