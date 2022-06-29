import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryStandard } from './CategoryStandard';
import { Product } from './Product';

@Entity('product_has_category_standard', { schema: 'vinarc' })
export class ProductHasCategoryStandard {
  @Column('int', {
    primary: true,
    name: 'product_number',
  })
  productNumber: number;

  @Column('int', {
    primary: true,
    name: 'category_id',
  })
  categoryId: number;

  @ManyToOne(() => CategoryStandard, (category) => category.categoryId, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'categoryId' }])
  categoryId2: CategoryStandard;

  @ManyToOne(() => Product, (product) => product.productNumber, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'product_number', referencedColumnName: 'productNumber' },
  ])
  productNumber2: Product;
}
