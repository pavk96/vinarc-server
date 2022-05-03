import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistUserDTO {
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

  @IsDate()
  userBirth: Date;

  @IsPhoneNumber('KR')
  userPhone: string;

  @IsString()
  @MinLength(2, { message: '아니, 이름은 적어주셔야죠 2자' })
  @MaxLength(6, { message: '김수한무거북까지만 받습니다. 6자' })
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;
}
