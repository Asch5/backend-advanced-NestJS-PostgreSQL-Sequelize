import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Title', description: 'title name' })
  @IsString({ message: 'Mast be a string' })
  readonly title: string;
  @ApiProperty({ example: 'content', description: 'some content' })
  @IsString({ message: 'Mast be a string' })
  readonly content: string;
  @ApiProperty({ example: '1', description: 'userId' })
  @IsNumber({}, { message: 'Mast be a number' })
  readonly userId: number;
}
