import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IDENTIFIER } from './dataType';
import User from './User';
import Permission from './Permission';

@Table({
  paranoid: true,
  timestamps: true,
  tableName: 'user_permission',
  modelName: 'user_permission',
})
export default class UserPermission extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(IDENTIFIER)
  declare id: number;

  @AllowNull(false)
  @Column(IDENTIFIER)
  declare user_id: number;

  @AllowNull(false)
  @Column(IDENTIFIER)
  declare permission_id: number;

  @CreatedAt
  @Column(DataType.DATE)
  declare created_at: string;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updated_at: string | null;

  @DeletedAt
  @Column(DataType.DATE)
  declare deleted_at: string | null;

  @BelongsTo(() => User, 'user_id')
  declare user: User;

  @BelongsTo(() => Permission, 'permission_id')
  declare permission: Permission;
}
