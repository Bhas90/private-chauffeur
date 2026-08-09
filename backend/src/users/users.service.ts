import { Injectable } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findByEmail(email: string) {
    return this.prisma.adminUser.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  findById(id: number) {
    return this.prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}