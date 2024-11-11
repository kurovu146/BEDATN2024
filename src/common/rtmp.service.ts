import NodeMediaServer from 'node-media-server';

export class RtmpService {
  async createRtmpServer() {
    const nodeMediaServer = new NodeMediaServer({
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30
      },
      http: {
        port: 8000,
        mediaroot: './media',
        allow_origin: '*'
      }
    });
      
    nodeMediaServer.run();
  }
}
