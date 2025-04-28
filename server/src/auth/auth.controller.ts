import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUser, LoginUser } from './dto/auth.dto';
import { UserDetails } from 'src/user/interfaces/user-details.interface';
import { AuthDetails } from './interfaces/auth-details.interfaces';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Signup',
    description: 'Register a new user account.',
  })
  @ApiBody({ type: SignUpUser })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({
    status: 400,
    description: 'User already exists or bad request.',
  })
  async signupUser(@Body() payload: SignUpUser): Promise<UserDetails | null> {
    return this.authService.signupUser(payload);
  }

  @Post('signin')
  @ApiOperation({
    summary: 'User Signin',
    description: 'Authenticate user and set JWT cookie.',
  })
  @ApiBody({ type: LoginUser })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async signinUser(
    @Body() payload: LoginUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthDetails> {
    const loggedinUser = await this.authService.login(payload);
    res.cookie('token', loggedinUser?.token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    return {
      user: loggedinUser?.user,
    };
  }

  @Get('signout')
  @ApiOperation({
    summary: 'User Signout',
    description: 'Clear JWT token cookie to sign out user.',
  })
  @ApiResponse({ status: 200, description: 'User signed out successfully.' })
  async signout(@Res({ passthrough: true }) res: Response) {
    // Remove token from server side cookie
    res.cookie('token', '', {
      httpOnly: true,
    });
  }
}
