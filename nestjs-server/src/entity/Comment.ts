
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm"
import { Post } from "./Post"
import { User } from "./User"
@Entity({ name: 'comments' })
export class Comment {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ type: 'text' })
  content: string

  @Column({ nullable: true })
  parentName: string

  @ManyToOne(() => User, user => user.comments)
  user: User

  @ManyToOne(() => Post, post => post.comments, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
