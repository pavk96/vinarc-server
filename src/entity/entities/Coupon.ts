import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserCoupon } from "./UserCoupon";

@Entity("coupon", { schema: "vinarc" })
export class Coupon {
  @PrimaryGeneratedColumn({ type: "int", name: "coupon_id" })
  couponId: number;

  @Column("varchar", { name: "coupon_name", length: 45 })
  couponName: string;

  @Column("varchar", {
    name: "coupon_key",
    comment: "사용자가 등록 시에 입력해야하는 쿠폰 키",
    length: 45,
  })
  couponKey: string;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.couponCoupon)
  userCoupons: UserCoupon[];
}
