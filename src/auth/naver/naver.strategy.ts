import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    readonly config: ConfigService,
  ) {
    super({
      clientID: config.get('NAVER_CLIENT_ID'),
      clientSecret: config.get('NAVER_CLIENT_SECRET'),
      callbackURL: config.get('NAVER_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const user_email = profile._json.email;
    const user_nick = profile._json.nickname;
    const user_provider = profile.provider;
    const user_profile = {
      user_email,
      user_nick,
      user_provider,
    };

    const user = await this.authService.validateUser(user_email);
    if (user === null) {
      return fail;
    }

    return done(null, user);
  }
}
