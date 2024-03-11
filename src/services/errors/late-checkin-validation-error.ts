export class LateCheckinValidationError extends Error {
  constructor() {
    super('Checkin can only be validate until 20 minutes of its creation!')
  }
}
