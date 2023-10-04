class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.message = message;
    this.name = "NotFoundError";
    this.code = 404;
    this.timestamp = new Date().toISOString();
  }
}

module.exports = NotFoundError;
