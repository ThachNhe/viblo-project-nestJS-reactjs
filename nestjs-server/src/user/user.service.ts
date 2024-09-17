import { Injectable, Query } from '@nestjs/common';
import { AppDataSource } from '../index';
import { User } from '../entity/User';
import { UrlDto, UserIdDTO, UserPaginationDTO } from './dto/user.dto';
import { formatVietnameseDate } from 'src/utils/common.function';
import { Role } from '../enums/index';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getUser(id: UserIdDTO) {
    return await this.userRepository.findOne({
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
    const user = await this.userRepository.findOne({
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

    await this.userRepository.save(user);
    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }

  async getUsersService(query: UserPaginationDTO) {
    const { page = 1, limit = 15 } = query;

    const [result, total] = await this.userRepository.findAndCount({
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
    const user = await this.userRepository.findOne({
      where: { id: userId.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isBlocked) {
      throw new Error('User is already blocked');
    }

    await this.userRepository.update({ id: userId.id }, { isBlocked: true });

    delete user.password;
    delete user.email;

    user.isBlocked = true;

    await this.userRepository.save(user);

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }

  async unblockUser(userId: UserIdDTO) {
    const user = await this.userRepository.findOne({
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

    await this.userRepository.save(user);

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }
}
