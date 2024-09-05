import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag, User, Post } from './index';

@Entity('user_votes')
export class UserPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['upvote', 'downvote'],
  })
  voteType: 'upvote' | 'downvote';

  @ManyToOne(() => User, (user) => user.userVotes)
  user: User;

  @ManyToOne(() => Post, (post) => post.userVotes)
  post: Post;
}
