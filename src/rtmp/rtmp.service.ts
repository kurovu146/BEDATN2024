import { Injectable } from '@nestjs/common';
import * as NodeMediaServer from 'node-media-server';
import * as crypto from 'crypto';

@Injectable()
export class RtmpService {
  private nodeMediaServer: NodeMediaServer;

  // Hàm tạo Stream Key ngẫu nhiên
  private generateStreamKey(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  // Hàm cấu hình server RTMP mới
  createRtmpServer() {
    const streamKey = this.generateStreamKey();
    console.log(`Created new Stream Key: ${streamKey}`);

    // Cấu hình NodeMediaServer
    this.nodeMediaServer = new NodeMediaServer({
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_interval: 2
      },
      http: {
        port: 3001,
        mediaroot: './media',
        webroot: './web',
        allow_origin: '*'
      },
      trans: {
        // Không cần FFmpeg
        ffmpeg: '', // Để trống nếu không dùng FFmpeg
        tasks: [
          {
            app: 'live',
            mp4: true, // Bật chế độ ghi video vào file MP4
            hls: true, // Bật chế độ stream HLS
            hlsFlags: '[hls_time=10:hls_list_size=6:hls_allow_cache=1]'
          }
        ]
      }
    });

    // Khởi động server RTMP
    this.nodeMediaServer.run();

    // Trả về thông tin server RTMP mới
    return {
      url: `${process.env.APP_URL}/live/${streamKey}.m3u8`,
    };
  }
}
