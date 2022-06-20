import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { jwtConstants } from './constants';

// User Object
import { UsersModule } from '../../users/users.module';

// Auth Modules
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Strategies
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    UsersModule,
    ProfileModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
