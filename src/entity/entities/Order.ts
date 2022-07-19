import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exchange } from "./Exchange";
import { User } from "./User";
import { UserCoupon } from "./UserCoupon";
import { OrderedProduct } from "./OrderedProduct";
import { Refund } from "./Refund";

@Index("fk_order_user_coupon1_idx", ["userCouponId"], {})
@Index("fk_order_user_idx", ["userNumber"], {})
@Entity("order", { schema: "vinarc" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id" })
  orderId: number;

  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @Column("datetime", { name: "order_date" })
  orderDate: Date;

  @Column("tinyint", {
    name: "order_state",
    comment: "주문/접수(물품준비중)/배송중/배송완료 /교환/환불/ 교환환불 불가",
    default: () => "'0'",
  })
  orderState: number;

  @Column("int", { primary: true, name: "user_coupon_id" })
  userCouponId: number;

  @Column("datetime", {
    name: "last_modify_date",
    comment: "state가 바뀔 때마다 갱신되는 날짜",
  })
  lastModifyDate: Date;

  @OneToMany(() => Exchange, (exchange) => exchange.order)
  exchanges: Exchange[];

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;

  @ManyToOne(() => UserCoupon, (userCoupon) => userCoupon.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_coupon_id", referencedColumnName: "couponId" }])
  userCoupon: UserCoupon;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
  orderedProducts: OrderedProduct[];

  @OneToMany(() => Refund, (refund) => refund.order)
  refunds: Refund[];
}
