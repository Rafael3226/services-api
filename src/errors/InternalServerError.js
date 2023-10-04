class InternalServerError extends Error {
  constructor(message = "An error occurred") {
    super(message);
    this.message = message;
    this.name = "InternalServerError";
    this.code = 500;
    this.timestamp = new Date().toISOString();
  }
}

module.exports = InternalServerError;
