import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MappingColorWithMaterial } from "./MappingColorWithMaterial";
import { MaterialStandard } from "./MaterialStandard";
import { Product } from "./Product";

@Index(
  "fk_material_standard_has_product_material_standard1_idx",
  ["materialId"],
  {}
)
@Index("fk_material_standard_has_product_product1_idx", ["productNumber"], {})
@Entity("mapping_material_with_product", { schema: "vinarc" })
export class MappingMaterialWithProduct {
  @Column("int", { primary: true, name: "material_id" })
  materialId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @OneToMany(
    () => MappingColorWithMaterial,
    (mappingColorWithMaterial) =>
      mappingColorWithMaterial.mappingMaterialWithProduct
  )
  mappingColorWithMaterials: MappingColorWithMaterial[];

  @ManyToOne(
    () => MaterialStandard,
    (materialStandard) => materialStandard.mappingMaterialWithProducts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "material_id", referencedColumnName: "materialId" }])
  material: MaterialStandard;

  @ManyToOne(() => Product, (product) => product.mappingMaterialWithProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
