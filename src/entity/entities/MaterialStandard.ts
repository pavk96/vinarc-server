import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MappingProductWithMaterial } from "./MappingProductWithMaterial";

@Entity("material_standard", { schema: "vinarc" })
export class MaterialStandard {
  @PrimaryGeneratedColumn({ type: "int", name: "material_id" })
  materialId: number;

  @Column("varchar", { name: "material_name", length: 45 })
  materialName: string;

  @OneToMany(
    () => MappingProductWithMaterial,
    (mappingProductWithMaterial) => mappingProductWithMaterial.material
  )
  mappingProductWithMaterials: MappingProductWithMaterial[];
}
