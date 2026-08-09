import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { BlogsService } from "./blogs.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
  ) {}

  /* =======================================================
     PUBLIC
  ======================================================= */

  @Get()
  findPublished() {
    return this.blogsService.findPublished();
  }

  @Get("slug/:slug")
  findPublishedBySlug(
    @Param("slug") slug: string,
  ) {
    return this.blogsService.findPublishedBySlug(
      slug,
    );
  }

  /* =======================================================
     ADMIN
  ======================================================= */

  @UseGuards(JwtAuthGuard)
  @Get("admin/all")
  findAllAdmin() {
    return this.blogsService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get("admin/:id")
  findOneAdmin(
    @Param("id", ParseIntPipe)
    id: number,
  ) {
    return this.blogsService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("admin")
  create(
    @Body() dto: CreateBlogDto,
  ) {
    return this.blogsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put("admin/:id")
  update(
    @Param("id", ParseIntPipe)
    id: number,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogsService.update(
      id,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch("admin/:id/publish")
  publish(
    @Param("id", ParseIntPipe)
    id: number,
  ) {
    return this.blogsService.publish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("admin/:id/unpublish")
  unpublish(
    @Param("id", ParseIntPipe)
    id: number,
  ) {
    return this.blogsService.unpublish(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("admin/:id")
  remove(
    @Param("id", ParseIntPipe)
    id: number,
  ) {
    return this.blogsService.remove(id);
  }
}