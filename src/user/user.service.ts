import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    username: string,
    email: string,
    password: string,
    role: string = 'user',
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return user.save();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async updateUser(id: string, user: UpdateAuthDto): Promise<User> {
    const oldUser = this.findOneById(id);
    if (oldUser) {
      return await this.userModel
        .findByIdAndUpdate(id, user, {
          new: true,
        })
        .exec();
    }
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
