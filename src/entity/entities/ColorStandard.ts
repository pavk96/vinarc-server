import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MappingProductWithColorAndMaterial } from "./MappingProductWithColorAndMaterial";

@Entity("color_standard", { schema: "vinarc" })
export class ColorStandard {
  @PrimaryGeneratedColumn({ type: "int", name: "idcolor" })
  idcolor: number;

  @Column("varchar", { name: "color_name", length: 45 })
  colorName: string;

  @OneToMany(
    () => MappingProductWithColorAndMaterial,
    (mappingProductWithColorAndMaterial) =>
      mappingProductWithColorAndMaterial.color
  )
  mappingProductWithColorAndMaterials: MappingProductWithColorAndMaterial[];
}
