import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";

@Index("fk_refund_order1_idx", ["orderIdorder", "orderUserNumber"], {})
@Entity("refund", { schema: "vinarc" })
export class Refund {
  @PrimaryGeneratedColumn({ type: "int", name: "refund_id" })
  refundId: number;

  @Column("int", { primary: true, name: "order_idorder" })
  orderIdorder: number;

  @Column("int", { primary: true, name: "order_user_number" })
  orderUserNumber: number;

  @Column("timestamp", { name: "refund_date" })
  refundDate: Date;

  @Column("tinyint", {
    name: "refund_state",
    comment:
      "0-환불 미승인(재배송) 1-환불접수 2-환불상품픽업 3-환불상품배송 4-환불상품확인 5-환불승인(환불완료) ",
    default: () => "'0'",
  })
  refundState: number;

  @ManyToOne(() => Order, (order) => order.refunds, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "order_idorder", referencedColumnName: "idorder" },
    { name: "order_user_number", referencedColumnName: "userNumber" },
  ])
  order: Order;
}
