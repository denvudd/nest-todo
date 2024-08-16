import { Exclude, Expose } from 'class-transformer';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Exclude()
export class AbstractEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'boolean', default: false, })
  isDeleted: boolean;

  @Expose()
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Expose()
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
