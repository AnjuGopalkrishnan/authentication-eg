import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
//@UseGuards(AuthGuard)
export class UserController {
  // User CRUD and feature APIs
}
