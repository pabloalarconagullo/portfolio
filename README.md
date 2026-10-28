# Portfolio · «Notas al margen»

Portfolio personal de desarrollo web. La web se lee como un documento cuidado: el texto principal habla al cliente
y, al margen, un bolígrafo azul anota las decisiones técnicas de cada proyecto. En las capturas, unas marcas numeradas
señalan lo que comenta cada nota.

Stack: Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4. Animaciones con GSAP (ScrollTrigger y
SplitText) y scroll suave con Lenis; los trazos del bolígrafo y las entradas sencillas son CSS. Fondo siempre blanco.

## Comandos

```bash
npm install        # solo la primera vez
npm run dev        # desarrollo en http://localhost:3000
npm run build      # compilación de producción
npm start          # sirve la compilación (requiere build)
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run test:e2e   # pruebas de extremo a extremo (compila y arranca producción en el puerto 3456)
```

Las pruebas (`tests/e2e/site.spec.ts`, Playwright + axe-core) recorren todas las páginas del sitemap y comprueban:
errores de consola, red e hidratación; accesibilidad WCAG 2.2 AA en claro y oscuro; SEO básico; enlaces internos;
desbordamiento horizontal de 320 a 1440 px; menú móvil; botón fijo de móvil; filtros; formulario; teclado;
anotaciones y movimiento reducido. Si defines `RESEND_API_KEY`, la prueba del formulario se salta para no enviar correos.

## Qué tienes que personalizar

Todo el contenido está en `content/`. Lo que falta se ve en la web como una marca **«Pendiente: …»** con borde
discontinuo, para que no se publique sin querer.

| Archivo | Qué |
|---|---|
| `content/site.ts` | Rol y presentación «Sobre mí» (**PROPUESTOS**), nombre, ubicación, **dominio** (`url`), correo, canales (WhatsApp, agenda…), perfiles, disponibilidad, retrato, rangos de presupuesto y datos legales (titular, NIF, dirección). |
| `content/site.ts` → `hero` | Titular, entradilla y notas al margen. Textos **PROPUESTOS**: cámbialos por los tuyos. `[texto](id)` anota una palabra con la nota de ese `id`. |
| `content/services.ts` | Servicios, entregables y pasos del proceso. Textos **PROPUESTOS**. |
| `content/projects.ts` | Proyectos. Los textos salen de los README de tus carpetas en `X:\PABLO\PROYECTO` y las capturas de sus propias pruebas. Revisa que todo sea publicable. |
| `src/assets/retrato.jpeg` | Tu retrato, importado en `site.about.portrait`. |
| `src/app/privacidad`, `src/app/aviso-legal` | Textos legales **provisionales**: revísalos antes de publicar. |

### Proyectos: puntos a revisar antes de publicar

- **Web corporativa de la asesoría (`cym-web`)**: visible sin nombrar al cliente, sin captura ni enlace (aún no está
  publicada). Confirma con el cliente que puedes mostrarla; si no, pon `visible: false`.
- **Web profesional y Graduado Social Red**: capturas tomadas de las webs publicadas el 28-10-2026. La de la web
  profesional muestra la calculadora con datos de ejemplo.
- **¿Quién ha matado a Dodi?**: se muestra con el crédito a Murdoku (Manuel Garand). El enlace «Jugar» apunta a
  `https://quien-ha-matado-a-dodi.vercel.app` (la URL que declara el propio juego).
- **Repositorios privados**: ningún proyecto enlaza a código. Añade enlaces en `links` solo si son públicos.
- No hay fechas, clientes, testimonios ni cifras de uso: no constan en ningún sitio. Añádelos solo si son reales.
- Solo cinco proyectos tienen captura (las dos webs publicadas, PDF Studio, Jurisprudencia y el juego). Para destacar otro a página completa,
  añade su captura en `src/assets/projects/`, impórtala en `content/projects.ts`, pon `featured: true` y, si quieres,
  notas con `at: { x, y }` (porcentaje sobre la imagen).

### Mientras `site.url` sea `null`

- `robots.txt` bloquea la indexación y las páginas llevan `noindex`.
- Las URL absolutas (sitemap, Open Graph, canonical) usan `http://localhost:3000`.

## Integraciones que requieren credenciales

**Formulario de contacto (Resend).** Copia `.env.example` a `.env.local` y rellena:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=tu@correo.es
CONTACT_FROM_EMAIL="Portfolio <hola@tudominio.es>"   # dominio verificado en Resend
```

Sin estas variables el formulario **no envía nada**. Valida los datos, dice que el envío no está conectado y ofrece
abrir el correo con el mensaje ya escrito (si has configurado `site.email`). El envío real con Resend no se ha probado
porque no hay clave en este equipo.

## Archivos principales

- `src/app/page.tsx`: portada (hero, proyectos, servicios, proceso, sobre mí, contacto).
- `src/app/proyectos/page.tsx` y `src/app/proyectos/[slug]/page.tsx`: índice filtrable y caso de cada proyecto.
- `src/app/contacto/page.tsx` y `src/app/actions.ts`: página de contacto y acción de servidor del formulario.
- `src/components/annotation-layer.tsx`: subrayados y guías del bolígrafo (solo en pantallas de 70rem o más).
- `src/components/annotated-figure.tsx`: captura con marcas numeradas y notas al margen.
- `src/app/globals.css`: tokens de color (claro y oscuro), tipografía y estilos del sistema.

## Accesibilidad y rendimiento

- Las notas son texto normal: sin JavaScript la web se lee entera. Las líneas son decorativas (`aria-hidden`).
- Animaciones con GSAP y Lenis (`src/components/motion/`), declaradas con atributos:
  - `data-split="words"`: el titular se enfoca palabra a palabra; `data-split="lines"`: los títulos de sección suben
    por líneas desde detrás de una máscara. Al terminar se restaura el texto original.
  - `data-marquee`: cinta de tecnologías que acelera y cambia de sentido con la velocidad del scroll y se para bajo
    el ratón. `data-parallax`: el retrato se desplaza dentro de su marco. `data-magnetic`: botones que siguen al puntero.
  - `data-process`: en escritorio, la línea de tiempo se queda fija mientras el scroll rellena el progreso y enciende
    cada paso.
  - Los precios cuentan hasta su importe al aparecer y al cambiar de grupo; la cabecera se aparta al bajar y vuelve
    al subir; las marcas de las capturas laten al aparecer; barra de progreso de lectura en la portada.
- Animaciones CSS:
  - Los bloques suben al llegar a ellos; las capturas se revelan de arriba abajo y después aparecen sus marcas
    numeradas; los pasos del proceso dibujan su filete; el retrato se descubre de abajo arriba. Se controla con
    `data-reveal` (`""`, `"fade"`, `"figure"`, `"rule"`, `"portrait"`) y `--i` para escalonar; lo activa
    `src/components/reveal-observer.tsx`.
  - Al abrir un caso desde la portada, su captura viaja a la nueva página (View Transitions de React, Chromium,
    Safari y Firefox recientes; en el resto el cambio es normal).
  - Solo se oculta lo que espera fuera de la pantalla: sin JavaScript todo se ve.
- Con «reducir movimiento» no se carga Lenis ni se ejecuta ninguna animación de GSAP: no hay animaciones de entrada,
  trazos animados ni transiciones de página, y el scroll no es suave.
- Enlace para saltar al contenido, foco visible, menú móvil que se cierra con Esc y devuelve el foco, errores del
  formulario asociados a cada campo.
- Páginas estáticas salvo `/contacto` (lee `?proyecto=`). Imágenes optimizadas con `next/image` (AVIF/WebP) y
  fuentes autoalojadas con `next/font`.
