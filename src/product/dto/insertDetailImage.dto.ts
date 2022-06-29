import { IsNumber, IsString } from 'class-validator';

export class InsertDetailImageDTO {
  @IsNumber()
  productNumber: number;

  @IsString()
  productImageUrl: string;
}
