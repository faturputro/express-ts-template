import { Table, Column, Model, AllowNull, DataType, AutoIncrement, PrimaryKey, Unique, IsEmail, Default, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true, tableName: 'user', modelName: 'user' })
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
    id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
    name!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column(DataType.STRING)
    email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
    password!: string;

  @AllowNull(false)
  @Column(DataType.TINYINT)
    gender!: number;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
    date_of_birth!: Date;

  @Default(1)
  @Column(DataType.SMALLINT)
    subscription_type!: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
    is_verified!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
    created_at!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
    updated_at?: Date;

  @DeletedAt
  @Column(DataType.DATE)
    deleted_at?: Date;
}
