import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Index("fk_displayed_product_has_product_product1_idx", ["productNumber"], {})
@Entity("popular_product", { schema: "vinarc" })
export class PopularProduct {
  @Column("int", { name: "product_number" })
  productNumber: number;

  @Column("int", {
    primary: true,
    name: "popular_product_id",
    comment: "정렬 순서",
  })
  popularProductId: number;

  @ManyToOne(() => Product, (product) => product.popularProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
