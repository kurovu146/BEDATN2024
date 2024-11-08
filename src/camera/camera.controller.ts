import { Controller, Get, Post, Version } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { generateStreamKey } from '../../utils/common';

@Controller('camera')
export class CameraController {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @Version('1')
  async createCamera() {
    const streamKey = generateStreamKey();
    // return this.prisma.camera.create({
    //   data: {rtmp: newRtmpServer.url},
    // });
  }

  @Get()
  @Version('1')
  async getAllCamera() {
    return this.prisma.camera.findFirst();
  }
}
