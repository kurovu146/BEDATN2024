// users.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = []; // Dùng mảng lưu trữ tạm thời. Bạn có thể thay thế bằng cơ sở dữ liệu.

  async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { id: Date.now(), ...user, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}
