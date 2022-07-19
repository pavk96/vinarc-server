import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Index("fk_product_material_and_color_product1_idx", ["productNumber"], {})
@Entity("product_material_and_color", { schema: "vinarc" })
export class ProductMaterialAndColor {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "product_material_and_color_id",
  })
  productMaterialAndColorId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("varchar", {
    name: "product_material_and_color_image_url",
    length: 45,
  })
  productMaterialAndColorImageUrl: string;

  @Column("varchar", { name: "product_material_name", length: 45 })
  productMaterialName: string;

  @Column("varchar", { name: "product_color_name", length: 45 })
  productColorName: string;

  @OneToMany(() => Cart, (cart) => cart.productMaterialAndColor)
  carts: Cart[];

  @ManyToOne(() => Product, (product) => product.productMaterialAndColors, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
