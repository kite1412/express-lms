import { initUserAdminService } from "../services/init.service.js";

export const initUserAdmin = async (req, res) => {
  try {
    const result = await initUserAdminService();
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.message === "Admin already exist") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
