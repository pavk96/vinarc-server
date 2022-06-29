import { IsNumber } from 'class-validator';

export class InsertProductInCategoryDTO {
  @IsNumber()
  productNumber: number;

  @IsNumber()
  categoryId: number;
}
