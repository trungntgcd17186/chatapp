import { CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { Users } from './users.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @ManyToMany(() => Users)
  @JoinTable()
  members: Users[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
