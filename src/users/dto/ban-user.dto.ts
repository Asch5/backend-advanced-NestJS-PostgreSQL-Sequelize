import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: '123', description: 'userId' })
  readonly userId: string;
  @ApiProperty({
    example: 'banReason bla-bla-bla',
    description: "banReason's description",
  })
  readonly banReason: string;
}
