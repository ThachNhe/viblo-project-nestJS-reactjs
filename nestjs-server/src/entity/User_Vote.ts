import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag, User, Post } from './index';

@Entity('user_votes')
export class UserPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['UPVOTE', 'DOWNVOTE'],
  })
  voteType: 'UPVOTE' | 'DOWNVOTE';

  @ManyToOne(() => User, (user) => user.userVotes)
  user: User;

  @ManyToOne(() => Post, (post) => post.userVotes)
  post: Post;
}
