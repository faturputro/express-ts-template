import { ChildControllers, Controller } from '@overnightjs/core';
import UserController from './user.controller';

@Controller('api/v1')
@ChildControllers([new UserController()])
export default class ControllerV1 {}
