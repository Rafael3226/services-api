class PaymentRequiredError extends Error {
  constructor(message = "Payment Required") {
    super(message);
    this.message = message;
    this.name = "PaymentRequiredError";
    this.code = 402; // HTTP status code for Payment Required
    this.timestamp = new Date().toISOString();
  }
}

module.exports = PaymentRequiredError;
