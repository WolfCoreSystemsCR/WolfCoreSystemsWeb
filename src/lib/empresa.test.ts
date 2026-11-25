import { describe, expect, it } from "vitest";
import { demos, empresa, enlaceWolf, opcionesServicio, servicioPrincipal, servicios, sitioUrl } from "./empresa";

describe("empresa content", () => {
  it("builds the WhatsApp link with the prefilled word Wolf", () => {
    expect(enlaceWolf()).toBe(`https://wa.me/${empresa.whatsapp}?text=Wolf`);
    expect(empresa.whatsapp).toMatch(/^506\d{8}$/);
  });

  it("offers every service in the contact form options without duplicates", () => {
    expect(opcionesServicio).toContain(servicioPrincipal.titulo);
    for (const s of servicios) expect(opcionesServicio).toContain(s.titulo);
    expect(new Set(opcionesServicio).size).toBe(opcionesServicio.length);
  });

  it("uses unique demo slugs", () => {
    expect(new Set(demos.map((d) => d.slug)).size).toBe(demos.length);
  });

  it("never falls back to a localhost site URL", () => {
    expect(sitioUrl).not.toContain("localhost");
    expect(sitioUrl.endsWith("/")).toBe(false);
  });
});
