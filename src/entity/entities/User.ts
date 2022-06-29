import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Qna } from "./Qna";
import { Review } from "./Review";
import { Star } from "./Star";
import { UserCoupon } from "./UserCoupon";
import { UserLog } from "./UserLog";

@Entity("user", { schema: "vinarc" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_number" })
  userNumber: number;

  @Column("varchar", { name: "user_id", length: 45 })
  userId: string;

  @Column("varchar", { name: "user_password", length: 300 })
  userPassword: string;

  @Column("varchar", { name: "user_email", length: 45 })
  userEmail: string;

  @Column("date", { name: "user_birth" })
  userBirth: string;

  @Column("varchar", { name: "user_phone", length: 45 })
  userPhone: string;

  @Column("varchar", { name: "user_name", length: 45 })
  userName: string;

  @Column("varchar", {
    name: "user_refresh_token",
    nullable: true,
    length: 300,
  })
  userRefreshToken: string | null;

  @OneToMany(() => Address, (address) => address.userNumber2)
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.userNumber2)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.userNumber2)
  orders: Order[];

  @OneToMany(() => Qna, (qna) => qna.userNumber2)
  qnas: Qna[];

  @OneToMany(() => Review, (review) => review.userNumber2)
  reviews: Review[];

  @OneToMany(() => Star, (star) => star.userNumber2)
  stars: Star[];

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.userNumber2)
  userCoupons: UserCoupon[];

  @OneToOne(() => UserLog, (userLog) => userLog.userNumber2)
  userLog: UserLog;
}
