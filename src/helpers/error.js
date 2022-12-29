class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// err: instance của AppError
const handleErrors = (err, req, res, next) => {
  // Kiểm tra err có phải là instance của AppError hay không
  // Nếu err là instance của AppErrorm nghĩa là mình đã biết và xử lí
  // Nếu là những lỗi không phải là instance của AppError, thì có thể vì một lí do nào đó nó bị lỗi mà mình chưa biết được
  // instanceof là một biến có phải tạo ra từ class hay không
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Internal Server");
  }

  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message: message,
  });

  // Nếu có các middleware phía sau, gọi next() để có thể đi tới các middleware phía sau
  next();
};

module.exports = {
  AppError,
  handleErrors,
};
