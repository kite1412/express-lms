import HttpError from "../errors/HttpError.js";

export const sendServerErrorJson = (res, message) => {
  res.status(500).json({
    success: false,
    message: message
  });
};

export const errorResponse = (res, err) => {
  if (err instanceof HttpError) {
    res.status(err.code).json({
      success: false,
      message: err.message,
    });
  } else {
    sendServerErrorJson(res, err.message);
  }
};

export const successResponse = (res, data) => {
  res.json({
    success: true,
    data: data
  });
};