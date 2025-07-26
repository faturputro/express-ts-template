import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { IDENTIFIER } from './dataType';

@Table({
  paranoid: true,
  timestamps: true,
  tableName: 'role',
  modelName: 'role',
})
export default class Role extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(IDENTIFIER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare slug: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare created_at: string;

  @AllowNull(false)
  @Column(IDENTIFIER)
  declare created_by: number;

  @AllowNull(false)
  @Column(IDENTIFIER)
  declare updated_by: number | null;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updated_at: string | null;

  @DeletedAt
  @Column(DataType.DATE)
  declare deleted_at: string | null;
}
