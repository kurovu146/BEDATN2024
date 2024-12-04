import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { RtmpService } from 'src/common/rtmp.service';

@Module({
  imports: [PrismaModule],
  controllers: [RecordController],
  providers: [RecordService, RtmpService],
})
export class RecordModule {}
