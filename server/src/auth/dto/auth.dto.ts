import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignUpUser {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Minimum length of 8 characters' })
  @Matches(/[A-Za-z]/, { message: 'Password must contain at least 1 letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least 1 number' })
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Password must contain at least 1 special character',
  })
  password: string;
}

export class LoginUser {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Minimum length of 8 characters' })
  @Matches(/[A-Za-z]/, { message: 'Password must contain at least 1 letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least 1 number' })
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Password must contain at least 1 special character',
  })
  password: string;
}
