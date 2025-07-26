import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	Default,
	DeletedAt,
	HasMany,
	IsEmail,
	Model,
	PrimaryKey,
	Table,
	Unique,
	UpdatedAt,
} from 'sequelize-typescript';
import { IDENTIFIER } from './dataType';
import UserPermission from './UserPermission';
import Role from './Role';

@Table({
	paranoid: true,
	timestamps: true,
	tableName: 'user',
	modelName: 'user',
})
export default class User extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(IDENTIFIER)
	declare id: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare name: string;

	@AllowNull(false)
	@Unique
	@IsEmail
	@Column(DataType.STRING)
	declare email: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare password: string;

	@AllowNull(false)
	@Column(DataType.TINYINT)
	declare gender: number;

	@AllowNull(false)
	@Column(DataType.DATEONLY)
	declare date_of_birth: string;

	@Default(false)
	@Column(DataType.BOOLEAN)
	declare is_verified: boolean;

	@Default(false)
	@Column(IDENTIFIER)
	declare role_id: number;

	@CreatedAt
	@Column(DataType.DATE)
	declare created_at: string;

	@AllowNull(false)
	@Column(IDENTIFIER)
	declare created_by: number;

	@Column(IDENTIFIER)
	declare updated_by: number | null;

	@UpdatedAt
	@Column(DataType.DATE)
	declare updated_at: string | null;

	@DeletedAt
	@Column(DataType.DATE)
	declare deleted_at: string | null;

	@BelongsTo(() => Role, 'role_id')
	declare role: Role

	@HasMany(() => UserPermission, 'user_id')
	declare user_permissions: UserPermission[]
}
