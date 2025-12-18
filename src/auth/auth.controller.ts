import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/entities/user/user-authorisation.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userData: {
          type: 'object',
          properties: {
            userName: {
              type: 'string',
              example: 'admin',
            },
            password: {
              type: 'string',
              example: '123456',
            },
          },
          required: ['userName', 'password'],
        },
      },
      required: ['userData'],
      example: {
        userData: {
          userName: 'admin',
          password: '123456',
        },
      },
    },
  })
  @ApiOperation({ summary: 'User login', description: 'Logs in a user with username and password' })
  async singIn(@Body('userData') userData: UserAuthDto) {
    return await this.authService.singIn(userData.userName, userData.password);
  }

  @Post('registration')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newUserData: {
          type: 'object',
          properties: {
            userName: {
              type: 'string',
              example: 'user',
            },
            password: {
              type: 'string',
              example: 'StrongPaasword123',
            },
          },
          required: ['userName', 'password'],
        },
      },
      required: ['newUserData'],
      example: {
        newUserData: {
          userName: 'user',
          password: 'StrongPass123',
        },
      },
    },
  })
  @ApiOperation({ summary: 'User registration', description: 'Registers a new user with username and password' })
  async register(@Body('newUserData') newUserData: UserRegistrationDto) {
    return await this.authService.registration(newUserData);
  }
}
