import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ID } from '../types/types';
import { ISearchUserParams } from './dto/ISerachUserParams';

interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: ISearchUserParams): Promise<User[]>;
}

@Injectable()
export class UsersService {}
