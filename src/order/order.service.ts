import { Injectable } from '@nestjs/common';
import { Cart } from 'src/entity/entities/Cart';
import { getConnection } from 'typeorm';
import { InsertCartDTO } from './dto/insertCart.dto';

@Injectable()
export class OrderService {
  async insertCart(insertCartDTO: InsertCartDTO) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Cart)
      .values(insertCartDTO)
      .execute();
  }
}
