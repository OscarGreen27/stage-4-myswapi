import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'users', name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
