import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private profilesModule: ProfileService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }
    const isMatch = await compare(pass, user.password_hash);
    if (!isMatch) {
      return null;
    }
    return {
      email: user.email,
      id: user.id,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, name: string) {
    const user = await this.usersService.create(email, password);
    if (!user) {
      return null;
    }
    await this.profilesModule.create(user, name);
    const payload = { email: user.email, id: user.id, name: name };
    return this.login(payload);
  }
}
