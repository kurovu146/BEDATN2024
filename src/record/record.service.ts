import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRecordDTO } from './dto/create-record.dto';
import { AppError } from 'utils/error';

@Injectable()
export class RecordService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async create(data: CreateRecordDTO) {
    return this.prisma.record.create({data});
  }

  async getAllVideo(userId: number) {
    if (!userId) {
      throw new AppError('User not found!', HttpStatus.NOT_FOUND);
    }
    const records = await this.prisma.record.findMany({where: {userId}});

    return records.map(item => {return item.url});
  }

  async delete(id: number) {
    const record = await this.prisma.record.findFirst({where:{id}});

    if (!record) {
      throw new AppError('Record not found!', HttpStatus.NOT_FOUND);
    }

    return this.prisma.record.delete({where: {id}});
  }
}
