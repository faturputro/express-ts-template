import User from '@/models/User';
import type { ModelDTO } from '../model';

export type RegisterUserDTO = ModelDTO<User> & {
  user_id: number
  permissions: number[]
}

export type UpdateUserDTO = ModelDTO<User> & {
  id: number
  user_id: number
  permissions: number[]
}
