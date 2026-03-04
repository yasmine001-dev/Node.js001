const errorHandlingMW = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Internal Server Error";

  // Invalid Mongo ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  }


  res.status(statusCode).json({
    status: statusCode.toString().startsWith("4") ? "fail" : "error",
    message,
  });
};

export default errorHandlingMW;

// {
//   "status": "fail",
//   "message": "Category name is required"
// }