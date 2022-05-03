import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Index("fk_user_log_user1_idx", ["userNumber"], {})
@Entity("user_log", { schema: "vinarc" })
export class UserLog {
  @Column("varchar", { name: "user_log", nullable: true, length: 45 })
  userLog: string | null;

  @Column("int", { primary: true, name: "user_number" })
  userNumber: number;

  @OneToOne(() => User, (user) => user.userLog, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_number", referencedColumnName: "userNumber" }])
  userNumber2: User;
}
