import { Module } from '@nestjs/common';
import { RtmpService } from 'src/rtmp/rtmp.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RtmpService],
  exports: [RtmpService]
})
export class RtmpModule {}
