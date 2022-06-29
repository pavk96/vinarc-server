import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  addressNickname: string;

  @IsBoolean()
  addressState: number;

  @IsString()
  addressContext: string;

  @IsString()
  addressReceiverName: string;

  @IsString()
  addressReceiverPhoneNumber: string;
}
