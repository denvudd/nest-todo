import { AbstractEntity } from 'src/common/typeorm/entity/abstract.entity';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Exclude()
@Entity('user')
export class UserEntity extends AbstractEntity {
  @Expose()
  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Expose()
  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Expose()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Expose()
  @Column({ type: 'timestamp with time zone', default: () => 'null' })
  activatedAt: Date;

  @Expose()
  @Column('boolean', { nullable: false, default: false })
  isAdmin: boolean;

  @Expose()
  @Column({ type: 'date', default: () => 'null' })
  dateOfBirth: Date;

  @Expose()
  @Column({ type: 'varchar', length: 255, default: () => 'null' })
  phoneNumber: string;
}
