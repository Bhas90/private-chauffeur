import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { BlogStatus } from "@prisma/client";

import { PrismaService } from "../database/prisma.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Injectable()
export class BlogsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAllAdmin() {
    return this.prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findPublished() {
    return this.prisma.blog.findMany({
      where: {
        status: BlogStatus.PUBLISHED,
      },

      orderBy: {
        publishedAt: "desc",
      },
    });
  }

  async findOneById(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException(
        "Blog article was not found.",
      );
    }

    return blog;
  }

  async findPublishedBySlug(slug: string) {
    const blog = await this.prisma.blog.findFirst({
      where: {
        slug,
        status: BlogStatus.PUBLISHED,
      },
    });

    if (!blog) {
      throw new NotFoundException(
        "Blog article was not found.",
      );
    }

    return blog;
  }

  async create(dto: CreateBlogDto) {
    const slug = this.normaliseSlug(dto.slug);

    const existing =
      await this.prisma.blog.findUnique({
        where: { slug },
      });

    if (existing) {
      throw new ConflictException(
        "A blog with this slug already exists.",
      );
    }

    const status =
      dto.status === "PUBLISHED"
        ? BlogStatus.PUBLISHED
        : BlogStatus.DRAFT;

    return this.prisma.blog.create({
      data: {
        title: dto.title.trim(),
        slug,
        excerpt: dto.excerpt.trim(),
        category: dto.category.trim(),
        author: dto.author.trim(),

        publishedAt:
          status === BlogStatus.PUBLISHED
            ? dto.publishedAt
              ? new Date(dto.publishedAt)
              : new Date()
            : dto.publishedAt
              ? new Date(dto.publishedAt)
              : null,

        readingTime: dto.readingTime.trim(),

        image: dto.image?.trim() || null,

        featured: dto.featured ?? false,

        status,

        tags: dto.tags,

        sections: dto.sections,

        faqs: dto.faqs ?? [],

        seoTitle: dto.seoTitle.trim(),

        seoDescription:
          dto.seoDescription.trim(),

        relatedServiceSlugs:
          dto.relatedServiceSlugs,

        relatedFleetSlugs:
          dto.relatedFleetSlugs,

        relatedAreaSlugs:
          dto.relatedAreaSlugs,
      },
    });
  }

  async update(
    id: number,
    dto: UpdateBlogDto,
  ) {
    const current =
      await this.findOneById(id);

    let slug = current.slug;

    if (dto.slug) {
      slug = this.normaliseSlug(dto.slug);

      const duplicate =
        await this.prisma.blog.findFirst({
          where: {
            slug,
            NOT: {
              id,
            },
          },
        });

      if (duplicate) {
        throw new ConflictException(
          "A blog with this slug already exists.",
        );
      }
    }

    const newStatus = dto.status
      ? dto.status === "PUBLISHED"
        ? BlogStatus.PUBLISHED
        : BlogStatus.DRAFT
      : current.status;

    return this.prisma.blog.update({
      where: { id },

      data: {
        title: dto.title?.trim(),

        slug,

        excerpt: dto.excerpt?.trim(),

        category: dto.category?.trim(),

        author: dto.author?.trim(),

        readingTime:
          dto.readingTime?.trim(),

        image:
          dto.image !== undefined
            ? dto.image.trim() || null
            : undefined,

        featured: dto.featured,

        status: newStatus,

        publishedAt:
          newStatus === BlogStatus.PUBLISHED
            ? dto.publishedAt
              ? new Date(dto.publishedAt)
              : current.publishedAt ??
                new Date()
            : dto.publishedAt
              ? new Date(dto.publishedAt)
              : current.publishedAt,

        tags: dto.tags,

        sections: dto.sections,

        faqs: dto.faqs,

        seoTitle:
          dto.seoTitle?.trim(),

        seoDescription:
          dto.seoDescription?.trim(),

        relatedServiceSlugs:
          dto.relatedServiceSlugs,

        relatedFleetSlugs:
          dto.relatedFleetSlugs,

        relatedAreaSlugs:
          dto.relatedAreaSlugs,
      },
    });
  }

  async remove(id: number) {
    await this.findOneById(id);

    await this.prisma.blog.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Blog deleted successfully.",
    };
  }

  async publish(id: number) {
    await this.findOneById(id);

    return this.prisma.blog.update({
      where: { id },

      data: {
        status: BlogStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  async unpublish(id: number) {
    await this.findOneById(id);

    return this.prisma.blog.update({
      where: { id },

      data: {
        status: BlogStatus.DRAFT,
      },
    });
  }

  private normaliseSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}