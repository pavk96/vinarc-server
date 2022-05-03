import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { MainImage } from "./MainImage";
import { Product } from "./Product";

@Index("fk_product_has_main_image_main_image1_idx", ["mainImageId"], {})
@Index("fk_product_has_main_image_product1_idx", ["productNumber"], {})
@Entity("product_has_main_image", { schema: "vinarc" })
export class ProductHasMainImage {
  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "main_image_id" })
  mainImageId: number;

  @Column("double", { name: "coordinate_x", precision: 22 })
  coordinateX: number;

  @Column("double", { name: "coordinate_y", precision: 22 })
  coordinateY: number;

  @ManyToOne(() => MainImage, (mainImage) => mainImage.productHasMainImages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "main_image_id", referencedColumnName: "mainImageId" }])
  mainImage: MainImage;

  @ManyToOne(() => Product, (product) => product.productHasMainImages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
