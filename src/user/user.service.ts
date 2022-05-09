import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/entities/User';
import { getConnection } from 'typeorm';
import changeUserProfileDto from './dto/changeUserProfile.dto';
import { RegistUserDTO } from './dto/registUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  updateUserDiv(changeUserProfileDTO: changeUserProfileDto, token) {
    const { division, value, userNumber } = changeUserProfileDTO;
    getConnection()
      .createQueryBuilder()
      .update()
      .setParameter(division, value)
      .where('user.user_number=:user_number', { user_number: userNumber });
  }
  async insertUser(registUserDTO: RegistUserDTO) {
    const { userId, userEmail, userName, userPhone, userBirth, userPassword } =
      registUserDTO;
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        userId,
        userPassword: hashedPassword,
        userEmail,
        userName,
        userPhone,
        userBirth: userBirth.toString(),
      })
      .execute();
  }
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
  async findUserById(user_id: string): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_id = :user_id', { user_id })
      .getOne();
    return user;
  }
  async refreshUserToken(user: User, refreshToken: string) {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ userRefreshToken: refreshToken })
      .where(`user_id = "${user.userId}"`)
      .execute();
  }
}
