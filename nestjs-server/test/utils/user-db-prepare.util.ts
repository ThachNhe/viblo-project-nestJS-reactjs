import { Injectable, Body } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Injectable()
export class UserDbPrepareUtil {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async prepare(): Promise<void> {
    // Xóa dữ liệu cũ
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('user_votes')
      .execute();

    await this.dataSource.createQueryBuilder().delete().from('posts').execute();
    await this.dataSource.createQueryBuilder().delete().from('tags').execute();
    await this.dataSource.createQueryBuilder().delete().from('users').execute();

    // Tạo user mới
    const hashedPassword = await argon2.hash('123');

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          userName: 'thachdinh',
          email: 'thachdinh@gmail.com',
          password: hashedPassword,
          fullName: 'Test User',
          roles: Role.Admin,
        },
        {
          userName: 'khanhtran',
          email: 'khanhtran@gmail.com',
          password: hashedPassword,
          fullName: 'Tran Khanh',
          roles: Role.User,
        },
        {
          userName: 'hoanganh',
          email: 'hoanganh@gmail.com',
          password: hashedPassword,
          fullName: 'Hoang Anh',
          roles: Role.User,
        },

        {
          userName: 'nguyenvanA',
          email: 'nguyenvanA@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Van A',
          roles: Role.User,
        },
        {
          userName: 'tranthiB',
          email: 'tranthiB@example.com',
          password: hashedPassword,
          fullName: 'Tran Thi B',
          roles: Role.Admin,
        },
        {
          userName: 'lethivanC',
          email: 'lethivanC@example.com',
          password: hashedPassword,
          fullName: 'Le Thi Van C',
          roles: Role.User,
        },
        {
          userName: 'phamductinh',
          email: 'phamductinh@example.com',
          password: hashedPassword,
          fullName: 'Pham Duc Tinh',
          roles: Role.User,
        },
        {
          userName: 'dangthithao',
          email: 'dangthithao@example.com',
          password: hashedPassword,
          fullName: 'Dang Thi Thao',
          roles: Role.User,
        },
        {
          userName: 'hoanglong',
          email: 'hoanglong@example.com',
          password: hashedPassword,
          fullName: 'Hoang Long',
          roles: Role.User,
        },
        {
          userName: 'vominhquan',
          email: 'vominhquan@example.com',
          password: hashedPassword,
          fullName: 'Vo Minh Quan',
          roles: Role.User,
        },
        {
          userName: 'nguyenthiyen',
          email: 'nguyenthiyen@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Thi Yen',
          roles: Role.User,
        },
        {
          userName: 'tranphong',
          email: 'tranphong@example.com',
          password: hashedPassword,
          fullName: 'Tran Phong',
          roles: Role.Admin,
        },
        {
          userName: 'hoangmai',
          email: 'hoangmai@example.com',
          password: hashedPassword,
          fullName: 'Hoang Mai',
          roles: Role.User,
        },
        {
          userName: 'phamdinh',
          email: 'phamdinh@example.com',
          password: hashedPassword,
          fullName: 'Pham Dinh',
          roles: Role.User,
        },
        {
          userName: 'lethao',
          email: 'lethao@example.com',
          password: hashedPassword,
          fullName: 'Le Thao',
          roles: Role.User,
        },
        {
          userName: 'dangthivan',
          email: 'dangthivan@example.com',
          password: hashedPassword,
          fullName: 'Dang Thi Van',
          roles: Role.User,
        },
        {
          userName: 'phamhoang',
          email: 'phamhoang@example.com',
          password: hashedPassword,
          fullName: 'Pham Hoang',
          roles: Role.Admin,
        },
        {
          userName: 'buitruc',
          email: 'buitruc@example.com',
          password: hashedPassword,
          fullName: 'Bui Truc',
          roles: Role.User,
        },
        {
          userName: 'phamkhoan',
          email: 'phamkhoan@example.com',
          password: hashedPassword,
          fullName: 'Pham Khoan',
          roles: Role.User,
        },
        {
          userName: 'tranthien',
          email: 'tranthien@example.com',
          password: hashedPassword,
          fullName: 'Tran Thien',
          roles: Role.User,
        },
        {
          userName: 'hoangthi',
          email: 'hoangthi@example.com',
          password: hashedPassword,
          fullName: 'Hoang Thi',
          roles: Role.User,
        },
        {
          userName: 'nguyenba',
          email: 'nguyenba@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Ba',
          roles: Role.User,
        },
        {
          userName: 'lethihien',
          email: 'lethihien@example.com',
          password: hashedPassword,
          fullName: 'Le Thi Hien',
          roles: Role.User,
        },
        {
          userName: 'tranhanh',
          email: 'tranhanh@example.com',
          password: hashedPassword,
          fullName: 'Tran Hanh',
          roles: Role.User,
        },
        {
          userName: 'vudoan',
          email: 'vudoan@example.com',
          password: hashedPassword,
          fullName: 'Vu Doan',
          roles: Role.User,
        },
        {
          userName: 'nguyenthi',
          email: 'nguyenthi@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Thi',
          roles: Role.Admin,
        },
        {
          userName: 'phanquang',
          email: 'phanquang@example.com',
          password: hashedPassword,
          fullName: 'Phan Quang',
          roles: Role.User,
        },
        {
          userName: 'phamtruc',
          email: 'phamtruc@example.com',
          password: hashedPassword,
          fullName: 'Pham Truc',
          roles: Role.User,
        },
        {
          userName: 'nguyentuan',
          email: 'nguyentuan@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Tuan',
          roles: Role.User,
        },
        {
          userName: 'banguyen',
          email: 'banguyen@example.com',
          password: hashedPassword,
          fullName: 'Ba Nguyen',
          roles: Role.User,
        },
        {
          userName: 'tranlan',
          email: 'tranlan@example.com',
          password: hashedPassword,
          fullName: 'Tran Lan',
          roles: Role.User,
        },
        {
          userName: 'hoangthien',
          email: 'hoangthien@example.com',
          password: hashedPassword,
          fullName: 'Hoang Thien',
          roles: Role.User,
        },
        {
          userName: 'nguyenphuong',
          email: 'nguyenphuong@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Phuong',
          roles: Role.User,
        },
        {
          userName: 'phamtruong',
          email: 'phamtruong@example.com',
          password: hashedPassword,
          fullName: 'Pham Truong',
          roles: Role.User,
        },
        {
          userName: 'lethihoa',
          email: 'lethihoa@example.com',
          password: hashedPassword,
          fullName: 'Le Thi Hoa',
          roles: Role.User,
        },
        {
          userName: 'tranhuu',
          email: 'tranhuu@example.com',
          password: hashedPassword,
          fullName: 'Tran Huu',
          roles: Role.Admin,
        },
        {
          userName: 'nguyenthihong',
          email: 'nguyenthihong@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Thi Hong',
          roles: Role.User,
        },
        {
          userName: 'phamhung',
          email: 'phamhung@example.com',
          password: hashedPassword,
          fullName: 'Pham Hung',
          roles: Role.User,
        },
        {
          userName: 'hoangthienan',
          email: 'hoangthienan@example.com',
          password: hashedPassword,
          fullName: 'Hoang Thien An',
          roles: Role.User,
        },
        {
          userName: 'dangkim',
          email: 'dangkim@example.com',
          password: hashedPassword,
          fullName: 'Dang Kim',
          roles: Role.User,
        },
        {
          userName: 'lethiminh',
          email: 'lethiminh@example.com',
          password: hashedPassword,
          fullName: 'Le Thi Minh',
          roles: Role.User,
        },
        {
          userName: 'nguyenha',
          email: 'nguyenha@example.com',
          password: hashedPassword,
          fullName: 'Nguyen Ha',
          roles: Role.User,
        },
        {
          userName: 'vutruong',
          email: 'vutruong@example.com',
          password: hashedPassword,
          fullName: 'Vu Truong',
          roles: Role.User,
        },
      ])
      .execute();

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('tags')
      .values([
        { name: 'react.js', description: 'ReactJS' },
        { name: 'node.js', description: 'NodeJS' },
        { name: 'express', description: 'Express Framework' },
        { name: 'yarn', description: 'JavaScript Package Manager' },
        { name: 'firebase', description: 'Google Cloud Platform for Web' },
        { name: 'kubernetes', description: 'Container Orchestration' },
        { name: 'vue.js', description: 'VueJS Framework' },
        { name: 'angular', description: 'Angular Framework' },
        { name: 'flutter', description: 'UI Toolkit for Mobile' },
        { name: 'swift', description: 'Swift Programming Language' },
        { name: 'java', description: 'Java Programming Language' },
        { name: 'csharp', description: 'C# Programming Language' },
        { name: 'php', description: 'PHP Programming Language' },
        { name: 'ruby', description: 'Ruby Programming Language' },
        { name: 'django', description: 'Django Framework' },
        { name: 'laravel', description: 'Laravel Framework' },
        { name: 'go', description: 'Go Programming Language' },
        { name: 'rust', description: 'Rust Programming Language' },
        { name: 'sql', description: 'Structured Query Language' },
        { name: 'postgreSQL', description: 'PostgreSQL Database' },
        { name: 'redis', description: 'In-Memory Data Structure Store' },
        { name: 'graphql', description: 'GraphQL Query Language' },
        { name: 'rest', description: 'Representational State Transfer' },
        { name: 'api', description: 'Application Programming Interface' },
        { name: 'json', description: 'JavaScript Object Notation' },
        { name: 'xml', description: 'eXtensible Markup Language' },
        { name: 'axios', description: 'Promise-based HTTP Client' },
        { name: 'lodash', description: 'JavaScript Utility Library' },
        { name: 'moment.js', description: 'Date Manipulation Library' },
        {
          name: 'date-fns',
          description: 'Modern JavaScript Date Utility Library',
        },
        { name: 'chart.js', description: 'JavaScript Charting Library' },
        {
          name: 'd3.js',
          description: 'JavaScript Library for Data Visualization',
        },
        { name: 'bootstrap', description: 'Front-end Framework' },
        { name: 'material-ui', description: 'React UI Framework' },
        { name: 'ant-design', description: 'Design System for Enterprise' },
        {
          name: 'redux-saga',
          description: 'Side Effects Library for Redux',
        },
        {
          name: 'socket.io',
          description: 'Real-time Communication Library',
        },
        { name: 'webpack', description: 'JavaScript Module Bundler' },
        { name: 'typescript', description: 'TypeScript Language' },
        { name: 'eslint', description: 'JavaScript Linting Tool' },
      ])
      .execute();
  }
}
