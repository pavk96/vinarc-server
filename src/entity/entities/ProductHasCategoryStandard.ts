import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryStandard } from './CategoryStandard';
import { Product } from './Product';

@Index(
  'fk_product_has_category_standard_category_standard1_idx',
  ['categoryId'],
  {},
)
@Index('fk_product_has_category_standard_product1_idx', ['productNumber'], {})
@Entity('product_has_category_standard', { schema: 'vinarc' })
export class ProductHasCategoryStandard {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'product_has_category_standard_id',
  })
  productHasCategoryStandardId: number;

  @Column('int', { primary: true, name: 'product_number' })
  productNumber: number;

  @Column('int', { primary: true, name: 'category_id' })
  categoryId: number;

  @ManyToOne(
    () => CategoryStandard,
    (categoryStandard) => categoryStandard.productHasCategoryStandards,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'categoryId' }])
  category: CategoryStandard;

  @ManyToOne(() => Product, (product) => product.productHasCategoryStandards, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    { name: 'product_number', referencedColumnName: 'productNumber' },
  ])
  productNumber2: Product;
}
