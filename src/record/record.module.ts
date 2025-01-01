import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { RtmpModule } from 'src/rtmp/rtmp.module';

@Module({
  imports: [PrismaModule, RtmpModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
