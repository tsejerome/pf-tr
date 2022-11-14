import {
  Inject,
  Controller,
  Provide,
  Get,
  Param,
  Post,
  Body,
  ALL,
  Del,
  Patch,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../service/userService';
import { createUserDTO, updateUserDTO } from '../dto/userDto';

@Provide()
@Controller('/users')
export class userController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/:id')
  async getUserById(@Param() id: number) {
    const user = await this.userService.getUserById(id);
    this.ctx.helper.success(user);
  }

  @Post('/', { middleware: ['authSetupMiddleware'] })
  async createUser(@Body(ALL) params: createUserDTO) {
    const user = await this.userService.createUser(params);
    this.ctx.helper.success(user);
  }

  @Patch('/:id', { middleware: ['authSetupMiddleware'] })
  async updateUser(@Param() id: string, @Body(ALL) params: updateUserDTO) {
    const user = await this.userService.updateUser(id, params);
    this.ctx.helper.success(user);
  }

  @Del('/:id', { middleware: ['authSetupMiddleware'] })
  async deleteUser(@Param() id: number) {
    const user = await this.userService.deleteUser(id);
    this.ctx.helper.success(user);
  }
}
