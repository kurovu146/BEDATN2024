import { Controller } from '@nestjs/common';
import { RtmpService } from 'src/rtmp/rtmp.service';

@Controller('camera')
export class CameraController {
  constructor(
    private readonly rtmpService: RtmpService
  ) {}

  
}
