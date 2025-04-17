import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { AdminEntity } from '../../admin/entities/admin.entity';
import { BaseEntityWithAudit } from '../../core/entities/base.entity';
import { BlogStatus } from '../../core/globals.constants';
import { TagEntity } from '../../tag/entities/tag.entity';

@Entity('blog')
export class BlogEntity extends BaseEntityWithAudit {
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageURL: string;

  @Column({ type: 'int', nullable: false, default: 1 })
  readMinutes: number;

  @Column({ type: 'varchar', length: 200 })
  slug: string;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.Draft,
  })
  status: BlogStatus;

  @Column({ default: 0, type: 'int' })
  views: number;

  @Column({ default: 0, type: 'int' })
  shares: number;

  @ManyToOne(() => AdminEntity, (admin) => admin.blogs)
  admin: AdminEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.blogs, { cascade: true })
  @JoinTable({ name: 'blogs_tags' })
  tags: TagEntity[];

  @BeforeInsert()
  async generateSlug() {
    this.slug = this.title.toLocaleLowerCase().replace(/ /g, '-');
  }
}
