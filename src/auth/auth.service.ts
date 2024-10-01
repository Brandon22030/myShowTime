import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
