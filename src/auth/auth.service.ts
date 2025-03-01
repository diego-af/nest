import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private jwtService: JwtService;

  async loginSerevice(data: {
    email: string | undefined;
    password: string;
  }): Promise<{ token: string }> {
    const { password } = data;
    const findUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }
    const isPasswordValid = await bcrypt.compare(password, findUser?.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: findUser.id, name: findUser.name };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
