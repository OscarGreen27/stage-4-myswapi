import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'user', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
