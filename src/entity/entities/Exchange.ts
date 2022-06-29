import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Index("fk_exchange_order1_idx", ["orderIdorder", "orderUserNumber"], {})
@Index(
  "fk_exchange_product1_idx",
  [
    "productProductNumber",
    "productColorStandardIdcolor",
    "productMaterialStandardIdmaterial",
  ],
  {}
)
@Entity("exchange", { schema: "vinarc" })
export class Exchange {
  @PrimaryGeneratedColumn({ type: "int", name: "exchange_id" })
  exchangeId: number;

  @Column("int", { primary: true, name: "order_idorder" })
  orderIdorder: number;

  @Column("int", { primary: true, name: "order_user_number" })
  orderUserNumber: number;

  @Column("timestamp", { name: "exchange_date" })
  exchangeDate: Date;

  @Column("tinyint", {
    name: "exchange_state",
    comment:
      "0-교환 미승인(환불 또는 재배송) 1-교환접수 2-반품상품픽업 3-반품상품배송 4-반품상품확인 5-교환승인 6-교환상품픽업 7-교환상품배송 8-교환상품 배송완료(교환완료) ",
  })
  exchangeState: number;

  @Column("int", { primary: true, name: "product_product_number" })
  productProductNumber: number;

  @Column("int", { primary: true, name: "product_color_standard_idcolor" })
  productColorStandardIdcolor: number;

  @Column("int", {
    primary: true,
    name: "product_material_standard_idmaterial",
  })
  productMaterialStandardIdmaterial: number;

  @ManyToOne(() => Order, (order) => order.exchanges, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "order_idorder", referencedColumnName: "idorder" },
    { name: "order_user_number", referencedColumnName: "userNumber" },
  ])
  order: Order;

  @ManyToOne(() => Product, (product) => product.exchanges, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_product_number", referencedColumnName: "productNumber" },
  ])
  productProductNumber2: Product;
}
