import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel({
  name: 'users',
})
export class UserModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, comment: 'Username' })
  name: string;
}
