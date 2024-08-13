import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"


@Entity({ name: 'posts' })
export class Post {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text' })
  content_markdown: string//

  @Column({ type: 'text' })
  table_content: string

  @Column()
  tags: string

  @Column()
  viewNumber: number

  @Column()
  vote_number: number

  @Column()
  bookmark_number: number

  @Column()
  number_comment: number

  @Column()
  isPublished: boolean

  @Column()
  seriesId: number

  @Column()
  authorId: number

  @ManyToOne(() => User, user => user.posts)
  author: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
