import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';
import { User } from './User';

@Index('fk_user_coupon_user1_idx', ['userNumber'], {})
@Entity('user_coupon', { schema: 'vinarc' })
export class UserCoupon {
  @PrimaryGeneratedColumn({ type: 'int', name: 'coupon_id' })
  couponId: number;

  @Column('tinyint', {
    name: 'user_coupon_state',
    comment: '0-미사용 1-사용',
    default: () => "'0'",
  })
  userCouponState: number;

  @Column('int', { primary: true, name: 'user_number' })
  userNumber: number;

  @OneToMany(() => Order, (order) => order.userCoupon)
  orders: Order[];

  @ManyToOne(() => User, (user) => user.userCoupons, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_number', referencedColumnName: 'userNumber' }])
  userNumber2: User;
}
