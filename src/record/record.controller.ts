import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RtmpService } from 'src/common/rtmp.service';

@Controller('records')
export class RecordController {
  constructor(private readonly rtmpService: RtmpService) {}

  @Post('start')
  startRecording(@Body('streamKey') streamKey: string) {
    if (!streamKey) {
      throw new BadRequestException('Stream path is required');
    }
    const filePath = this.rtmpService.startRecord(streamKey);
    return { message: 'Recording started', filePath };
  }

  @Post('stop')
  stopRecording(@Body('streamKey') streamKey: string) {
    if (!streamKey) {
      throw new BadRequestException('Stream path is required');
    }
    this.rtmpService.stopRecord(streamKey);
    return { message: 'Recording stopped' };
  }
}
