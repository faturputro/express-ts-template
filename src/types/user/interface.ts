import type User from '@/models/User';
import type { IBaseModelService } from '../service';
import type { RegisterUserDTO, UpdateUserDTO, UserDetails } from './dto';

export interface IUserService extends IBaseModelService<User> {
  create(dto: RegisterUserDTO): Promise<User>
  update(dto: UpdateUserDTO): Promise<void>
  getDetails(dto: { id?: number, email?: string }): Promise<UserDetails | null>
}

export interface IUserRepository {
  getByEmail(email: string): Promise<User | null>
  getById(id: number): Promise<User | null>
}
