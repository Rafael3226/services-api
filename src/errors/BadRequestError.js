class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.name = "BadRequestError"; // Override the name property
    this.code = 400; // Set the HTTP status code for Bad Request
    this.timestamp = new Date().toISOString();
  }

  toString() {
    return JSON.stringify({ ...this, message: super.message });
  }
}

module.exports = BadRequestError;
