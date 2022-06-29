import { IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  categoryName: string;

  @IsString()
  categoryIconUrl: string;
}
