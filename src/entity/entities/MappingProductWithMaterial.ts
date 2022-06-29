import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MappingProductWithColorAndMaterial } from "./MappingProductWithColorAndMaterial";
import { MaterialStandard } from "./MaterialStandard";
import { Product } from "./Product";

@Index(
  "fk_material_standard_has_product_material_standard1_idx",
  ["materialId"],
  {}
)
@Index("fk_material_standard_has_product_product1_idx", ["productNumber"], {})
@Entity("mapping_product_with_material", { schema: "vinarc" })
export class MappingProductWithMaterial {
  @Column("int", { primary: true, name: "material_id" })
  materialId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @OneToMany(
    () => MappingProductWithColorAndMaterial,
    (mappingProductWithColorAndMaterial) =>
      mappingProductWithColorAndMaterial.mappingProductWithMaterial
  )
  mappingProductWithColorAndMaterials: MappingProductWithColorAndMaterial[];

  @ManyToOne(
    () => MaterialStandard,
    (materialStandard) => materialStandard.mappingProductWithMaterials,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "material_id", referencedColumnName: "materialId" }])
  material: MaterialStandard;

  @ManyToOne(() => Product, (product) => product.mappingProductWithMaterials, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
