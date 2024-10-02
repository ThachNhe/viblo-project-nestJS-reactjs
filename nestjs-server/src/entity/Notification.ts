import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NotificationDetail, User } from './index';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  content: string;

  @Column({ default: 0 })
  commentId: number;

  @Column({ default: '' })
  post_slug: string;

  @OneToMany(
    () => NotificationDetail,
    (notificationDetail) => notificationDetail.notification,
    {
      cascade: true,
    },
  )
  details: NotificationDetail[];

  @ManyToOne(() => User, (user) => user.notificationDetails)
  author: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
