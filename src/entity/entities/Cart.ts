import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index(
  "fk_cart_product1_idx",
  ["productNumber", "productColorId", "productMaterialId"],
  {}
)
@Index("fk_user_has_product_user1_idx", ["userNumber"], {})
@Entity("cart", { schema: "vinarc" })
export class Cart {
  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("tinyint", { name: "count" })
  count: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "product_color_id" })
  productColorId: number;

  @Column("int", { primary: true, name: "product_material_id" })
  productMaterialId: number;

  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
