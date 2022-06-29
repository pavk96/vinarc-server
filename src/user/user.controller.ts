import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { NaverAuthGuard } from 'src/auth/guard/navar-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refreshToken-auth.guard';
import { RegistUserDTO } from './dto/registUser.dto';
import { ChangeUserProfileDTO } from './dto/changeUserProfile.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import { CreateAddressDTO } from './dto/createAddress.dto';
import { UpdateAddressDTO } from './dto/updateAddress.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
    if (req.user.type === 'login') {
      res.cookie('access_token', req.user.access_token);
      res.cookie('refresh_token', req.user.refresh_token);
    } else {
      //유저가 없을 경우 회원가입을 통해 id랑 pwd 그 외의 정보(휴대폰,생일)
      res.cookie('once_token', req.user.once_token);
      if (req.headers) console.log(req.headers['user-agent'].toString());
      //어떻게 다시 돌아갈까? 플랫폼을 어떻게 나눌까?
      res.redirect('https://vinarc.page.link/4Yif');
      // res.redirect('vinarc://');
    }

    res.end();
    // 리다이렉트 해주는 페이지
  }

  @ApiOperation({
    summary: '로그인',
    description: '로그인하는 API입니다.',
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
  // @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async loginUser(@Body() loginUserDTO: LoginUserDTO, @Res() res: Response) {
    try {
      //로그인
      const { userId, userPassword } = loginUserDTO;
      const user = await this.authService.validateUser(userId, userPassword);
      const access_token = await this.authService.createLoginToken(user);
      const refresh_token = await this.authService.createRefreshToken(user);

      res.setHeader('Access_token', access_token);
      res.setHeader('refresh_token', refresh_token);
      res.setHeader('Access-Control-Expose-Headers', '*');
      // res.redirect('http://www.vinarc.co.kr/');
      res.json({ success: true, message: 'user login successful' });
      res.end();
    } catch (error) {
      console.log(error);
      return false;
    }
    // 그 외의 경우
    return false;
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
  // @UseGuards(JwtAuthGuard)
  @Post('auth/signup')
  async registUser(@Body() registUserDTO: RegistUserDTO, @Res() res: Response) {
    try {
      //회원가입
      await this.userService.insertUser(registUserDTO);
      res.redirect('https://www.vinarc.co.kr/');
      res.end();
    } catch (error) {
      res.json({
        success: false,
        message: error.sqlMessage || error.ErrorMessage,
      });
    }
    // 그 외의 경우
    return false;
  }

  @Get('check-duplicate')
  async checkDuplicate(@Query('user_id') user_id: string) {
    console.log(user_id);
    const user = await this.userService.findUserById(user_id);
    if (!user) {
      return { success: true, message: '사용할 수 있는 아이디입니다.' };
    }
    return { success: false, message: '이미 등록된 아이디입니다.' };
  }

  // 리프레쉬 토큰을 이용한 엑세스 토큰 재발급하기
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Req() req: any) {
    const token = req.headers.authorization;
    const tokenContent = await this.authService.tokenValidate(token);
    const { user_number } = tokenContent;

    const user = await this.userService.findUserByNumber(user_number);
    console.log(user);
    if (!user) {
      throw new HttpException('없는 아이디입니다.', 404);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/update')
  async changeUserProfile(
    @Body() changeUserProfileDTO: ChangeUserProfileDTO,
    @Req() req: any,
  ) {
    const token = req.headers.authorization;
    const tokenContent = await this.authService.tokenValidate(token);
    const { user_number } = tokenContent;
    await this.userService.updateUserDiv(changeUserProfileDTO, user_number);
    return this.userService.findUserByNumber(user_number);
  }
  @UseGuards(JwtAuthGuard)
  @Get('address/delete')
  async deleteUserAddress(@Query('address_id') address_id: number) {
    return await this.userService.deleteUserAddress(address_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('address/update')
  async updateAddress(
    @Body() updateAddressDTO: UpdateAddressDTO,
    @Req() req: any,
  ) {
    const token = req.headers.authorization;
    const tokenContent = await this.authService.tokenValidate(token);
    const { user_number } = tokenContent;
    await this.userService.updateAddress(updateAddressDTO, user_number);
    return this.userService.findAllUserAddress(user_number);
  }
  @UseGuards(JwtAuthGuard)
  @Post('address/create')
  async createAddress(
    @Body() createAddressDTO: CreateAddressDTO,
    @Req() req: any,
  ) {
    const token = req.headers.authorization;
    const tokenContent = await this.authService.tokenValidate(token);
    const { user_number } = tokenContent;
    await this.userService.createAddress(createAddressDTO, user_number);
    return this.userService.findAllUserAddress(user_number);
  }

  @UseGuards(JwtAuthGuard)
  @Get('address')
  async getUserAddress(@Req() req: any) {
    const token = req.headers.authorization;
    const tokenContent = await this.authService.tokenValidate(token);
    const { user_number } = tokenContent;
    const address = await this.userService.findAllUserAddress(user_number);
    if (!address) {
      return { message: '주소가 없어요' };
    }
    return address;
  }
}
