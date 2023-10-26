import {
  Column,
  Entity,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Users extends Base<Users> {
  @Column('varchar', {nullable: true})
  public email: string;

  @Column('varchar', {nullable: true})
  public accessToken: string;


  @Column('varchar', {nullable: true})
  public facebookUserId: string;

 
  @Column('varchar', {nullable: true})
  public signinRequest: string;

  @Column('varchar', {nullable: true})
  public scopes: string;

  @Column('int', {nullable: true})
  public expiredTime: number;

  @Column('varchar', {nullable: true})
  public graphDomain: string;


  @Column('timestamp with time zone')
  public lastLoginTime: Date;
}
