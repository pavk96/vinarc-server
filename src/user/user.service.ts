import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/entities/User';
import { getConnection } from 'typeorm';
import { RegistUserDTO } from './dto/registUser.dto';
import * as bcrypt from 'bcrypt';
import { ChangeUserProfileDTO } from './dto/changeUserProfile.dto';
import { CreateAddressDTO } from './dto/createAddress.dto';
import { Address } from 'src/entity/entities/Address';
import { UpdateAddressDTO } from './dto/updateAddress.dto';

@Injectable()
export class UserService {
  async deleteUserAddress(address_id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Address)
      .where('address.address_id = :address_id', { address_id: address_id })
      .execute();
  }
  async updateAddress(updateAddressDTO: UpdateAddressDTO, user_number: any) {
    const values = { ...updateAddressDTO, userUserNumber: user_number };
    const updatedUserAddress = await getConnection()
      .createQueryBuilder()
      .update(Address)
      .set(values)
      .where('address.user_user_number = :user_user_number', {
        user_user_number: user_number,
      })
      .andWhere('address.address_id = :address_id', {
        address_id: updateAddressDTO.addressId,
      })
      .execute();
    console.log(updatedUserAddress);
    return updatedUserAddress;
  }
  async findAllUserAddress(user_number: number) {
    const userAddress = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Address, 'address')
      .where('address.user_user_number = :user_user_number', {
        user_user_number: user_number,
      })
      .getRawMany();
    console.log(userAddress);
    return userAddress;
  }
  async createAddress(createAddressDTO: CreateAddressDTO, user_number: number) {
    const values = { ...createAddressDTO, userUserNumber: user_number };
    console.log(values);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Address)
      .values(values)
      .execute();
  }
  async updateUserDiv(
    changeUserProfileDTO: ChangeUserProfileDTO,
    user_number: number,
  ) {
    const { division, value } = changeUserProfileDTO;
    const updateSet = {};
    updateSet[division] = value;

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(updateSet)
      .where('user.user_number=:user_number', { user_number: user_number })
      .execute();
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
