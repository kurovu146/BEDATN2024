import { Controller, Post, Body, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EmailService } from 'src/common/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private emailService: EmailService,
  ) {}

  @Post('register')
  async register(@Body() user) {
    const newUser = await this.usersService.create(user);
    await this.emailService.sendConfirmationEmail(newUser.email, newUser.confirmationToken);

    return { message: 'Registration successful. Please check your email to confirm your account.' };
  }

  @Post('login')
  async login(@Body() req) {
    const user = await this.authService.validateUser(req.email, req.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Post('confirm')
  async confirmEmail(@Query('token') token: string) {
    const user = await this.usersService.findByConfirmationToken(token);
    if (!user) {
      return { message: 'Invalid confirmation token' };
    }
    await this.usersService.confirmEmail(user.id);
    
    return { message: 'Email confirmed successfully' };
  }
}
