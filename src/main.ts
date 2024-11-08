import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { RtmpService } from './rtmp/rtmp.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api'); // Thiết lập tiền tố 'api' cho tất cả các route
  app.enableVersioning({
    type: VersioningType.URI, // Cách versioning là thông qua URI
    prefix: 'v',               // Sử dụng 'v' làm tiền tố cho version
  });
  app.listen(process.env.PORT ?? 3001);
  const stream = new RtmpService()
  stream.createRtmpServer()
}
bootstrap();
