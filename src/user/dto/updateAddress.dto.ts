import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateAddressDTO {
  @IsNumber()
  addressId: number;

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
