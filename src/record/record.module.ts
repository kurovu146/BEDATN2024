import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService]
})
export class RecordModule {}
