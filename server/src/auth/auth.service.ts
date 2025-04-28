import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUser, SignUpUser } from 'src/auth/dto/auth.dto';
import { UserDetails } from 'src/user/interfaces/user-details.interface';
import { UserService } from 'src/user/user.service';
import { AuthDetails } from './interfaces/auth-details.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async signupUser(user: Readonly<SignUpUser>): Promise<UserDetails | null> {
    const { name, email, password } = user;

    this.logger.log(`Attempting signup for email: ${email}`);

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      this.logger.warn(`Signup failed - Email already exists: ${email}`);
      throw new BadRequestException(
        'An account with this email already exists!',
      );
    }
    // Hash password before saving
    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword);

    this.logger.log(`Signup successful for email: ${email}`);

    // Fetch saved user details from DB
    return this.userService.getUserDetails(newUser);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      this.logger.warn(`Validation failed - User not found: ${email}`);
      throw new UnauthorizedException(
        'User not registered. Sign up to proceed.',
      );
    }
    // Comparing new password with saved one for verification
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      this.logger.warn(
        `Validation failed - Incorrect password for email: ${email}`,
      );
      throw new UnauthorizedException('Password is incorrect!');
    }

    return this.userService.getUserDetails(user);
  }

  async login(existingUser: LoginUser): Promise<AuthDetails> {
    const { email, password } = existingUser;

    this.logger.log(`Login attempt for email: ${email}`);

    // Validate user by checking DB entry
    const user = await this.validateUser(email, password);

    if (!user) {
      this.logger.error('Login failed - Invalid credentials');
      throw new UnauthorizedException('Email or password is incorrect!');
    }

    // Sign JWT token after successful validation
    const jwt = await this.jwtService.signAsync({ user });

    this.logger.log(`Login successful - JWT issued for email: ${email}`);
    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      this.logger.warn('JWT verification failed');
      throw new UnauthorizedException('Invalid JWT!');
    }
  }
}
