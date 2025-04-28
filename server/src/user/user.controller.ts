import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  // User CRUD and feature APIs
}
