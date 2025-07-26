import { literal, Op, Sequelize, WhereOptions } from 'sequelize';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { BaseQueryParams, Paginated } from '@/types/query';
import type { IUserRepository, IUserService, RegisterUserDTO, UpdateUserDTO, UserDetails } from '@/types/user';
import AppError from '@/utils/AppError';
import { AppErrorCode } from '@/types/app';
import { logger } from '@/utils/logger';
import UserPermission from '@/models/UserPermission';

export default class UserService implements IUserService {
  constructor(
    private readonly db: Sequelize,
    private readonly userRepo: IUserRepository
  ) {}

  async getAll(params: BaseQueryParams): Promise<Paginated<User>> {
    const where: WhereOptions<User> = {};

    if (params.searchField === 'name') {
      where.name = {
        [Op.startsWith]: params.searchQuery
      };
    }

    if (params.searchField === 'email') {
      where.email = {
        [Op.startsWith]: params.searchQuery
      };
    }

    const result = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      where,
      limit: Number(params.limit),
      offset: Number(params.page),
    });

    return result;
  }

  async getDetails(dto: { id?: number, email?: string }): Promise<UserDetails | null> {
    const transform = (user: User) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
      is_verified: user.is_verified,
      password: user.password,
      role: {
        name: user.role.name,
        slug: user.role.slug,
      },
      permissions: Array.from(
        new Set(
          user.role.role_permissions.map((p) => p.permission.slug)
            .concat(user.user_permissions.map((p) => p.permission.slug))
        )
      ),
    });

    if (dto.email) {
      const result = await this.userRepo.getByEmail(dto.email);
      if (result) {
        return transform(result);
      }

      return null;
    }
    
    if (dto.id) {
      const result = await this.userRepo.getById(dto.id);
      if (result) {
        return transform(result);
      }

      return null;
    }

    throw new Error('ID or email is required');
  }

  async create(dto: RegisterUserDTO): Promise<User> {
    const t = await this.db.transaction();
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(dto.password, salt);
      const result = await User.create({
        ...dto,
        password: hash,
        created_by: 1,
      }, { transaction: t });

      if (dto.permissions.length) {
        await UserPermission.bulkCreate(dto.permissions.map((p) => {
          return {
            user_id: result.id,
            permission_id: p,
          };
        }), { transaction: t });
      }

      await t.commit();
      return result;
    } catch (e) {
      await t.rollback();
      logger.error('Error UserService.create', e);
      throw e;
    }
  }

  async update(dto: UpdateUserDTO): Promise<void> {
    const t = await this.db.transaction();
    const NOW = Date.now();
    try {
      const user = await User.findByPk(dto.id, {
        include: [
          {
            attributes: ['permission_id'],
            model: UserPermission,
          },
        ],
        rejectOnEmpty: new AppError({ code: AppErrorCode.DataNotFound, message: 'User not found', t: 'COMMON.NOT_FOUND' }),
        raw: true,
      });

      await User.update({
        ...dto,
        updated_at: NOW,
        updated_by: dto.user_id,
      }, {
        where: {
          id: dto.id,
        },
        transaction: t,
      });

      if (dto.permissions.length) {
        const existingPermissions = user.user_permissions.map((p) => p.permission_id);
        const newPermissions = dto.permissions.filter((p) => !existingPermissions.includes(p));
        const deletedPermissions = existingPermissions.filter((p) => !dto.permissions.includes(p));

        await UserPermission.bulkCreate(newPermissions.map((p) => {
          return {
            permission_id: p,
            user_id: user.id,
          };
        }), { transaction: t });

        if (deletedPermissions.length) {
          await UserPermission.update({
            deleted_at: NOW,
          }, {
            where: literal(`(user_id, permission_id) IN (${deletedPermissions.map(p => `(${user.id}, ${p})`).join(',')})`),
            transaction: t,
          });
        }
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      logger.error('Error UserService.update', e);
      throw e;
    }
  }

  async delete(id: number): Promise<void> {
    const t = await this.db.transaction();
    try {
      await Promise.all([
        User.destroy({
          where: {
            id
          },
          transaction: t,
        }),
        UserPermission.destroy({
          where: {
            user_id: id,
          },
          transaction: t,
        }),
      ]);

      await t.commit();
    } catch (e) {
      await t.rollback();
      logger.error('Error UserService.delete', e);
      throw e;
    }
  }
}
