import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { Conversation } from './conversation.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Column()
  text: string;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column()
  isRemoved: boolean = false;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => Users, (user) => user.messages)
  user: Users;
}
