import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NaverStrategy } from './naver/naver.strategy';

@Module({
  imports: [ConfigService],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy],
})
export class AuthModule {}
