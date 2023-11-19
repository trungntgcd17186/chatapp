import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway(9091, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    await this.chatService.createMessage(
      payload?.text,
      payload?.conversation_id,
      payload?.user?.id,
    );
    payload?.conversation_id &&
      this.server.to(payload.conversation_id).emit('recMessage', payload);
  }

  @SubscribeMessage('onTypingMessage')
  async handleTypingMessage(client: Socket, payload: any): Promise<void> {
    this.server.to(payload.conversationId).emit('onTypingMessage', payload);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    client.on('joinRoom', (conversationId: string) => {
      console.log(
        '🚀 ~ file: chat.gateway.ts:42 ~ client.on ~ conversationId:',
        conversationId,
      );
      client.join(conversationId);
    });

    client.on('leaveRoom', () => {
      // Xử lý khi người dùng ngắt kết nối
    });
  }
}
