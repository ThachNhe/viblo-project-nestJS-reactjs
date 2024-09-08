import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../index';
import { User } from '../entity/User';
import { UrlDto, UserIdDTO } from './dto/user.dto';
@Injectable()
export class UserService {
  getUsersService() {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.find({
      select: [
        'id',
        'email',
        'userName',
        'fullName',
        'avatar',
        'follower_number',
        'roles',
      ],
      relations: ['posts'],
    });
  }

  async getUser(id: UserIdDTO) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOne({
      where: { id: id.id },
      select: [
        'id',
        'email',
        'userName',
        'fullName',
        'avatar',
        'follower_number',
        'avatar',
      ],
    });
  }

  async uploadAvatar(userId: number, avatar: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'email',
        'userName',
        'fullName',
        'avatar',
        'follower_number',
        'avatar',
      ],
    });

    user.avatar = avatar;

    await userRepository.save(user);
    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }
}
