import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { NaverAuthGuard } from 'src/auth/guard/navar-auth.guard';
import {
  Body,
  Controller,
  Get,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from 'src/entity/entities/User';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refreshToken-auth.guard';
import { RegistUserDTO } from './dto/registUser.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '네이버 로그인',
    description: '네이버 로그인을 하는 API입니다.',
  })
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver')
  async naverlogin() {
    return;
  }

  @ApiOperation({
    summary: '네이버 로그인 콜백',
    description: '네이버 로그인시 콜백 라우터입니다.',
  })
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver/callback')
  async callback(@Req() req, @Res() res: Response): Promise<any> {
    console.log(req, res);
    if (req.user.type === 'login') {
      res.cookie('access_token', req.user.access_token);
      res.cookie('refresh_token', req.user.refresh_token);
    } else {
      res.cookie('once_token', req.user.once_token);
    }
    res.redirect('http://www.vinarc.co.kr/');
    res.end();
    // 리다이렉트 해주는 페이지
  }

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입 하는 API입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '정상 요청',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '잘못된 정보 요청',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: '토큰 에러',
  })
  @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async registUser(
    @Request() req: any,
    @Body() registUserDTO: RegistUserDTO,
    @Res() res: Response,
  ) {
    try {
      console.log(registUserDTO);
      const { userId, userEmail, userName, userPhone, userBirth } =
        registUserDTO;
      // 1회용 토큰인경우
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          userId,
          userEmail,
          userName,
          userPhone,
          userBirth: userBirth.toString(),
        })
        .execute();
      const user = await this.authService.validateUser(userEmail);
      const access_token = await this.authService.createLoginToken(user);
      const refresh_token = await this.authService.createRefreshToken(user);

      res.setHeader('access_token', access_token);
      res.setHeader('refresh_token', refresh_token);
      res.json({ success: true, message: 'user login successful' });
    } catch (error) {
      console.log(error);
    }
    // 그 외의 경우
    return false;
  }
  // 리프레쉬 토큰을 이용한 엑세스 토큰 재발급하기
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }
}
