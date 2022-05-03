import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @MinLength(6, { message: '아이디 최소 길이는 6자 입니다.' })
  @MaxLength(20, {
    message: '아이디 최대 길이는 20자 입니다.',
  })
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MinLength(4, { message: '비밀번호가 너무 짧수 6자' })
  @MaxLength(20, { message: '비밀번호가 너무 길어요 20자' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '비밀번호 강도 약함',
  })
  @IsNotEmpty()
  userPassword: string;
}
