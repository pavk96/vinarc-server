import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Index("fk_product_has_displayed_product_product1_idx", ["productNumber"], {})
@Entity("related_product", { schema: "vinarc" })
export class RelatedProduct {
  @Column("int", { name: "product_number" })
  productNumber: number;

  @Column("int", {
    primary: true,
    name: "related_product_number",
    comment: "정렬 순서",
  })
  relatedProductNumber: number;

  @ManyToOne(() => Product, (product) => product.relatedProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
