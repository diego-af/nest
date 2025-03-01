import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  @Inject()
  private prisma: PrismaService;

  async createUser(userData: {
    name?: string;
    email: string;
    password: string;
  }) {
    const { name, email, password } = userData;

    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new HttpException('User already exists', 400);
    }
    const userCreated = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    if (!userCreated) {
      throw new HttpException('User not created', 500);
    }

    return userCreated;
  }

  async getAllUser() {
    const userAll = await this.prisma.user.findMany();

    if (!userAll) {
      throw new HttpException('User not found', 404);
    }

    return userAll;
  }

  async updateuser(params: { id: string; data: Prisma.UserUpdateInput }) {
    const { data, id } = params;

    const userExists = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    const userUpdatee = await this.prisma.user.update({
      data: {
        name: data.name,
      },
      where: {
        id: id,
      },
    });

    return userUpdatee;
  }
}
