import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Prisma } from '@prisma/client';
import { PostService } from './post.service';

interface Payload {
  sub: string;
  name: string;
  iat: number;
  exp: number;
}

@Controller()
export class PostController {
  @Inject()
  private readonly postService: PostService;

  @UseGuards(AuthGuard)
  @Get('/posts')
  async getPost(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req['user'] as Payload;

    const posts = await this.postService.getPosts(user.sub);

    return {
      message: 'aqui',
      postsAll: posts,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/posts')
  async createPosts(@Body() data: Prisma.PostCreateInput, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req['user'] as Payload;

    const postCreated = await this.postService.createPOst(data, user?.sub);
    console.log(user);
    return {
      message: 'Post criado com sucesso',
      post: postCreated,
    };
  }
}
