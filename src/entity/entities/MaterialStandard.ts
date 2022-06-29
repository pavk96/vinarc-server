import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MappingMaterialWithProduct } from "./MappingMaterialWithProduct";

@Entity("material_standard", { schema: "vinarc" })
export class MaterialStandard {
  @PrimaryGeneratedColumn({ type: "int", name: "material_id" })
  materialId: number;

  @Column("varchar", { name: "material_name", length: 45 })
  materialName: string;

  @OneToMany(
    () => MappingMaterialWithProduct,
    (mappingMaterialWithProduct) => mappingMaterialWithProduct.material
  )
  mappingMaterialWithProducts: MappingMaterialWithProduct[];
}
