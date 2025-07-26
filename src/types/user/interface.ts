import type User from '@/models/User';
import type { IBaseModelService } from '../service';
import type { RegisterUserDTO, UpdateUserDTO } from './dto';

export interface IUserService extends IBaseModelService<User> {
  create(dto: RegisterUserDTO): Promise<User>
  update(dto: UpdateUserDTO): Promise<void>
}
