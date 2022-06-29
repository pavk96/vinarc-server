import { Column, Entity } from "typeorm";

@Entity("coupon", { schema: "vinarc" })
export class Coupon {
  @Column("int", { primary: true, name: "coupon_id" })
  couponId: number;

  @Column("varchar", { name: "coupon_name", nullable: true, length: 45 })
  couponName: string | null;

  @Column("varchar", {
    name: "coupon_key",
    nullable: true,
    comment: "사용자가 등록 시에 입력해야하는 쿠폰 키",
    length: 45,
  })
  couponKey: string | null;
}
