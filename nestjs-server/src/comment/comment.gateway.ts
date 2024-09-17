import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins
  },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('addComment')
  handleAddComment(@MessageBody() data: any): void {
    this.server.emit('newComment', data);
  }
}
