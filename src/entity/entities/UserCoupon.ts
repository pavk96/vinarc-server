import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Coupon } from "./Coupon";
import { User } from "./User";

@Index("fk_user_coupon_coupon1_idx", ["couponCouponId"], {})
@Index("fk_user_coupon_user1_idx", ["userUserNumber"], {})
@Entity("user_coupon", { schema: "vinarc" })
export class UserCoupon {
  @PrimaryGeneratedColumn({ type: "int", name: "user_coupon_id" })
  userCouponId: number;

  @Column("bit", {
    name: "user_coupon_state",
    nullable: true,
    comment: "0-미사용 1-사용",
  })
  userCouponState: boolean | null;

  @Column("int", { primary: true, name: "user_user_number" })
  userUserNumber: number;

  @Column("int", { primary: true, name: "coupon_coupon_id" })
  couponCouponId: number;

  @OneToMany(() => Order, (order) => order.userCouponCoupon)
  orders: Order[];

  @ManyToOne(() => Coupon, (coupon) => coupon.userCoupons, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "coupon_coupon_id", referencedColumnName: "couponId" }])
  couponCoupon: Coupon;

  @ManyToOne(() => User, (user) => user.userCoupons, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "user_user_number", referencedColumnName: "userNumber" },
  ])
  userUserNumber2: User;
}
