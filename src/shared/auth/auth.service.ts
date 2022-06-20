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

    const profile = await this.profilesModule.findById(user.id);
    return {
      email: user.email,
      id: user.id,
      profile: profile,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id, profile: user.profile };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async register(email: string, password: string, name: string) {
    const user = await this.usersService.create(email, password);
    if (!user) {
      return null;
    }
    const profile = await this.profilesModule.create(user, name);
    const payload = { email: user.email, id: user.id, profile: profile };
    return this.login(payload);
  }
}
