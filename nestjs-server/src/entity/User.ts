import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { NotificationDetail } from './NotificationDetail';
import {
  Tag,
  UserPost,
  Answer,
  Question,
  Series,
  Comment,
  Post,
} from './index';

import { Role } from '../enums/index';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles: Role[];

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 0 })
  follower_number: number;

  @Column({ default: 0 })
  star_number: number;

  @Column({ default: 0 })
  post_number: number;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: '' })
  notificationToken: string;

  @OneToMany(() => Post, (post) => post.author, {
    cascade: true,
    eager: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Series, (series) => series.author)
  series: Series[];

  @OneToMany(() => Question, (question) => question.author)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.respondent)
  answers: Answer[];

  @OneToMany(
    () => NotificationDetail,
    (notificationDetail) => notificationDetail.user,
  )
  notifications: NotificationDetail[];

  @ManyToMany(() => Tag, (tag) => tag.followers)
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.users)
  users: User[];

  @ManyToMany(() => User, (user) => user.followers)
  followers: User[];

  @ManyToMany(() => Post, (post) => post.bookmarkers)
  bookmarked_posts: Post[];

  @OneToMany(() => UserPost, (userPost) => userPost.user)
  userVotes: UserPost[];

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
