import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({ status: 200, type: post })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.createPost(dto, image);
  }

  // @ApiOperation({ summary: 'get role' })
  // @ApiResponse({ status: 200, type: [Role] })
  // @Get(':value')
  // getByValue(@Param('value') value: string) {
  //   return this.roleService.getRoleByValue(value);
  // }
}
