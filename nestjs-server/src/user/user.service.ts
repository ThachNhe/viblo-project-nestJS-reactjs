import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../index';
import { User } from '../entity/User';
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
}
