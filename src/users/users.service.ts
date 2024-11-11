import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  private users = [];
  
  async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const confirmationToken = randomBytes(32).toString('hex');
    const newUser = {
      id: Date.now(),
      ...user,
      password: hashedPassword,
      isEmailConfirmed: false,
      confirmationToken,
    };

    this.users.push(newUser);
    return newUser;
  }

  async findOne(email: string) {
    return this.users.find(user => user.email === email);
  }

  async findByConfirmationToken(token: string) {
    return this.users.find(user => user.confirmationToken === token);
  }

  async confirmEmail(userId: number) {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      user.isEmailConfirmed = true;
      user.confirmationToken = null;
    }
    return user;
  }
}
