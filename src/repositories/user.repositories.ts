import Permission from '@/models/Permission';
import Role from '@/models/Role';
import RolePermission from '@/models/RolePermission';
import User from '@/models/User';
import UserPermission from '@/models/UserPermission';
import { IUserRepository } from '@/types/user';

export default class UserRepository implements IUserRepository {
  async getByEmail(email: string) {
    return await User.findOne({
      include: [
        {
          model: Role,
          include: [
            {
              model: RolePermission,
              include: [
                {
                  model: Permission,
                },
              ]
            },
          ]
        },
        {
          model: UserPermission,
          include: [
            {
              model: Permission,
            },
          ],
        },
      ],
      where: {
        email,
      },
    });
  }

  async getById(id: number) {
    return await User.findOne({
      include: [
        {
          model: Role,
          include: [
            {
              model: RolePermission,
              include: [
                {
                  model: Permission,
                },
              ]
            },
          ]
        },
        {
          model: UserPermission,
          include: [
            {
              model: Permission,
            },
          ],
        },
      ],
      where: {
        id,
      },
    });
  }
}
