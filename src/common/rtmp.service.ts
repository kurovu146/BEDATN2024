import NodeMediaServer from 'node-media-server';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export class RtmpService {
  private recordProcesses: Map<string, ChildProcessWithoutNullStreams> = new Map();

  async createRtmpServer() {
    const nodeMediaServer = new NodeMediaServer({
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
      },
      http: {
        port: 8000,
        mediaroot: './media', // Đường dẫn lưu trữ tệp media
        allow_origin: '*',
      }
    });

    nodeMediaServer.run();

    nodeMediaServer.on('preConnect', (id, args) => {
      console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    nodeMediaServer.on('postPublish', (id, streamKey, args) => {
      console.log('[NodeEvent on postPublish]', `id=${id} streamKey=${streamKey}`);
    });

    nodeMediaServer.on('donePublish', (id, streamKey, args) => {
      console.log('[NodeEvent on donePublish]', `id=${id} streamKey=${streamKey}`);
      // Dừng ghi khi stream kết thúc
      this.stopRecord(streamKey);
    });
  }

  startRecord(streamKey: string): string {
    const filePath = `./${streamKey.replace(/\//g, '_')}${Date.now()}.mp4`;
    const ffmpegProcess = spawn('ffmpeg', [
      '-i', `rtmp://127.0.0.1:1935/live/${streamKey}`, // Input stream
      '-c:v', 'libx264',                             // Codec video
      '-preset', 'ultrafast',                        // Cài đặt tốc độ
      '-c:a', 'aac',                                 // Codec âm thanh
      '-f', 'mp4',                                   // Định dạng file
      '-movflags', '+faststart', // Đặt metadata ở đầu file
      '-y',
      'output.mp4',       // Đường dẫn tệp đầu ra
    ]);

    this.recordProcesses.set(streamKey, ffmpegProcess);

    ffmpegProcess.stderr.on('data', (data) => {
      console.log(`[FFmpeg data] ${data}`);
    });

    ffmpegProcess.on('close', (code) => {
      console.log(`[FFmpeg Closed] code=${code}`);
    });

    return filePath;
  }

  stopRecord(streamKey: string): void {
    const process = this.recordProcesses.get(streamKey);

    if (process) {
      process.kill('SIGTERM'); // Kết thúc quá trình ghi
      this.recordProcesses.delete(streamKey);
    }
  }
}
