import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

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
  @UseGuards(AuthGuard)
  @Get('/user')
  async getUserController(): Promise<User[]> {
    return await this.userService.getAllUser();
  }
  @UseGuards(AuthGuard)
  @Put('user/:id')
  async updateUserCOntroller(
    @Body() data: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ) {
    const userUptade = await this.userService.updateuser({ id, data });

    return userUptade;
  }
  @UseGuards(AuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userService.deleteuser({ id });

    if (userDeleted) {
      return {
        message: 'usuário deletado com sucesso',
      };
    }
    throw new HttpException('internal Server error', 500);
  }
}
