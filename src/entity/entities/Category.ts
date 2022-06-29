import { Column, Entity } from "typeorm";

@Entity("category", { schema: "vinarc" })
export class Category {
  @Column("int", { primary: true, name: "category_id" })
  categoryId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;
}
