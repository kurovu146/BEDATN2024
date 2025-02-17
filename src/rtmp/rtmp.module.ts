import { Module } from '@nestjs/common';
import { RtmpService } from 'src/rtmp/rtmp.service';
import { RtmpController } from './rtmp.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { RecordModule } from 'src/record/record.module';
import { FirebaseService } from 'src/common/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [RtmpController],
  providers: [RtmpService, FirebaseService],
  imports: [PrismaModule, RecordModule, ConfigModule],
  exports: [RtmpService]
})
export class RtmpModule {}
