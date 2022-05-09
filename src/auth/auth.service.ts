import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/entities/User';
import { UserService } from 'src/user/user.service';
import { getConnection } from 'typeorm';
import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateNaverUser(user_email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(user_email);
    if (!user) {
      return null;
    }
    return user;
  }
  async validateUser(user_id: string, user_password: string): Promise<User> {
    const user: User = await this.userService.findUserById(user_id);
    if (!user) {
      throw new UnauthorizedException('이메일을 확인해주세요');
    }
    const isSamePassword: boolean = await bcrypt.compare(
      user_password,
      user.userPassword,
    );
    if (!isSamePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요');
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = {
      user_number: user.userNumber,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      user_number: user.userNumber,
      user_token: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '50m',
    });

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    this.userService.refreshUserToken(user, refresh_token);
    return refresh_token;
  }

  onceToken(user_profile: any) {
    const payload = {
      user_email: user_profile.user_email,
      user_nick: user_profile.user_nick,
      user_provider: user_profile.user_provider,
      user_token: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
