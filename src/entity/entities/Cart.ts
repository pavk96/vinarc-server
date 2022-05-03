import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { MappingProductWithColorAndMaterial } from "./MappingProductWithColorAndMaterial";
import { User } from "./User";

@Index(
  "fk_user_has_mapping_color_with_material_mapping_color_with__idx",
  ["materialId", "productNumber", "colorId"],
  {}
)
@Index("fk_user_has_mapping_color_with_material_user1_idx", ["userNumber"], {})
@Entity("cart", { schema: "vinarc" })
export class Cart {
  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("int", { primary: true, name: "material_id" })
  materialId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "color_id" })
  colorId: number;

  @Column("tinyint", { name: "count", default: () => "'1'" })
  count: number;

  @ManyToOne(
    () => MappingProductWithColorAndMaterial,
    (mappingProductWithColorAndMaterial) =>
      mappingProductWithColorAndMaterial.carts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "material_id", referencedColumnName: "materialId" },
    { name: "product_number", referencedColumnName: "productNumber" },
    { name: "color_id", referencedColumnName: "colorId" },
  ])
  mappingProductWithColorAndMaterial: MappingProductWithColorAndMaterial;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
