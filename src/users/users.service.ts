import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { ID } from '../types/types';
import { ISearchUserParams } from './dto/ISerachUserParams';
import * as bcrypt from 'bcrypt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUserDto';

interface IUserService {
  create(data: Partial<CreateUserDto>): Promise<User>;

  findById(id: ID): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findAll(params: ISearchUserParams): Promise<User[]>;
}

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  create(data: CreateUserDto): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const password = data.password;
    const user = new this.UserModel({
      ...data,
      passwordHash: bcrypt.hashSync(password, salt),
    });
    return user.save();
  }

  findAll(params: ISearchUserParams): Promise<User[]> {
    const { limit, offset, ...filter } = params;
    return this.UserModel.find({
      $or: [
        { email: { $regex: filter.email, $options: 'i' } },
        { name: { $regex: filter.email, $options: 'i' } },
        { contactPhone: { $regex: filter.email, $options: 'i' } },
      ],
    })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email }).exec();
  }

  findById(id: ID): Promise<User> {
    return this.UserModel.findById(id).exec();
  }
}
