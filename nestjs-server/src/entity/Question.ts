import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm"
import { User } from "./User"
import { Tag } from "./Tag"
import { Answer } from "./Answer"


@Entity({ name: 'questions' })
export class Question {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column()
  title: string

  @Column({ type: 'text' })
  content_markdown: string

  @Column({ default: 0 })
  view_number: number

  @Column({ default: 0 })
  vote_number: number

  @Column({ default: 0 })
  bookmark_number: number

  @Column({ default: 0 })
  answer_number: number


  @OneToMany(() => Answer, answer => answer.question, {
    cascade: true,
    eager: true,
  })
  answers: Answer[]

  @ManyToOne(() => User, user => user.questions)
  author: User

  @ManyToMany(() => Tag, (tag) => tag.questions)
  tags: Tag[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
