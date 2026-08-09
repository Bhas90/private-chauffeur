import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const email = loginDto.email
      .trim()
      .toLowerCase();

    const admin =
      await this.usersService.findByEmail(email);

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }

    const passwordMatches = await compare(
      loginDto.password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }

    const accessToken =
      await this.jwtService.signAsync({
        sub: admin.id,
        email: admin.email,
      });

    return {
      accessToken,

      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
}