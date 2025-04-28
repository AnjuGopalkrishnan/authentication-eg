import { Request } from 'express';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // Apply auth guard for all protected API routes
  constructor(private service: AuthService) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    // Fetch token from request cookies and verify JWT
    let token = '';
    if (req.cookies) {
      token = req.cookies['token'];
    }
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.service.verifyJwt(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
