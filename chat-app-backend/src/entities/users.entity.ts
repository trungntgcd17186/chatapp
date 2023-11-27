import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
