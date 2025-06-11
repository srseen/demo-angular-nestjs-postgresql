import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  ValidationPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, AuthResponseDto } from './dto/auth.dto';
import { LocalAuthGuard, JwtAuthGuard } from './guards/auth.guards';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor) // ใช้สำหรับซ่อน password ใน response
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req: { user: Omit<User, 'password'> },
  ): Promise<AuthResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: { user: { id: number } }) {
    return this.authService.getProfile(req.user.id);
  }
}
