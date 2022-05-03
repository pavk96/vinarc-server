import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductHasMainImage } from "./ProductHasMainImage";

@Entity("main_image", { schema: "vinarc" })
export class MainImage {
  @PrimaryGeneratedColumn({ type: "int", name: "main_image_id" })
  mainImageId: number;

  @Column("varchar", { name: "main_image_url", length: 45 })
  mainImageUrl: string;

  @Column("varchar", { name: "main_image_title", length: 45 })
  mainImageTitle: string;

  @Column("text", { name: "main_image_context" })
  mainImageContext: string;

  @OneToMany(
    () => ProductHasMainImage,
    (productHasMainImage) => productHasMainImage.mainImage
  )
  productHasMainImages: ProductHasMainImage[];
}
