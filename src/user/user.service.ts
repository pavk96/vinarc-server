import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/entities/User';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
  async findUserByEmail(user_email: string): Promise<User | undefined> {
    console.log(user_email);
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_email = :user_email', { user_email })
      .getOne();
    return user;
  }
  async findUserByNumber(user_number: number): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_number = :user_number', { user_number })
      .getOne();
    return user;
  }
}
