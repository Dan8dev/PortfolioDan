# PortfolioDan

Portafolio de **Daniel Meneses**, Desarrollador Full Stack: [danielmeneses.netlify.app](https://danielmeneses.netlify.app)

Página única con estética retro de 8 bits (Press Start 2P + nes.css) y animaciones tipo videojuego con Framer Motion.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- Tailwind CSS v4
- [Motion](https://motion.dev) (Framer Motion)
- nes.css

## Comandos

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # type-check + build de producción en dist/
npm run preview  # sirve dist/ localmente
```

Se requiere Node 18+ (Netlify compila con Node 22, ver `netlify.toml`).

## Actualizar contenido

Todo el texto está en `src/data/`, separado de los componentes:

| Archivo | Contenido |
| --- | --- |
| `profile.ts` | Nombre, puesto, correo, GitHub, **LinkedIn** (vacío = oculto), CV, estadísticas |
| `projects.ts` | Proyecto destacado (Blikon) y casos de estudio |
| `experience.ts` | Experiencia laboral y educación |
| `skills.ts` | Habilidades por categoría e idiomas |

- **CV:** reemplaza `public/cv/CV-Daniel-Meneses-Navarro.pdf`.
- **Capturas:** agrega imágenes en `public/img/projects/` y regístralas en `projects.ts`.
- **Vista previa para redes:** `public/img/og.jpg` (1200×630).

## Despliegue

Netlify publica automáticamente cada push a `main`. Los Pull Requests generan un *deploy preview*.
