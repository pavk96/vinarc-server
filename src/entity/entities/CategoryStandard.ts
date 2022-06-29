import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("category_standard", { schema: "vinarc" })
export class CategoryStandard {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id" })
  categoryId: number;

  @Column("varchar", { name: "category_name", length: 45 })
  categoryName: string;

  @Column("varchar", { name: "category_icon_url", length: 45 })
  categoryIconUrl: string;

  @ManyToMany(() => Product, (product) => product.categoryStandards)
  @JoinTable({
    name: "product_has_category_standard",
    joinColumns: [{ name: "category_id", referencedColumnName: "categoryId" }],
    inverseJoinColumns: [
      { name: "product_number", referencedColumnName: "productNumber" },
    ],
    schema: "vinarc",
  })
  products: Product[];
}
