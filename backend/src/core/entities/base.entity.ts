import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

abstract class TimestampedEntity {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}

abstract class AuditableBaseEntity extends TimestampedEntity {
  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ type: 'uuid', nullable: true })
  updatedBy: string;
}

export abstract class BaseEntityWithAudit extends AuditableBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

export abstract class BaseEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
