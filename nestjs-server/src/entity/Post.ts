import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, UserPost, Comment, Tag } from './index';
import { Status } from '../enums/status.enum';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content_markdown: string;

  @Column({ type: 'json', nullable: true })
  tags_array: string[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Publish,
  })
  status: Status[];

  @Column({ default: 0 })
  view_number: number;

  @Column({ default: 0 })
  vote_number: number;

  @Column({ default: 0 })
  bookmark_number: number;

  @Column({ default: 0 })
  comment_number: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ nullable: true })
  seriesId: number;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => User, (user) => user.posts, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true,
  })
  @JoinTable({
    name: 'post_tags',
  })
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.bookmarked_posts)
  @JoinTable({
    name: 'user_bookmarks',
  })
  bookmarkers: User[];

  @OneToMany(() => UserPost, (userPost) => userPost.post)
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
