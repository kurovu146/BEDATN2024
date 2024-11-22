import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService
  ) {}
  
  async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const confirmationToken = randomBytes(32).toString('hex');
    console.log(user);
    
    const newUser: Prisma.UserCreateInput = {
      email: user.email,
      password: hashedPassword,
      isEmailConfirmed: false,
      confirmationToken,
    };

    await this.prisma.user.create({data: newUser});
    return newUser;
  }

  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    });
  }

  async findByConfirmationToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        confirmationToken: token
      }
    });
  }

  async confirmEmail(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    if (user) {
      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          confirmationToken: null,
          isEmailConfirmed: true
        },
      })
    }

    return user;
  }
}
