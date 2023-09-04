import { Injectable } from '@nestjs/common/decorators';
import { PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      let message = errors.map((e) => {
        return `${e.property} - ${Object.values(e.constraints).join(', ')}`;
      });

      throw new ValidationException(message);
    }
    return value;
  }
}
