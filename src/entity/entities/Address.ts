import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("fk_address_user1_idx", ["userUserNumber"], {})
@Entity("address", { schema: "vinarc" })
export class Address {
  @PrimaryGeneratedColumn({ type: "int", name: "address_id" })
  addressId: number;

  @Column("varchar", {
    name: "address_nickname",
    comment: "집/회사 처럼 배송지를 부르는 호칭",
    length: 45,
  })
  addressNickname: string;

  @Column("tinyint", {
    name: "address_state",
    comment: "0-구주소 1-신주소",
    default: () => "'1'",
  })
  addressState: number;

  @Column("varchar", { name: "address_context", length: 45 })
  addressContext: string;

  @Column("varchar", { name: "address_receiver_name", length: 45 })
  addressReceiverName: string;

  @Column("varchar", { name: "address_receiver_phone_number", length: 45 })
  addressReceiverPhoneNumber: string;

  @Column("int", { primary: true, name: "user_user_number" })
  userUserNumber: number;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "user_user_number", referencedColumnName: "userNumber" },
  ])
  userUserNumber2: User;
}
