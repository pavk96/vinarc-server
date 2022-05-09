import { IsNumber, IsString } from 'class-validator';

export default class ChangeUserProfileDTO {
  @IsString()
  division: string;

  @IsString()
  value: string;

  @IsNumber()
  userNumber: number;
}
