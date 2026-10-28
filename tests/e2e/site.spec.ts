import AxeBuilder from "@axe-core/playwright";
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

/** Páginas publicadas según el sitemap (así también se comprueba que esté completo). */
async function sitemapPages(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

/** Recorre la página para que se monten las capas que dependen de la posición. */
async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

test.describe("todas las páginas", () => {
  // Recorren todas las páginas publicadas: necesitan más tiempo que el predeterminado.
  test.describe.configure({ timeout: 240_000 });

  test("el sitemap incluye las páginas fijas y los proyectos", async ({ request }) => {
    const pages = await sitemapPages(request);
    for (const p of ["/", "/proyectos", "/contacto", "/privacidad", "/aviso-legal"]) expect(pages).toContain(p);
    expect(pages.filter((p) => p.startsWith("/proyectos/")).length).toBeGreaterThanOrEqual(3);
  });

  test("sin errores de consola, de red ni de hidratación", async ({ page, request }) => {
    const problems: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error" || /hydrat/i.test(m.text())) problems.push(m.text());
      });
      page.on("pageerror", (e) => problems.push(String(e)));
      page.on("response", (r) => {
        if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
      });
    for (const path of await sitemapPages(request)) {
      await page.goto(path, { waitUntil: "networkidle" });
      await settle(page);
    }
    expect(problems).toEqual([]);
  });

  test("accesibilidad WCAG 2.2 AA en claro y oscuro", async ({ page, request }) => {
    const found: string[] = [];
    for (const path of await sitemapPages(request))
      for (const colorScheme of ["light", "dark"] as const) {
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        await page.goto(path, { waitUntil: "networkidle" });
        await settle(page);
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
          .analyze();
        found.push(...violations.map((v) => `${path} ${colorScheme} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`));
      }
    expect(found).toEqual([]);
  });

  test("SEO básico: un h1, título, descripción, canónica y alt", async ({ page, request }) => {
    for (const path of await sitemapPages(request)) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.title()).not.toBe("");
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /^.{50,170}$/);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      for (const img of await page.locator("img").all()) {
        expect(await img.getAttribute("alt")).not.toBeNull();
      }
    }
  });
});

test("todos los enlaces internos responden 200", async ({ page, request }) => {
  const links = new Set<string>();
  for (const path of await sitemapPages(request)) {
    await page.goto(path);
    for (const href of await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) {
      links.add(href.split("#")[0] || "/");
    }
  }
  const broken: string[] = [];
  for (const href of links) {
    const res = await request.get(href);
    if (res.status() !== 200) broken.push(`${res.status()} ${href}`);
  }
  expect(broken).toEqual([]);
});

test("sin desbordamiento horizontal de 320 a 1440 px", async ({ page }) => {
  const issues: string[] = [];
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/proyectos", "/contacto", "/proyectos/pdf-studio"]) {
      await page.goto(path);
      await settle(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) issues.push(`${width}px ${path}: ${overflow}px`);
    }
  }
  expect(issues).toEqual([]);
});

test("menú móvil: abre, Esc cierra y devuelve el foco, los enlaces cierran el menú", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menú" });
  await toggle.click();
  await expect(page.locator("#menu-movil")).toBeVisible();
  await expect(page.getByRole("button", { name: "Cerrar" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#menu-movil")).toBeHidden();
  await expect(toggle).toBeFocused();

  await toggle.click();
  await page.locator("#menu-movil").getByRole("link", { name: "Servicios" }).click();
  await expect(page.locator("#menu-movil")).toBeHidden();
  await expect(page).toHaveURL(/#servicios$/);
});

test("botón fijo de móvil: no repite la llamada del hero ni del formulario", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const bar = page.locator("div.fixed.bottom-0");
  await expect(bar).toHaveAttribute("aria-hidden", "true");
  await page.evaluate(() => document.getElementById("servicios")!.scrollIntoView({ behavior: "instant" }));
  await expect(bar).toHaveAttribute("aria-hidden", "false");
  await page.evaluate(() => document.getElementById("contacto")!.scrollIntoView({ behavior: "instant" }));
  await expect(bar).toHaveAttribute("aria-hidden", "true");
});

test("filtro de proyectos por tipo", async ({ page }) => {
  await page.goto("/proyectos");
  const rows = page.locator("main ul li a[href^='/proyectos/']");
  const count = async (name: RegExp) => Number((await page.getByRole("button", { name }).innerText()).match(/\d+/)![0]);
  const total = await count(/^Todos/);
  await expect(rows).toHaveCount(total);
  const juego = page.getByRole("button", { name: /^Juego/ });
  const games = await count(/^Juego/);
  await juego.click();
  await expect(juego).toHaveAttribute("aria-pressed", "true");
  await expect(rows).toHaveCount(games);
  expect(games).toBeLessThan(total);
  await page.getByRole("button", { name: /^Todos/ }).click();
  await expect(rows).toHaveCount(total);
});

test("formulario: valida, conserva datos y no finge el envío sin credenciales", async ({ page }) => {
  test.skip(!!process.env.RESEND_API_KEY, "Con credenciales reales este test enviaría un correo.");
  await page.goto("/contacto?proyecto=pabloku");
  await expect(page.getByText("Quieres algo como")).toBeVisible();

  await page.getByRole("button", { name: "Enviar" }).click();
  await expect(page.locator("p[id$='-error']")).toHaveCount(4);
  await expect(page.getByLabel("Nombre")).toBeFocused();
  await expect(page.getByLabel("Nombre")).toHaveAttribute("aria-invalid", "true");

  await page.getByLabel("Nombre").fill("Persona de prueba");
  await page.getByLabel("Correo").fill("persona@example.com");
  await page.getByLabel("Plazo").selectOption("Lo antes posible");
  await page.getByLabel("Cuéntame el proyecto").fill("Necesito una herramienta para ordenar documentos.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Enviar" }).click();

  await expect(page.locator("form [role=alert]")).toContainText("no se ha enviado nada");
  await expect(page.getByText("Enviado.")).toHaveCount(0);
  await expect(page.getByLabel("Nombre")).toHaveValue("Persona de prueba");
  await expect(page.getByLabel("Plazo")).toHaveValue("Lo antes posible");

  await page.getByRole("button", { name: "Quitar referencia" }).click();
  await expect(page.getByText("Quieres algo como")).toHaveCount(0);
});

test("referencia desconocida en ?proyecto= se ignora", async ({ page }) => {
  await page.goto("/contacto?proyecto=no-existe");
  await expect(page.getByText("Quieres algo como")).toHaveCount(0);
});

test("teclado: el primer Tab muestra el salto al contenido", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido$/);
});

test("anotaciones: trazos en escritorio, ninguno en móvil", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".ann-drawn .ann-path").first()).toBeAttached();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".ann-path")).toHaveCount(0);
});

test("movimiento reducido: sin animaciones de entrada ni scroll suave", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const styles = await page.evaluate(() => ({
    hero: getComputedStyle(document.querySelector(".hero-ink")!).animationName,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  expect(styles).toEqual({ hero: "none", scroll: "auto" });
});

test("sitemap, robots e imagen social", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/proyectos/pablo-alarcon");
  expect((await request.get("/proyectos/no-existe")).status()).toBe(404);
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toBe("image/png");
  expect(await (await request.get("/robots.txt")).text()).toMatch(/Disallow: \/|Allow: \//);
});

test("entradas al hacer scroll: lo de abajo espera, aparece al llegar y nada se oculta con movimiento reducido", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const figure = page.locator('[data-reveal="figure"]').last();
  await expect(figure).toHaveAttribute("data-pending", "");
  // Lo que se ve al cargar no se oculta nunca.
  await expect(page.locator("main [data-reveal][data-pending]").first()).not.toBeInViewport();
  await figure.scrollIntoViewIfNeeded();
  await expect(figure).toHaveAttribute("data-in", "");
  await expect(figure).not.toHaveAttribute("data-pending", "");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-pending]")).toHaveCount(0);
});

test("precios: el selector cambia de grupo y cada plan llega al formulario", async ({ page }) => {
  await page.goto("/#precios");
  const planes = page.locator("#planes");
  const diseno = page.getByRole("button", { name: "Diseño y desarrollo" });
  const hosting = page.getByRole("button", { name: "Hosting y mantenimiento" });
  await expect(diseno).toHaveAttribute("aria-pressed", "true");
  await expect(planes).toContainText("350 €");
  await expect(planes).toContainText("500 €");
  await hosting.click();
  await expect(hosting).toHaveAttribute("aria-pressed", "true");
  await expect(planes).toContainText("200 €");
  await expect(planes).toContainText("/año");

  await page.getByRole("link", { name: /^Elegir este plan: Profesional/ }).click();
  await expect(page).toHaveURL(/\/contacto\?plan=mantenimiento-profesional$/);
  await expect(page.getByText("Te interesa el plan")).toContainText("Profesional · Hosting y mantenimiento (350 €/año)");
  await page.getByRole("button", { name: "Quitar plan" }).click();
  await expect(page.getByText("Te interesa el plan")).toHaveCount(0);
});
