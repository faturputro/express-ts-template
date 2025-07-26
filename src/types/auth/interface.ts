import { UserDetails } from '../user';
import { LoginDTO } from './dto';

export interface IAuthService {
  login(dto: LoginDTO): Promise<{ token: string }>
  getProfile(userId: number): Promise<UserDetails>
  logout(): Promise<void>
}
