import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptHashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;    
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRES_IN', 3600);
   }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.userService.findByUsername(username);

    if (!foundUser || !bcryptHashSync(password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: foundUser.username,
      sub: foundUser.id,
    }
    const token = this.jwtService.sign(payload);

    return { token: token, expiresIn: this.jwtExpirationTimeInSeconds};
  }
}