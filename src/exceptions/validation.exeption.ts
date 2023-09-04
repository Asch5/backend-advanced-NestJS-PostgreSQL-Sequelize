import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  message: string;

  constructor(response: any) {
    super(response, HttpStatus.BAD_REQUEST);
  }
}
