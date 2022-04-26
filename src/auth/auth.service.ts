import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(user_email: any) {
    throw new Error('Method not implemented.');
  }
}
