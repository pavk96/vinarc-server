import { IsNumber } from 'class-validator';

export class InsertCartDTO {
  @IsNumber()
  userNumber: number;

  @IsNumber()
  productNumber: number;

  @IsNumber()
  productMaterialAndColorId: number;

  @IsNumber()
  count: number;
}
