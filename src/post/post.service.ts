import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  @Inject()
  private readonly prisma: PrismaService;

  async createPOst(data: Prisma.PostCreateInput, id: string) {
    const post = await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: id,
      },
    });

    return post;
  }

  async getPosts(id: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: id,
      },
    });

    return posts;
  }
}
