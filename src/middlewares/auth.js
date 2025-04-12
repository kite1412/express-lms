import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  let authHeaderToken = req.headers.authorization;

  if (!token && !authHeaderToken) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Token missing" });
  }

  if (typeof authHeaderToken === "string") {
    const content = authHeaderToken.split(" ");
    if (content.length === 2) {
      authHeaderToken = content[1];
    }
  }

  try {
    const decoded = jwt.verify(token || authHeaderToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Access denied" });
    }
    next();
  };
};
