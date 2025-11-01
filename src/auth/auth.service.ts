import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationDto } from 'src/entities/user/user-registration.dto';
import { UserService } from 'src/entities/user/user.service';

/**
 * service for user authorization and registration
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *user authorization method.
   *checks whether the user exists in the database and whether the correct password was entered
   * @param username - login/username
   * @param pass - user password
   * @returns jwt token if the user is authorized, throws an error if incorrect data is entered or the user does not exist
   */
  async singIn(
    username: string,
    pass: string,
  ): Promise<{
    access_token: string;
  }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, userName: user.userName, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  /**
   *function for registering new users, checks if the username exists in the database
   * @param newUserData new user name and password
   * @returns - true if registration is successful, false if an error occurred during registration
   */
  async registration(newUserData: UserRegistrationDto) {
    if (await this.userService.itUserExist(newUserData.userName)) {
      throw new ConflictException(`${newUserData.userName} allready exist`);
    }
    const result = await this.userService.addNewUser(newUserData);
    if (result) {
      return { ok: true };
    } else {
      return {
        ok: false,
      };
    }
  }
}
