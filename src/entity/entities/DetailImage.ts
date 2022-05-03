import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("fk_image_product1_idx", ["productNumber"], {})
@Entity("detail_image", { schema: "vinarc" })
export class DetailImage {
  @PrimaryGeneratedColumn({ type: "int", name: "image_id" })
  imageId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("varchar", { name: "product_image_url", length: 45 })
  productImageUrl: string;

  @ManyToOne(() => Product, (product) => product.detailImages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
