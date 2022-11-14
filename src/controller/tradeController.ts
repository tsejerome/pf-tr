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
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { TradeService } from '../service/tradeService';
import { createTradeDTO, updateTradeDTO } from '../dto/tradeDto';
import { executionType } from '../model/tradeModel';

@Provide()
@Controller('/trades')
export class TradeController {
  @Inject()
  ctx: Context;

  @Inject()
  tradeService: TradeService;

  @Get('/')
  async getTradesByFilter(
    @Query() UserId: string,
    @Query() executionStartDate: string,
    @Query() executionEndDate: string,
    @Query() executionType: executionType
  ) {
    const user = await this.tradeService.getTradesByFilter({
      UserId: UserId ? parseInt(UserId) : null,
      executionStartDate,
      executionEndDate,
      executionType,
    });
    this.ctx.helper.success(user);
  }

  @Get('/:id')
  async getTradeById(@Param() id: number) {
    const user = await this.tradeService.getTradeById(id);
    this.ctx.helper.success(user);
  }

  @Post('/', { middleware: ['authSetupMiddleware'] })
  async createTrade(@Body(ALL) params: createTradeDTO) {
    try {
      const user = await this.tradeService.createTrade(params);
      this.ctx.helper.success(user);
    } catch (err) {
      this.ctx.helper.error(err);
    }
  }

  @Patch('/:id', { middleware: ['authSetupMiddleware'] })
  async updateTrade(@Param() id: string, @Body(ALL) params: updateTradeDTO) {
    const user = await this.tradeService.updateTrade(id, params);
    this.ctx.helper.success(user);
  }

  @Del('/:id', { middleware: ['authSetupMiddleware'] })
  async deleteTrade(@Param() id: number) {
    const user = await this.tradeService.deleteTrade(id);
    this.ctx.helper.success(user);
  }
}
