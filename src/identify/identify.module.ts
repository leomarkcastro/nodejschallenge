import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { IdentifyController } from './identify.controller';

@Module({
  imports: [AuthModule],
  controllers: [IdentifyController],
})
export class IdentifyModule {}
