import {
  Column,
  Entity,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Media extends Base<Media> {
  @Column('varchar')
  public creationId: string;

  @Column('varchar')
  public containerId: string;

  @Column('varchar')
  public igUserId: string;
 
}
