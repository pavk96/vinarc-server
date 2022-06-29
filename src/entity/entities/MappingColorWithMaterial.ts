import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ColorStandard } from './ColorStandard';
import { MappingMaterialWithProduct } from './MappingMaterialWithProduct';

@Index(
  'fk_material_standard_has_product_has_color_standard_color_s_idx',
  ['colorId'],
  {},
)
@Index(
  'fk_material_standard_has_product_has_color_standard_materia_idx',
  ['materialId', 'productNumber'],
  {},
)
@Entity('mapping_color_with_material', { schema: 'vinarc' })
export class MappingColorWithMaterial {
  @Column('int', { primary: true, name: 'material_id' })
  materialId: number;

  @Column('int', { primary: true, name: 'product_number' })
  productNumber: number;

  @Column('int', { primary: true, name: 'idcolor' })
  colorId: number;

  @ManyToOne(
    () => ColorStandard,
    (colorStandard) => colorStandard.mappingColorWithMaterials,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'idcolor', referencedColumnName: 'idcolor' }])
  color: ColorStandard;

  @ManyToOne(
    () => MappingMaterialWithProduct,
    (mappingMaterialWithProduct) =>
      mappingMaterialWithProduct.mappingColorWithMaterials,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([
    { name: 'material_id', referencedColumnName: 'materialId' },
    { name: 'product_number', referencedColumnName: 'productNumber' },
  ])
  mappingMaterialWithProduct: MappingMaterialWithProduct;
}
