import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/shared/auth/auth.service';
import { LocalAuthGuard } from 'src/shared/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class IdentifyController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const _authResult = await this.authService.register(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );

    return _authResult || { error: 'Authentication Error' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
