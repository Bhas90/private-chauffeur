import {
  Controller,
  Get,
  Header,
} from "@nestjs/common";

import { BlogsService } from "../blogs/blogs.service";
import { FleetService } from "../fleet/fleet.service";

@Controller()
export class SitemapController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly fleetService: FleetService,
  ) {}

  @Get("sitemap.xml")
  @Header("Content-Type", "application/xml")
  async getSitemap() {
    const domain =
      "https://www.privatechauffeurmelbourne.com.au";

    const staticPages = [
      "/",
      "/services",
      "/fleet",
      "/service-areas",
      "/about",
      "/blog",
      "/contact",
      "/get-a-quote",
      "/privacy-policy",
      "/terms-conditions",
    ];

    const servicePages = [
      "/services/airport-transfers",
      "/services/corporate-chauffeur",
      "/services/wedding-chauffeur",
      "/services/hotel-transfers",
      "/services/conference-transfers",
      "/services/hourly-chauffeur-hire",
      "/services/private-tours",
      "/services/group-transfers",
    ];

    const serviceAreaPages = [
      "/service-areas/melbourne",
      "/service-areas/melbourne-cbd",
      "/service-areas/lancefield",
      "/service-areas/camberwell",
      "/service-areas/south-melbourne",
      "/service-areas/north-melbourne",
      "/service-areas/richmond",
      "/service-areas/mickleham",
      "/service-areas/south-yarra",
      "/service-areas/toorak",
      "/service-areas/gisborne",
      "/service-areas/kyneton",
      "/service-areas/east-melbourne",
      "/service-areas/west-melbourne",
      "/service-areas/kilmore",
      "/service-areas/woodend",
      "/service-areas/wallan",
      "/service-areas/kew",
      "/service-areas/wandong",
      "/service-areas/romsey",
    ];

    const [blogs, fleet] = await Promise.all([
      this.blogsService.findPublished(),
      this.fleetService.findPublished(),
    ]);

    const urls: string[] = [];

    staticPages.forEach((path) => {
      urls.push(`
        <url>
          <loc>${domain}${path}</loc>
          <changefreq>${
            path === "/" || path === "/blog"
              ? "weekly"
              : "monthly"
          }</changefreq>
          <priority>${
            path === "/"
              ? "1.0"
              : path === "/services" ||
                  path === "/fleet" ||
                  path === "/service-areas" ||
                  path === "/get-a-quote"
                ? "0.9"
                : "0.7"
          }</priority>
        </url>
      `);
    });

    servicePages.forEach((path) => {
      urls.push(`
        <url>
          <loc>${domain}${path}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
        </url>
      `);
    });

    serviceAreaPages.forEach((path) => {
      urls.push(`
        <url>
          <loc>${domain}${path}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    });

    fleet.forEach((vehicle: any) => {
      urls.push(`
        <url>
          <loc>${domain}/fleet/${vehicle.slug}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    });

    blogs.forEach((blog: any) => {
      urls.push(`
        <url>
          <loc>${domain}/blog/${blog.slug}</loc>
          ${
            blog.publishedAt
              ? `<lastmod>${new Date(
                  blog.publishedAt,
                ).toISOString()}</lastmod>`
              : ""
          }
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `);
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  }
}
