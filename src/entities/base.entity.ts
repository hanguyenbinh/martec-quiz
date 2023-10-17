import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base<T> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { nullable: true })
  createdBy: number;

  @Column('integer', { nullable: true })
  updatedBy: number;

  @Column('integer', { nullable: true })
  deletedBy: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  public deletedAt: Date;  
}
