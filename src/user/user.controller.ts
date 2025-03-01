import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller()
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post('/user')
  async createUserController(
    @Body() userDate: { name: string; email: string; password: string },
  ): Promise<User> {
    return await this.userService.createUser(userDate);
  }

  @Get('/user')
  async getUserController(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Put('user/:id')
  async updateUserCOntroller(
    @Body() data: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ) {
    const userUptade = await this.userService.updateuser({ id, data });

    return userUptade;
  }
}
