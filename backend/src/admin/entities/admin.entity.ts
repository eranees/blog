import * as bcrypt from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { BlogEntity } from '../../blog/entities/blog.entity';
import { BaseEntity } from '../../core/entities/base.entity';
import { AccountStatus, UserType } from '../../core/globals.constants';

@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ length: 128 })
  name: string;

  @Column({ length: 128, unique: true, nullable: false })
  userName: string;

  @Column({ length: 128, unique: true, nullable: false })
  email: string;

  @Column({ length: 256, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.Active,
  })
  status: AccountStatus;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.Admin,
  })
  userType: UserType;

  @OneToMany(() => BlogEntity, (blog) => blog.admin)
  blogs: BlogEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
