
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./Post"
enum Role {
  Admin = "ADMIN",
  UserNotLogin = "USER_NOT_LOGIN",
  UserLogin = "USER_LOGIN"
}
@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullName: string

  @Column({ unique: true })
  userName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: Role,
    default: Role.UserNotLogin
  })
  role: Role

  @Column()
  avatar: string

  @Column({ default: 0 }) // Đặt giá trị mặc định cho followerNumber là 0
  followerNumber: number;

  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}
