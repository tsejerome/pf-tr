import { Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

export enum executionType {
  buy = 'buy',
  sell = 'sell',
}

@EntityModel({
  name: 'trades',
})
export class TradeModel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 10, comment: 'Ticker' })
  ticker: string;

  @Column({
    type: 'varchar',
    precision: 20,
    scale: 2,
    comment: 'Amount in Decimal',
  })
  amount: string;

  @Column({
    type: 'varchar',
    precision: 20,
    scale: 2,
    comment: 'Price in Decimal',
  })
  price: string;

  @Column({ type: 'varchar', length: 255, comment: 'Execution Type' })
  executionType: executionType;

  @Column({ type: 'timestamp', comment: 'Trade Execution Timestamp' })
  executionDate: Timestamp;

  /* TODO: Conscious decision made on whether explicitly makign this as foreign key on SQL Side */
  // @ManyToOne(type => UserModel, user => user.id)
  @Column({
    type: 'bigint',
    name: 'UserId',
  })
  UserId: number;
}
