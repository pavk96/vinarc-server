import { Injectable } from '@nestjs/common';
import { Cart } from 'src/entity/entities/Cart';
import { User } from 'src/entity/entities/User';
import { getConnection } from 'typeorm';
import { InsertCartDTO } from './dto/insertCart.dto';

@Injectable()
export class OrderService {
  async insertCart(insertCartDTO: InsertCartDTO) {
    console.log(insertCartDTO.userNumber);
    const userNumber = await getConnection()
      .createQueryBuilder()
      .select('user_number')
      .from(User, '')
      .where("user_refresh_token='" + insertCartDTO.userNumber + "'")
      .getRawOne();
    console.log(userNumber.user_number);
    insertCartDTO.userNumber = userNumber.user_number;
    console.log(insertCartDTO.userNumber);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Cart)
      .values({ ...insertCartDTO })
      .execute();
  }
}
