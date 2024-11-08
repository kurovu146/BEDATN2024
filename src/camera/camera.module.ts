import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { RtmpService } from 'src/rtmp/rtmp.service';

@Module({
  controllers: [CameraController],
  providers: [RtmpService]
})
export class CameraModule {}
