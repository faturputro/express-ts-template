import { ChildControllers, Controller } from '@overnightjs/core';
import UserController from './user.controller';
import services from '@/services';

@Controller('api/v1')
@ChildControllers([
  new UserController(services.userService)
])
export default class ControllerV1 {}
