import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, passHash: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.passwordHash === passHash) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      role: user.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
