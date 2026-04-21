# Documentación del Frontend QubeCore

## 1. Visión General

El frontend de QubeCore es una landing page desenvolvida con **React 19** y **Vite**, diseñada para presentar soluciones de computación cuántica para empresas e instituciones de investigación. Utiliza **Tailwind CSS v4** para estilos y cuenta con animaciones mediante **Framer Motion**.

---

## 2. Estructura de Carpetas

### 2.1 `src/`
**Función:** Código fuente principal de la aplicación React.

Es el directorio donde reside todo el código que se desarrolla y compila. Contiene los componentes, estilos y lógica de la aplicación.

```
src/
├── components/    # Componentes React
├── assets/        # Recursos estáticos
├── App.jsx        # Componente raíz
├── App.css        # Estilos globales
├── main.jsx       # Entry point
└── index.css      # Estilos base + Tailwind
```

### 2.2 `src/components/`
**Función:** Almacena todos los componentes React reutilizables de la interfaz.

| Componente | Descripción |
|------------|-------------|
| `Header.jsx` | Navegación fija con menú y logo. Implementa efecto glassmorphism que cambia al hacer scroll. |
| `Hero.jsx` | Sección principal con título, subtítulo y llamada a la acción. Primer punto de contacto visual. |
| `ProblemSolution.jsx` | Expone el problema actual (computación cuántica inaccesible) y la solución de QubeCore. |
| `WhyUs.jsx` | Sección de ventajas competitivas: democratización, accesibilidad, tecnología de vanguardia. |
| `HardwareDeepDive.jsx` | Análisis técnico profundo del hardware cuántico utilizado. |
| `Scalability.jsx` | Información sobre la escalabilidad de las soluciones. |
| `Offer.jsx` | Presentación de los servicios/ofertas disponibles para clientes. |
| `Team.jsx` | Presentación del equipo detrás de QubeCore. |
| `Contact.jsx` | Formulario de contacto con integración a EmailJS para envío de mensajes. |
| `ParticlesBackground.jsx` | Fondo animado con partículas utilizando `@tsparticles/slim`. |
| `AdminPanel.jsx` | Panel de administración accesible en la ruta `/admin`. |

### 2.3 `src/assets/`
**Función:** Almacena recursos estáticos como imágenes, iconos SVG y fuentes.

```
assets/
├── logos/
│   └── logo-sf.png          # Logo de QubeCore
├── hero.png                 # Imagen principal del hero
├── react.svg                # Logo de React (referencia)
└── vite.svg                 # Logo de Vite (referencia)
```

### 2.4 `public/`
**Función:** Archivos estáticos que se sirven directamente al navegador sin procesamiento por parte del bundler.

```
public/
├── favicon.svg              # Icono de la pestaña del navegador
├── favicon1.svg             # Icono alternativo
└── icons.svg                # Sprite de iconos
```

### 2.5 `dist/`
**Función:** Carpeta de salida del build de producción. Se genera automáticamente al ejecutar `npm run build`.

Contenido:
- Archivos JavaScript minificados y optimizados
- CSS compilado y minificado
- HTML optimizado
- Assets copiados
- Fuentes web (OpenDyslexic)

**Nota:** Esta carpeta no debe incluirse en git (ya está en `.gitignore`).

### 2.6 `node_modules/`
**Función:** Contiene todas las dependencias npm instaladas.

**Nota:** No se debe modificar manualmente. Se genera automáticamente con `npm install`.

---

## 3. Archivos de Configuración

### 3.1 `package.json`
**Función:** Define metadatos del proyecto, dependencias y scripts disponibles.

**Dependencias principales:**
- `react` y `react-dom` - Framework principal
- `@tsparticles/react` y `@tsparticles/slim` - Sistema de partículas
- `framer-motion` - Animaciones
- `lucide-react` - Iconos
- `@emailjs/browser` - Envío de emails desde el formulario

**Scripts disponibles:**
```json
{
  "dev": "vite",           // Iniciar servidor de desarrollo
  "build": "vite build",   // Generar build de producción
  "preview": "vite preview", // Previsualizar build
  "lint": "eslint ."       // Ejecutar linter
}
```

### 3.2 `vite.config.js`
**Función:** Configuración del bundler Vite.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Configura el plugin de React para Vite que permite usar JSX y Fast Refresh durante desarrollo.

### 3.3 `postcss.config.js`
**Función:** Configuración de PostCSS para procesar CSS con Tailwind CSS.

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Utiliza el plugin de Tailwind CSS v4 para PostCSS, que compila las directivas `@tailwind` en CSS optimizado.

### 3.4 `eslint.config.js`
**Función:** Define reglas de linting para mantener la calidad del código.

**Configuración actual:**
- Extiende las recomendaciones de ESLint para JavaScript
- Incluye reglas para React Hooks (`eslint-plugin-react-hooks`)
- Configura reglas para React Refresh (`eslint-plugin-react-refresh`)
- Ignora la carpeta `dist`
- Regla especial: permite variables que empiezan con mayúsculas (convención para componentes React)

### 3.5 `.gitignore`
**Función:** Especifica archivos y carpetas que Git debe ignorar.

**Archivos ignorados:**
- Logs de npm/yarn/pnpm
- `node_modules/` - Dependencias
- `dist/` y `dist-ssr/` - Build de producción
- Archivos `.local`
- Variables de entorno (`.env`, `.env.local`, `.env.production`)
- Archivos de editor (`.vscode/`, `.idea/`, `.DS_Store`)

### 3.6 `Dockerfile`
**Función:** Define la configuración para crear un contenedor Docker de la aplicación.

---

## 4. Archivos Principales

### 4.1 `index.html`
**Función:** Template HTML principal, punto de entrada de la aplicación.

**Características:**
- Define el idioma como inglés (`lang="en"`)
- Activa el modo oscuro por defecto (`class="dark"`)
- Meta tags para SEO y responsive
- Contenedor `<div id="root">` donde React monta la aplicación
- Script tipo module que carga `src/main.jsx`

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="QubeCore - Democratizing quantum computing..." />
    <title>QubeCore - Quantum Computing Solutions</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4.2 `src/main.jsx`
**Función:** Entry point de React. Es el primer archivo que se ejecuta cuando la aplicación carga.

**Responsabilidades:**
- Importa `StrictMode` de React para ayudar a detectar problemas
- Usa `createRoot` de React DOM para montar la aplicación
- Importa los estilos globales (`index.css`)
- Renderiza el componente `App` dentro del elemento con id `root`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 4.3 `src/App.jsx`
**Función:** Componente raíz de la aplicación. Orchestrala todos los componentes de la landing page.

**Funcionalidades:**
- Detecta si la ruta es `/admin` para mostrar el panel de administración
- Implementa listeners para cambios de navegación
- renderiza `ParticlesBackground` como fondo fijo
- renderiza `Header` como navegación fija
- renderiza todas las secciones en orden: Hero → ProblemSolution → Scalability → Offer → WhyUs → HardwareDeepDive → Team → Contact
- renderiza un footer con copyright

### 4.4 `src/index.css`
**Función:** Estilos globales y configuración de Tailwind CSS.

**Contenido:**

1. **Importaciones:**
   - Fuentes de Google: Space Grotesk (headings) e Inter (body)
   - Tailwind CSS v4

2. **Configuración de tema (`@theme`):**
   - Colores personalizados: quantum-cyan, quantum-magenta y sus variantes claras
   - Fuentes definidas: heading y body

3. **Variables CSS para temas (`@layer base`):**
   - **Modo claro:** Fondo primario #F0F4F8, texto #0A0F1A
   - **Modo oscuro (predeterminado):** Fondo primario #0A0F1A, texto #FFFFFF
   - Variables para glassmorphism, acentos y colores de partículas

4. **Componentes reutilizables (`@layer components`):**
   - `.glass-header` - Estilo glassmorphism para el header
   - `.glass-header-scrolled` - Estado del header con scroll
   - `.glass` - Efecto glassmorphism general
   - `.glass-card` - Tarjetas con efecto glass
   - `.btn-primary` - Botón principal con gradiente
   - `.btn-secondary` - Botón secundario con borde
   - `.section` - Contenedor de sección con padding responsive
   - `.contact-select` - Estilos para selects del formulario

5. **Utilidades (`@layer utilities`):**
   - `.text-gradient` - Texto con gradiente
   - `.glow` - Efecto de brillo con color cyan
   - `.glow-magenta` - Efecto de brillo con color magenta

### 4.5 `src/App.css`
**Función:** Estilos CSS adicionales para la aplicación.

**Contenido:**
- Estilos para el contador (demo)
- Clases de ejemplo para el hero (referencia de Vite)
- Estilos para documentación y siguientes pasos
- Utilidades para ticks y separadores

**Nota:** Este archivo contiene estilos de la plantilla base de Vite que parecen no estar en uso activo en la landing page actual.

---

## 5. Flujo de Trabajo

### 5.1 Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo con Hot Module Replacement (HMR).

### 5.2 Build de Producción
```bash
npm run build
```
Genera la carpeta `dist/` con archivos optimizados y minificados.

### 5.3 Previsualización
```bash
npm run preview
```
Permite previsualizar el build de producción localmente.

### 5.4 Linting
```bash
npm run lint
```
Ejecuta ESLint para verificar la calidad del código.

---

## 6. Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| React 19 | Framework de interfaz de usuario |
| Vite | Bundler y servidor de desarrollo |
| Tailwind CSS v4 | Framework de estilos |
| Framer Motion | Animaciones |
| @tsparticles/slim | Fondo de partículas |
| Lucide React | Iconos |
| @emailjs/browser | Envío de formularios |
| ESLint | Linting |
| PostCSS | Procesamiento de CSS |

---

## 7. Rutas de la Aplicación

| Ruta | Componente |
|------|------------|
| `/` | Landing page completa |
| `/admin` | Panel de administración |

---

## 8. Consideraciones Importantes

- **Modo oscuro por defecto:** La aplicación usa `class="dark"` en el HTML, activando el tema oscuro automáticamente.
- **Glassmorphism:** El diseño utiliza efek glassmorphism (vidrio esmerilado) en header y tarjetas.
- **Gradientes:** Se usan gradientes de cyan (#00F0FF) a magenta (#B026FF) como colores de acento.
- **Fuentes:** Space Grotesk para títulos, Inter para texto body.
- **Responsive:** El diseño es totalmente responsive con breakpoints de Tailwind.