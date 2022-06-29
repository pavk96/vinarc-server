import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNumber()
  shippingFee: number;

  @IsString()
  productName: string;

  @IsString()
  productSize: string;

  @IsString()
  productPrice: string;

  @IsString()
  productSortNumber: string;

  @IsNumber()
  productClass: number;

  @IsString()
  productThumbnailUrl: string;
}
