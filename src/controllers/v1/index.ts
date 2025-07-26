import { ChildControllers, Controller } from '@overnightjs/core';
import UserController from './user.controller';
import services from '@/services';
import AuthController from './auth.controller';

@Controller('api/v1')
@ChildControllers([
  new UserController(services.userService),
  new AuthController(services.authService),
])
export default class ControllerV1 {}
