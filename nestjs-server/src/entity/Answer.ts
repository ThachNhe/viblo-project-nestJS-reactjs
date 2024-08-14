import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Question } from './Question';

@Entity({ name: 'answers' })
export class Answer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 0 })
  vote_number: number;

  @Column()
  is_approved: boolean;

  @Column({ nullable: true })
  parent_name: string;

  @Column({ default: 0 })
  parentId: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: Question;

  @ManyToOne(() => User, (user) => user.answers)
  respondent: User;

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
