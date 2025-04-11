import { loginUserService } from "../services/auth.service.js";

export const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    res
      .cookie("token", result.token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
        path: "/",
      })
      .json({
        success: true,
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No active session found",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
