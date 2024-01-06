import { ChildControllers, Controller } from '@overnightjs/core';
import UserController from './User';

@Controller('api/v1')
@ChildControllers([new UserController()])
export default class ControllerV1 {}
