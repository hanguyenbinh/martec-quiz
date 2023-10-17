import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Users extends Base<Users> {
  @Column('varchar', {length: 40})
  public id1: string;

  @Column('varchar', {length: 40})
  public id2: string;  
}
