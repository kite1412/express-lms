export const sendServerErrorJson = (res, message) => {
  res.status(500).json({
    success: false,
    message: message
  });
}