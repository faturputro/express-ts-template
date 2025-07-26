import Connection from '@/config/Connection';
import UserService from './user.service';
import AuthService from './auth.service';
import repositories from '@/repositories';

const db = Connection.DB();
const redis = Connection.Redis();

const userService = new UserService(db, repositories.user);
const authService = new AuthService(redis, userService);

export default {
  userService,
  authService,
};
