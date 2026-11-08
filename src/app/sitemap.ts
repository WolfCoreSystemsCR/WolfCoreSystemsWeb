import type { MetadataRoute } from "next";
import { sitioUrl } from "@/lib/empresa";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${sitioUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${sitioUrl}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
