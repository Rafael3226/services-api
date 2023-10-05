const errorHandle = (error, _, res, next) => {
  if (error.code) {
    res
      .status(error.code)
      .json({ error: { message: error.message, ...error } });
  } else {
    // If it's an unknown error, respond with a generic 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
  next();
};

module.exports = { errorHandle };
