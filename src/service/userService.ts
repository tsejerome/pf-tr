/* eslint-disable prettier/prettier */
import { Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserModel } from '../model/userModel';
import {
  createUserDTO,
  updateUserDTO,
} from '../dto/userDto';

@Provide()
export class UserService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(UserModel)
  userModel: Repository<UserModel>;

  async getUserById(id: number) {
    return await this.userModel.findOne({ id });
  }

  async createUser(params: createUserDTO) {
    const user = new UserModel();
    if (params.name) user.name = params.name;
    delete user.id;
    return await this.userModel.save(user);
  }

  async updateUser(id: string, params: updateUserDTO) {
    const user = await this.getUserById(parseInt(id));
    /* ID is not modifiable */
    params.name !== user.name && (user.name = params.name);
    await this.userModel.save(user);
    return await this.getUserById(parseInt(id));
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    return await this.userModel.remove(user);
  }
}
