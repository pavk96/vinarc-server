import { IsString } from 'class-validator';

export class ChangeUserProfileDTO {
  @IsString()
  division: string;

  @IsString()
  value: string;
}
