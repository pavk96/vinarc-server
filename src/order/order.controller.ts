import { Body, Controller, Post, Req } from '@nestjs/common';
import { InsertCartDTO } from './dto/insertCart.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('cart/insert')
  async insertCart(@Body() insertCartDTO: InsertCartDTO, @Req() req: any) {
    await this.orderService.insertCart(insertCartDTO);
    return true;
  }
}
