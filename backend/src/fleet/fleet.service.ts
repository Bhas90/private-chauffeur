import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  FleetMediaType,
  Prisma,
} from "@prisma/client";

import { PrismaService } from "../database/prisma.service";
import { CreateFleetDto } from "./dto/create-fleet.dto";
import { CreateFleetMediaDto } from "./dto/create-fleet-media.dto";
import { OrderFleetMediaDto } from "./dto/order-fleet-media.dto";
import { UpdateFleetDto } from "./dto/update-fleet.dto";
import { UpdateFleetPopupDto } from "./dto/update-fleet-popup.dto";

const fleetInclude = {
  features: {
    orderBy: { displayOrder: "asc" },
  },
  journeys: {
    orderBy: { displayOrder: "asc" },
  },
  media: {
    orderBy: { displayOrder: "asc" },
  },
} satisfies Prisma.FleetVehicleInclude;

@Injectable()
export class FleetService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findPublished() {
    return this.prisma.fleetVehicle.findMany({
      where: { active: true },
      include: fleetInclude,
      orderBy: [
        { displayOrder: "asc" },
        { name: "asc" },
      ],
    });
  }

  async findFeatured() {
    return this.prisma.fleetVehicle.findMany({
      where: {
        active: true,
        featured: true,
      },
      include: fleetInclude,
      orderBy: [
        { displayOrder: "asc" },
        { name: "asc" },
      ],
    });
  }

  async findPublishedBySlug(slug: string) {
    const vehicle =
      await this.prisma.fleetVehicle.findFirst({
        where: {
          slug,
          active: true,
        },
        include: fleetInclude,
      });

    if (!vehicle) {
      throw new NotFoundException(
        "Fleet vehicle was not found.",
      );
    }

    return vehicle;
  }

  async findAllAdmin() {
    return this.prisma.fleetVehicle.findMany({
      include: fleetInclude,
      orderBy: [
        { displayOrder: "asc" },
        { name: "asc" },
      ],
    });
  }

  async findOneAdmin(id: number) {
    const vehicle =
      await this.prisma.fleetVehicle.findUnique({
        where: { id },
        include: fleetInclude,
      });

    if (!vehicle) {
      throw new NotFoundException(
        "Fleet vehicle was not found.",
      );
    }

    return vehicle;
  }

  async create(dto: CreateFleetDto) {
    const slug = this.normaliseSlug(dto.slug);

    await this.ensureSlugAvailable(slug);

    return this.prisma.fleetVehicle.create({
      data: {
        name: dto.name.trim(),
        slug,
        category: dto.category.trim(),
        heroDescription: dto.heroDescription.trim(),
        description: dto.description.trim(),
        coverImage: this.nullable(dto.coverImage),
        passengers: dto.passengers,
        largeBags: dto.largeBags,
        cabinBags: dto.cabinBags,
        active: dto.active ?? true,
        featured: dto.featured ?? false,
        displayOrder: dto.displayOrder ?? 0,
        seoTitle: dto.seoTitle.trim(),
        seoDescription: dto.seoDescription.trim(),
        features: {
          create: (dto.features ?? []).map(
            (feature, index) => ({
              title: feature.title.trim(),
              description: feature.description.trim(),
              displayOrder: index,
            }),
          ),
        },
        journeys: {
          create: (
            dto.recommendedJourneys ?? []
          ).map((journey, index) => ({
            title: journey.title.trim(),
            displayOrder: index,
          })),
        },
      },
      include: fleetInclude,
    });
  }

  async update(
    id: number,
    dto: UpdateFleetDto,
  ) {
    const current = await this.findOneAdmin(id);
    const slug = dto.slug
      ? this.normaliseSlug(dto.slug)
      : current.slug;

    await this.ensureSlugAvailable(slug, id);

    return this.prisma.fleetVehicle.update({
      where: { id },
      data: {
        name: dto.name?.trim(),
        slug,
        category: dto.category?.trim(),
        heroDescription:
          dto.heroDescription?.trim(),
        description: dto.description?.trim(),
        coverImage:
          dto.coverImage !== undefined
            ? this.nullable(dto.coverImage)
            : undefined,
        passengers: dto.passengers,
        largeBags: dto.largeBags,
        cabinBags: dto.cabinBags,
        active: dto.active,
        featured: dto.featured,
        displayOrder: dto.displayOrder,
        seoTitle: dto.seoTitle?.trim(),
        seoDescription: dto.seoDescription?.trim(),
        features:
          dto.features !== undefined
            ? {
              deleteMany: {},
              create: dto.features.map(
                (feature, index) => ({
                  title: feature.title.trim(),
                  description:
                    feature.description.trim(),
                  displayOrder: index,
                }),
              ),
            }
            : undefined,
        journeys:
          dto.recommendedJourneys !== undefined
            ? {
              deleteMany: {},
              create:
                dto.recommendedJourneys.map(
                  (journey, index) => ({
                    title: journey.title.trim(),
                    displayOrder: index,
                  }),
                ),
            }
            : undefined,
      },
      include: fleetInclude,
    });
  }

  async remove(id: number) {
    await this.findOneAdmin(id);

    await this.prisma.fleetVehicle.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Fleet vehicle deleted successfully.",
    };
  }

  async addMedia(
    vehicleId: number,
    dto: CreateFleetMediaDto,
  ) {
    await this.findOneAdmin(vehicleId);

    const media =
      await this.prisma.fleetMedia.create({
        data: {
          vehicleId,
          type: dto.type as FleetMediaType,
          url: dto.url.trim(),
          altText: this.nullable(dto.altText),
          displayOrder: dto.displayOrder ?? 0,
        },
      });

    if (dto.type === "COVER") {
      await this.prisma.fleetVehicle.update({
        where: { id: vehicleId },
        data: { coverImage: media.url },
      });
    }

    return media;
  }

  async removeMedia(
    vehicleId: number,
    mediaId: number,
  ) {
    const media =
      await this.prisma.fleetMedia.findFirst({
        where: {
          id: mediaId,
          vehicleId,
        },
      });

    if (!media) {
      throw new NotFoundException(
        "Fleet media was not found.",
      );
    }

    await this.prisma.fleetMedia.delete({
      where: { id: mediaId },
    });

    return {
      success: true,
      message: "Fleet media deleted successfully.",
    };
  }

  async orderMedia(
    vehicleId: number,
    dto: OrderFleetMediaDto,
  ) {
    const media =
      await this.prisma.fleetMedia.findMany({
        where: {
          vehicleId,
          id: { in: dto.mediaIds },
        },
      });

    if (media.length !== dto.mediaIds.length) {
      throw new NotFoundException(
        "One or more fleet media items were not found.",
      );
    }

    await this.prisma.$transaction(
      dto.mediaIds.map((id, index) =>
        this.prisma.fleetMedia.update({
          where: { id },
          data: { displayOrder: index },
        }),
      ),
    );

    return this.findOneAdmin(vehicleId);
  }

  async getPopupAdmin() {
    return this.getOrCreatePopup();
  }

  async getPublicPopup() {
    const popup = await this.getOrCreatePopup();

    if (
      !popup.enabled ||
      !popup.fleetVehicle ||
      !popup.fleetVehicle.active
    ) {
      return {
        enabled: false,
      };
    }

    return popup;
  }

  async updatePopup(dto: UpdateFleetPopupDto) {
    if (
      dto.fleetVehicleId !== undefined &&
      dto.fleetVehicleId !== null
    ) {
      await this.findOneAdmin(dto.fleetVehicleId);
    }

    return this.prisma.fleetPopupSettings.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        enabled: dto.enabled ?? false,
        fleetVehicleId: dto.fleetVehicleId ?? null,
        eyebrow: this.nullable(dto.eyebrow),
        heading: this.nullable(dto.heading),
        description: this.nullable(dto.description),
        image: this.nullable(dto.image),
        video: this.nullable(dto.video),
        ctaText: this.nullable(dto.ctaText),
        ctaLink: this.nullable(dto.ctaLink),
        showDelay: dto.showDelay ?? 5000,
        displayDuration:
          dto.displayDuration ?? 7000,
        oncePerSession:
          dto.oncePerSession ?? true,
      },
      update: {
        enabled: dto.enabled,
        fleetVehicleId:
          dto.fleetVehicleId === undefined
            ? undefined
            : dto.fleetVehicleId,
        eyebrow:
          dto.eyebrow === undefined
            ? undefined
            : this.nullable(dto.eyebrow),
        heading:
          dto.heading === undefined
            ? undefined
            : this.nullable(dto.heading),
        description:
          dto.description === undefined
            ? undefined
            : this.nullable(dto.description),
        image:
          dto.image === undefined
            ? undefined
            : this.nullable(dto.image),
        video:
          dto.video === undefined
            ? undefined
            : this.nullable(dto.video),
        ctaText:
          dto.ctaText === undefined
            ? undefined
            : this.nullable(dto.ctaText),
        ctaLink:
          dto.ctaLink === undefined
            ? undefined
            : this.nullable(dto.ctaLink),
        showDelay: dto.showDelay,
        displayDuration: dto.displayDuration,
        oncePerSession: dto.oncePerSession,
      },
      include: {
        fleetVehicle: true,
      },
    });
  }

  private async getOrCreatePopup() {
    const popup =
      await this.prisma.fleetPopupSettings.findUnique({
        where: { id: 1 },
        include: {
          fleetVehicle: true,
        },
      });

    if (popup) {
      return popup;
    }

    return this.prisma.fleetPopupSettings.create({
      data: { id: 1 },
      include: {
        fleetVehicle: true,
      },
    });
  }

  private async ensureSlugAvailable(
    slug: string,
    excludeId?: number,
  ) {
    const existing =
      await this.prisma.fleetVehicle.findFirst({
        where: {
          slug,
          NOT: excludeId
            ? { id: excludeId }
            : undefined,
        },
      });

    if (existing) {
      throw new ConflictException(
        "A fleet vehicle with this slug already exists.",
      );
    }
  }

  private normaliseSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  private nullable(value?: string | null) {
    const trimmed = value?.trim();
    return trimmed || null;
  }
}
