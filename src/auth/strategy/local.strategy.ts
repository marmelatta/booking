import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, passwordHash: string) {
    const user = await this.authService.validateUser(email, passwordHash);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
