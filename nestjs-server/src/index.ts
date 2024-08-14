
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"
import { Comment } from "./entity/Comment"
import { Series } from "./entity/Series"
import { Question } from "./entity/Question"
import { Answer } from "./entity/Answer"
import { Tag } from "./entity/Tag"
import { Notification } from "./entity/Notification"
import { NotificationDetail } from "./entity/NotificationDetail"
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "123",
  database: "viblo-db",
  synchronize: true,
  logging: false,
  entities: [User, Post, Comment, Series, Question, Answer, Tag,
    Notification, NotificationDetail],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize().then(async () => {

  // console.log("Inserting a new user into the database...")
  // const user = new User()
  // user.firstName = "Timber"
  // user.lastName = "Saw"
  // user.age = 25
  // await AppDataSource.manager.save(user)
  // console.log("Saved a new user with id: " + user.id)

  // console.log("Loading users from the database...")
  // const users = await AppDataSource.manager.find(User)
  // console.log("Loaded users: ", users)

  // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
