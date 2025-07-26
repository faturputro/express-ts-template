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
import Role from './Role';
import Permission from './Permission';

@Table({
  paranoid: true,
  timestamps: true,
  tableName: 'role_permission',
  modelName: 'role_permission',
})
export default class RolePermission extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(IDENTIFIER)
  declare id: number;

  @AllowNull(false)
  @Column(IDENTIFIER)
  declare role_id: number;

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

  @BelongsTo(() => Role, 'role_id')
  declare role: Role;

  @BelongsTo(() => Permission, 'permission_id')
  declare permission: Permission;
}
