import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
// import { SessionModule } from 'nestjs-session';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService],
})
export class AuthModule {}
