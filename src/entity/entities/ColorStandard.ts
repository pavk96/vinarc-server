import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MappingColorWithMaterial } from './MappingColorWithMaterial';

@Entity('color_standard', { schema: 'vinarc' })
export class ColorStandard {
  @PrimaryGeneratedColumn({ type: 'int', name: 'idcolor' })
  idcolor: number;

  @Column('varchar', { name: 'color_name', length: 45 })
  colorName: string;

  @OneToMany(
    () => MappingColorWithMaterial,
    (mappingColorWithMaterial) => mappingColorWithMaterial.color,
  )
  mappingColorWithMaterials: MappingColorWithMaterial[];
}
