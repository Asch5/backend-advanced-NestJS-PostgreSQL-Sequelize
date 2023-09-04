import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface PostsCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostsCreationAttrs> {
  ///
  @ApiProperty({ example: '1', description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  ///
  @ApiProperty({ example: 'Title', description: 'title name' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  ///
  @ApiProperty({ example: 'content', description: 'some content' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;
  ///
  @ApiProperty({
    example: 'image',
    description: 'image name',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;
  //
  @ApiProperty({ example: '1', description: 'userId' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
