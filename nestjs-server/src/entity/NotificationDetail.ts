import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Notification } from './Notification';

@Entity({ name: 'notification_details' })
export class NotificationDetail {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => Notification, (notification) => notification.details, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notification: Notification;

  @ManyToOne(() => User, (user) => user.notificationDetails)
  NotiForUser: User;

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
