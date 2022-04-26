import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/authConfig';
@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ load: [authConfig] }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
