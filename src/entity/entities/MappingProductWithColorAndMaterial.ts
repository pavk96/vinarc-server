import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Cart } from "./Cart";
import { ColorStandard } from "./ColorStandard";
import { MappingProductWithMaterial } from "./MappingProductWithMaterial";
import { OrderedProduct } from "./OrderedProduct";

@Index(
  "fk_material_standard_has_product_has_color_standard_color_s_idx",
  ["colorId"],
  {}
)
@Index(
  "fk_material_standard_has_product_has_color_standard_materia_idx",
  ["materialId", "productNumber"],
  {}
)
@Entity("mapping_product_with_color_and_material", { schema: "vinarc" })
export class MappingProductWithColorAndMaterial {
  @Column("int", { primary: true, name: "material_id" })
  materialId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "color_id" })
  colorId: number;

  @OneToMany(() => Cart, (cart) => cart.mappingProductWithColorAndMaterial)
  carts: Cart[];

  @ManyToOne(
    () => ColorStandard,
    (colorStandard) => colorStandard.mappingProductWithColorAndMaterials,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "color_id", referencedColumnName: "idcolor" }])
  color: ColorStandard;

  @ManyToOne(
    () => MappingProductWithMaterial,
    (mappingProductWithMaterial) =>
      mappingProductWithMaterial.mappingProductWithColorAndMaterials,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "material_id", referencedColumnName: "materialId" },
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  mappingProductWithMaterial: MappingProductWithMaterial;

  @OneToMany(
    () => OrderedProduct,
    (orderedProduct) => orderedProduct.mappingProductWithColorAndMaterial
  )
  orderedProducts: OrderedProduct[];
}
