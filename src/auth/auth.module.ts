import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../utils/jwt.strategy';
import { EmailService } from 'src/common/email.service';
import { UserGuard } from './user.guard';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule
  ],
  providers: [AuthService, UsersService, JwtStrategy, EmailService, UserGuard],
  controllers: [AuthController],
})
export class AuthModule {}
