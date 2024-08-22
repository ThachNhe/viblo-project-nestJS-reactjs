import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Tag } from './Tag';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content_markdown: string;

  // @Column({ type: 'text', nullable: true })
  // table_content: string;

  @Column({ nullable: true })
  tags_array: string;

  @Column({ default: 0 })
  view_number: number;

  @Column({ default: 0 })
  vote_number: number;

  @Column({ default: 0 })
  bookmark_number: number;

  @Column({ default: 0 })
  number_comment: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ nullable: true })
  seriesId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
    eager: true,
  })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.bookmarked_posts)
  bookmarkers: User[];

  @ManyToMany(() => User, (user) => user.voted_posts)
  voters: User[];

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
