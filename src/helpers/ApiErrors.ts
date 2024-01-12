import HttpStatus from 'http-status-codes'

export class ApiErrors extends Error {
  public readonly statusCode: number
  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends ApiErrors {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
  }
}

export class NotFoundError extends ApiErrors {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}

export class InternalServerError extends ApiErrors {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class UnauthorizedError extends ApiErrors {
  constructor() {
    super('Unauthorized', HttpStatus.UNAUTHORIZED)
  }
}