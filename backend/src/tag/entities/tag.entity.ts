import { Column, Entity, ManyToMany } from 'typeorm';

import { BlogEntity } from '../../blog/entities/blog.entity';
import { BaseEntityWithAudit } from '../../core/entities/base.entity';

@Entity('tag')
export class TagEntity extends BaseEntityWithAudit {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @ManyToMany(() => BlogEntity, (blog) => blog.tags)
  blogs: BlogEntity[];
}
