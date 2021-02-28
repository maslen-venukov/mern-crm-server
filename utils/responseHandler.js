const responseHandler = (res, status, message) => {
  res.status(status).json({ message });
}

module.exports = responseHandler;