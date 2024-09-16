import { Injectable, Query } from '@nestjs/common';
import { AppDataSource } from '../index';
import { User } from '../entity/User';
import { UrlDto, UserIdDTO, UserPaginationDTO } from './dto/user.dto';
import { formatVietnameseDate } from 'src/utils/common.function';
import { Role } from '../enums/index';

@Injectable()
export class UserService {
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

  async getUsersService(query: UserPaginationDTO) {
    console.log('query', query);
    const { page = 1, limit = 15 } = query;

    const userRepository = AppDataSource.getRepository(User);

    const [result, total] = await userRepository.findAndCount({
      where: {
        roles: Role.User,
      },
      select: [
        'id',
        'email',
        'userName',
        'fullName',
        'avatar',
        'follower_number',
        'post_number',
        'isBlocked',
        'created_at',
      ],
      take: limit,
      skip: (page - 1) * limit,
    });

    const newResult = result?.map((item, index) => {
      return {
        ...item,
        created_at: formatVietnameseDate(`${item.created_at}`),
      };
    });

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: newResult,
      meta: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: +page,
        pageSize: +limit,
      },
    };
  }

  async blockUser(userId: UserIdDTO) {
    console.log('userId', userId);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isBlocked) {
      throw new Error('User is already blocked');
    }

    await userRepository.update({ id: userId.id }, { isBlocked: true });

    delete user.password;
    delete user.email;

    user.isBlocked = true;

    await userRepository.save(user);

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }

  async unblockUser(userId: UserIdDTO) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isBlocked) {
      throw new Error('User is already unblocked');
    }

    user.isBlocked = false;

    delete user.password;
    delete user.email;

    await userRepository.save(user);

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }
}
