/* eslint-disable prettier/prettier */
import { Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { InjectEntityModel } from '@midwayjs/orm';
import { Between, FindManyOptions, LessThan, MoreThan, Repository } from 'typeorm';
import { executionType, TradeModel } from '../model/tradeModel';
import {
  createTradeDTO,
  updateTradeDTO,
} from '../dto/tradeDto';

@Provide()
export class TradeService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(TradeModel)
  tradeModel: Repository<TradeModel>;

  checkTimeLargerThanNow(timeSupplied: string) {
    if (timeSupplied > new Date().toISOString()) return true;
    return false;
  }

  isOwner(trade: TradeModel) {
    if (trade && trade.UserId && this.ctx.state.userId && this.ctx.state.userId === trade.UserId) return true;
    return false;
  }

  async getTradeById(id: number) {
    return await this.tradeModel.findOne({ id });
  }

  async getTradesByFilter(filter: {
    UserId?: number
    executionType?: executionType
    executionStartDate?: string
    executionEndDate?: string
  }) {
    const finalFilter: FindManyOptions<TradeModel> = { where: {} };
    if (filter.UserId) finalFilter.where['UserId'] = filter.UserId;
    if (filter.executionType) finalFilter.where['executionType'] = filter.executionType;
    if (filter.executionStartDate && filter.executionEndDate) {
      finalFilter.where['executionDate'] = Between(filter.executionStartDate, filter.executionEndDate)
    } else {
      if (filter.executionStartDate) finalFilter.where['executionDate'] = MoreThan(filter.executionStartDate)
      if (filter.executionEndDate) finalFilter.where['executionDate'] = LessThan(filter.executionEndDate)
    }
    /*
     * TODO:Pagination, limit and order
     */
    return await this.tradeModel.find(finalFilter)
  }

  // async getTradesByFilter2() {
  //   return await this.tradeModel.findOne({
  //     where: {
  //       executionDate: LessThan('2022-11-15T00:26:16.570Z')
  //     },
  //   })
  // }

  async createTrade(params: createTradeDTO) {
    if (params.executionDate && this.checkTimeLargerThanNow(JSON.stringify(params.executionDate))) {
      return { success: false, status: 400, message: 'Previous records cannot be modified.' }

    }
    let trade = new TradeModel();
    trade = this.tradeModel.merge(trade, params);
    delete trade.id;
    return await this.tradeModel.save(trade);
  }

  async updateTrade(id: string, params: updateTradeDTO) {
    let trade = await this.getTradeById(parseInt(id));
    if (!this.isOwner(trade)) return {
      success: false, status: 401, message: 'Only owner can be able to modify trade.'
    }

    /* Trades that have executionDate in the past cannot be updated/deleted */
    if (trade.executionDate
      && JSON.stringify(trade.executionDate) < new Date().toISOString()
    ) {
      return { success: false, status: 403, message: 'Previous records cannot be modified.' }
    }

    trade = this.tradeModel.merge(trade, params);
    delete trade.id;

    await this.tradeModel.save(trade);
    return await this.getTradeById(parseInt(id));
  }

  async deleteTrade(id: number) {
    const trade = await this.getTradeById(id);
    if (!this.isOwner(trade)) return {
      success: false, status: 401, message: 'Only owner can be able to modify trade.'
    }

    /* Trades that have executionDate in the past cannot be updated/deleted */
    if (trade.executionDate
      && JSON.stringify(trade.executionDate) < new Date().toISOString()
    ) {
      return { success: false, status: 403, message: 'Previous records cannot be modified.' }
    }

    return await this.tradeModel.remove(trade);
  }
}
