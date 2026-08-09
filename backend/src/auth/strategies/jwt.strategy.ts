import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {
  ExtractJwt,
  Strategy,
} from "passport-jwt";

import { UsersService } from "../../users/users.service";

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    const secret =
      configService.get<string>("JWT_SECRET");

    if (!secret) {
      throw new Error(
        "JWT_SECRET is not configured.",
      );
    }

    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    const admin =
      await this.usersService.findById(payload.sub);

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException(
        "Administrator account is unavailable.",
      );
    }

    return admin;
  }
}