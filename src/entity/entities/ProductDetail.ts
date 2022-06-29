import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Product } from "./Product";

@Index("fk_product_detail_product1_idx", ["productNumber"], {})
@Entity("product_detail", { schema: "vinarc" })
export class ProductDetail {
  @Column("int", {
    primary: true,
    name: "product_number",
    comment: "자주 안쓰는 정보 및 상품 정보 제공 공시에 꼭 필요한 정보",
  })
  productNumber: number;

  @Column("varchar", { name: "product_manufactor", length: 45 })
  productManufactor: string;

  @Column("varchar", { name: "product_country_of_manufactor", length: 45 })
  productCountryOfManufactor: string;

  @Column("varchar", {
    name: "product_main_material",
    comment: "주요 소재",
    length: 45,
  })
  productMainMaterial: string;

  @Column("varchar", {
    name: "product_components",
    comment: "구성요소",
    length: 45,
  })
  productComponents: string;

  @Column("varchar", { name: "product_assurance", length: 45 })
  productAssurance: string;

  @Column("varchar", { name: "product_responsible", length: 45 })
  productResponsible: string;

  @Column("varchar", { name: "product_responsible_phone", length: 45 })
  productResponsiblePhone: string;

  @Column("date", { name: "estimated_delivery_date", nullable: true })
  estimatedDeliveryDate: string | null;

  @OneToOne(() => Product, (product) => product.productDetail, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;
}
