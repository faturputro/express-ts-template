import Connection from '@/config/Connection';
import UserService from './user.service';

const db = Connection.DB();

const userService = new UserService(db);

export default {
  userService,
};
