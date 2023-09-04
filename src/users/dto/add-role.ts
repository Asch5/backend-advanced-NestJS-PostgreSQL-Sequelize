import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  @IsString({ message: 'Mast be a string' })
  readonly value: string;
  @ApiProperty({ example: '123', description: 'userId' })
  @IsNumber({}, { message: 'Mast be a number' })
  readonly userId: number;
}
