import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("fk_product_has_user_user2_idx", ["userNumber"], {})
@Index("fk_product_has_user_product2_idx", ["productNumber"], {})
@Entity("qna", { schema: "vinarc" })
export class Qna {
  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("text", { name: "qna_contents" })
  qnaContents: string;

  @Column("timestamp", { name: "qna_date" })
  qnaDate: Date;

  @Column("varchar", { name: "qna_answer", nullable: true, length: 45 })
  qnaAnswer: string | null;

  @ManyToOne(() => Product, (product) => product.qnas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;

  @ManyToOne(() => User, (user) => user.qnas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
