import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  naverlogin() {}
  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  naverLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect('https://www.vinarc.co.kr/login/success/' + jwt);
    } else {
      res.redirect('https://www.vinarc.co.kr/login/failure');
    }
  }
}
