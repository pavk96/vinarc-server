import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("fk_product_has_user_user1_idx", ["userNumber"], {})
@Index("fk_product_has_user_product1_idx", ["productNumber"], {})
@Entity("review", { schema: "vinarc" })
export class Review {
  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("varchar", { name: "review_title", length: 45 })
  reviewTitle: string;

  @Column("text", { name: "review_contents" })
  reviewContents: string;

  @Column("varchar", { name: "review_image_url", nullable: true, length: 45 })
  reviewImageUrl: string | null;

  @Column("timestamp", { name: "review_date" })
  reviewDate: Date;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
