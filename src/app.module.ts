import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtmpModule } from './rtmp/rtmp.module';
import { ConfigModule } from '@nestjs/config';
import { CameraService } from './camera/camera.service';
import { CameraModule } from './camera/camera.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để các biến môi trường có thể truy cập toàn bộ ứng dụng
    }),
    RtmpModule,
    CameraModule
  ],
  controllers: [AppController],
  providers: [AppService, CameraService],
})
export class AppModule {}
