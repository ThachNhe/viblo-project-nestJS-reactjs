import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';
import { Question } from './Question';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  view_number: number;

  @Column({ default: 0 })
  post_number: number;

  @Column({ default: 0 })
  question_number: number;

  @Column({ default: 0 })
  follower_number: number;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.tags)
  @JoinTable({
    name: 'user_tags',
  })
  followers: User[];

  @ManyToMany(() => Question, (question) => question.tags)
  @JoinTable({
    name: 'question_tags',
  })
  questions: Question[];

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
