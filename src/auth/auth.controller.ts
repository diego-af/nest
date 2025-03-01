import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/auth')
  async login(@Body() data: { email: string; password: string }) {
    return await this.authService.loginSerevice(data);
  }
}
