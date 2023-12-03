import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway(9091, { cors: true, namespace: '/socket' })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    const messageId = await this.chatService.createMessage(payload?.text, payload?.conversation_id, payload?.user?.id);
    payload?.conversation_id && this.server.to(payload.conversation_id).emit('recMessage', { ...payload, id: messageId });
  }

  @SubscribeMessage('onTypingMessage')
  async handleTypingMessage(client: Socket, payload: any): Promise<void> {
    this.server.to(payload.conversationId).emit('onTypingMessage', payload);
  }

  @SubscribeMessage('onRemoveUnreadMessage')
  async onRemoveNoti(client: Socket, payload: any): Promise<void> {
    this.server.to(payload.conversationId).emit('onRemoveUnreadMessage', payload);
  }

  @SubscribeMessage('onCreateConversation')
  async onCreateConversation(client: Socket, payload: any): Promise<void> {
    const conversation = await this.chatService.createConversation(payload.loggedUser, payload.emails);
    this.server.emit('onHasNewConversation', conversation);
  }

  @SubscribeMessage('removeMessage')
  async removeMessage(client: Socket, payload: { conversationId: string | string[]; loggedUserId: number; messageId: number }): Promise<void> {
    await this.chatService.removeMessage(payload.loggedUserId, payload.messageId);
    this.server.to(payload.conversationId).emit('onRemoveMessage', { conversationId: payload.conversationId, messageId: payload.messageId });
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
      client.join(conversationId);
    });

    client.on('leaveRoom', () => {
      // Xử lý khi người dùng ngắt kết nối
    });
  }
}
