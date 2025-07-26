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

export type UserDetails = {
  id: number;
  email: string;
  name: string;
  date_of_birth: string;
  gender: number;
  password: string
  is_verified: boolean;
  role: {
    name: string;
    slug: string;
  };
  permissions: string[];
}
