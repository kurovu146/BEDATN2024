import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({data});
  }
}
