import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ProductMaterialAndColor } from "./ProductMaterialAndColor";
import { User } from "./User";

@Index(
  "fk_cart_product_material_and_color1_idx",
  ["productMaterialAndColorId", "productNumber"],
  {}
)
@Index("fk_user_has_product_user1_idx", ["userNumber"], {})
@Entity("cart", { schema: "vinarc" })
export class Cart {
  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("tinyint", { primary: true, name: "cart_id" })
  cartId: number;

  @Column("int", { primary: true, name: "product_material_and_color_id" })
  productMaterialAndColorId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("tinyint", { name: "count" })
  count: number;

  @ManyToOne(
    () => ProductMaterialAndColor,
    (productMaterialAndColor) => productMaterialAndColor.carts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "product_material_and_color_id",
      referencedColumnName: "productMaterialAndColorId",
    },
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productMaterialAndColor: ProductMaterialAndColor;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
