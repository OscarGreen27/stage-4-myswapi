import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/entities/user/user-authorisation.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRegistrationDto } from 'src/entities/user/user-registration.dto';

/**
 *controller responsible for user registration and authorization
 */
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: UserAuthDto })
  async singIn(@Body('userData') userData: UserAuthDto) {
    return await this.authService.singIn(userData.userName, userData.password);
  }

  @Post('registration')
  @ApiBody({ type: UserRegistrationDto })
  async register(@Body('newUserData') newUserData: UserRegistrationDto) {
    return await this.authService.registration(newUserData);
  }
}
