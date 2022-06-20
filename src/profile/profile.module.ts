import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UsersModule],
  providers: [ProfileService],
  exports: [ProfileService, TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule {}
