import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("fk_product_has_user_user3_idx", ["userNumber"], {})
@Index("fk_product_has_user_product3_idx", ["productNumber"], {})
@Entity("star", { schema: "vinarc" })
export class Star {
  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("tinyint", { name: "star_rate" })
  starRate: number;

  @ManyToOne(() => Product, (product) => product.stars, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;

  @ManyToOne(() => User, (user) => user.stars, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
