import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UrlDto, UserIdDTO, UserPaginationDTO } from './dto/user.dto';
import { formatVietnameseDate } from '../utils/common.function';
import { Role } from '../enums/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, User } from '../entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async getUser(id: UserIdDTO) {
    const user = await this.userRepository.findOne({
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

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: user,
    };
  }

  async uploadAvatar(userId: number, avatar: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'userName', 'fullName', 'avatar'],
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
      throw new NotFoundException('User not found');
    }

    if (user.isBlocked) {
      throw new BadRequestException('User is already blocked');
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
      data: 'Block user successfully',
    };
  }

  async unblockUser(userId: UserIdDTO) {
    const user = await this.userRepository.findOne({
      where: { id: userId.id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isBlocked) {
      throw new BadRequestException('User is already unblocked');
    }

    user.isBlocked = false;

    delete user.password;
    delete user.email;

    await this.userRepository.save(user);

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: 'Unblock user successfully',
    };
  }

  async getTopUsers(query: UserPaginationDTO) {
    const { page = 1, limit = 15 } = query;
    const offset = (page - 1) * limit;

    const result = await this.postRepository
      .createQueryBuilder('post')
      .innerJoin('post.author', 'user') // Thực hiện JOIN với bảng user dựa trên mối quan hệ
      .select('user.fullName', 'fullName') // Lấy thông tin fullName
      .addSelect('user.userName', 'userName') // Lấy thông tin userName
      .addSelect('user.follower_number', 'follower_number') // Lấy số follower
      .addSelect('user.avatar', 'avatar') // Lấy avatar
      .addSelect('user.post_number', 'post_number') // Lấy số lượng bài viết
      .addSelect('SUM(post.view_number)', 'view_number') // Tính tổng số lượt xem
      .groupBy('user.fullName') // Nhóm theo fullName
      .addGroupBy('user.userName') // Nhóm theo userName
      .addGroupBy('user.follower_number') // Nhóm theo số lượng follower
      .addGroupBy('user.avatar') // Nhóm theo avatar
      .addGroupBy('user.post_number')
      .take(limit)
      .limit((page - 1) * limit) // Nhóm theo số lượng bài viết
      .getRawMany(); // Lấy kết quả dưới dạng raw data

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: result,
      meta: {
        totalItems: result.length,
        totalPages: Math.ceil(result.length / limit),
        currentPage: +page,
        pageSize: +limit,
      },
    };
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete({ id: id });

    return {
      success: true,
      statusCode: 200,
      error: null,
      data: 'Delete user successfully',
    };
  }
}
