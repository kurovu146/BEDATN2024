import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { RtmpService } from 'src/common/rtmp.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CameraController],
})
export class CameraModule {}
