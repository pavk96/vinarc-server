import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductHasCategoryStandard } from './ProductHasCategoryStandard';

@Entity('category_standard', { schema: 'vinarc' })
export class CategoryStandard {
  @PrimaryGeneratedColumn({ type: 'int', name: 'category_id' })
  categoryId: number;

  @Column('varchar', { name: 'category_name', length: 45 })
  categoryName: string;

  @Column('varchar', { name: 'category_icon_url', length: 45 })
  categoryIconUrl: string;

  @OneToMany(
    () => ProductHasCategoryStandard,
    (productHasCategoryStandard) => productHasCategoryStandard.category,
  )
  productHasCategoryStandards: ProductHasCategoryStandard[];
}
