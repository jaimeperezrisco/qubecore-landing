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
| `Contact.jsx` | Formulario de contacto - ENVÍA al BACKEND (no usa EmailJS). |
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

---

## 9. Tecnologías - Explicación Detallada

> **Nota:** Esta sección explica qué son las tecnologías usadas y por qué se eligieron frente a otras alternativas.

### 9.1 React (v19.2.4)

**¿Qué es?**
React es una librería de JavaScript creada por Meta (Facebook) para construir interfaces de usuario interactivas. Es el estándar de la industria para desarrollo web moderno.

**¿Por qué React y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Vue** | Excelente framework, pero menor demanda laboral y ecosistema más pequeño |
| **Angular** | Demasiado complejo para una landing page; curva de aprendizaje alta |
| **Svelte** | Comprometedor, pero menos librerías disponibles |
| **Vanilla JS** | Desarrollo más lento, sin componentes reutilizables |

**¿Por qué se usa?**
- **Componentes reutilizables**: Cada sección (Hero, Contact, etc.) es un componente independiente
- **Virtual DOM**: React actualiza solo lo que cambia, no toda la página (más rápido)
- **Unidireccional**: Los datos fluyen en una sola dirección, más fácil de debuguear
- **Ecosistema**: Miles de librerías disponibles
- **Mercado laboral**: Alta demanda de desarrolladores React

**Alternativas consideradas:**
- **Next.js**: No se necesita por ser landing page estática (no SSR necesario)
- **Remix**: Similar a Next.js, overkill para este caso de uso

**Conceptos clave en QubeCore:**
- `useState`: Guarda datos que cambian (ej: el formulario de contacto)
- `useEffect`: Código que corre cuando algo cambia (ej: cargar datos al iniciar)
- `useRef`: Referencia a elementos del DOM
- `useCallback`: Función estable para dependencias en useEffect
- `useInView`: Detecta cuando un elemento es visible en pantalla

---

### 9.2 Vite (v8.0.4)

**¿Qué es?**
Vite es una herramienta de build (compilación) y servidor de desarrollo. Fue creado por Evan You (creador de Vue) pero funciona con cualquier framework.

**¿Por qué Vite y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Webpack** | Configuración muy verbosa; lento en proyectos grandes |
| **Create-React-App (CRA)** | Deprecated; usa Webpack internamente |
| **Parcel** | Menos flexible para proyectos complejos |
| **esbuild** | Solo bundler, no tiene dev server |

**¿Por qué se usa?**
- **Instant HMR**: Los cambios se ven en milisegundos, no segundos
- **Native ESM**: Usa módulos ES nativos, no necesita bundling en dev
- **Build optimizado**: Produce bundles pequeños y optimizados
- **Configuración mínima**: Funciona out-of-the-box

**Comandos:**
```bash
npm run dev      # Inicia servidor de desarrollo (localhost:5173)
npm run build    # Compila para producción (genera /dist)
npm run preview # Preview del build de producción
```

**`vite.config.js` Explained:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  // Habilita Fast Refresh para React
})
```
- `@vitejs/plugin-react`: Habilita Hot Module Replacement (HMR) rápido para React

---

### 9.3 Tailwind CSS (v4.2.2)

**¿Qué es?**
Tailwind es un framework de CSS utility-first. En lugar de escribir CSS personalizadas, usas clases utilitarias directamente en el HTML.

**¿Por qué Tailwind y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **CSS Modules** | Requiere más archivos; sin utility classes |
| **Styled Components** | Runtime overhead; más complejo |
| **Sass/SCSS** | Preprocesador, no utility-first |
| **Plain CSS** | Más código repetido; sin dark mode automático |
| **Bootstrap** | Diseño genérico; muy diferente |
| **Chakra UI** | Componentes pre-hechos, menos control |
| ** MUI** | Design system de Material, no personalizable |

**Diferencia con CSS tradicional:**

| CSS Tradicional | Tailwind CSS |
|----------------|-------------|
| ```css .btn { background: cyan; padding: 1rem; } ``` | ```html <button class="bg-cyan-500 p-4"> ``` |
| Tienes que crear clases | Classes predefinidas |
| Buscas en archivos CSS | Todo en el HTML |

**¿Por qué se usa?**
- **No necesitas crear archivos CSS**: Todo está en las clases
- **Diseño consistente**: Las clases tienen valores predefinidos
- **Responsive fácil**: `md:flex`, `lg:grid` cambia en breakpoints
- **Dark mode**: `dark:bg-gray-900` cambia según el theme
- **Menos código**: No hay CSS duplicado

**Ejemplo en QubeCore:**
```html
<!-- Botón primario -->
<button class="btn-primary">
  Request Access
</button>

<!-- Glass card -->
<div class="glass-card p-8">
  Contenido
</div>
```

**En `index.css`:**
```css
@theme {
  --color-quantum-cyan: #00F0FF;
  --color-quantum-magenta: #B026FF;
}

@layer components {
  .btn-primary {
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
  }
  
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
  }
}
```

---

### 9.4 PostCSS (v8.5.9)

**¿Qué es?**
PostCSS es un procesador de CSS que transforma el código CSS mediante plugins. No es un preprocesador como Sass, es un "procesador de plugins".

**¿Por qué PostCSS y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Solo Tailwind config** | Tailwind v4 SOLO funciona con PostCSS |
| **Sass** | Preprocesador, no procesador de plugins |
| **Less** | Menos usado actualmente |
| **Sin procesador** | No se puede usar Tailwind |

> **Nota IMPORTANTE:** PostCSS NO se puede eliminar. Es obligatorio para Tailwind CSS v4.

**¿Por qué existe?**
Tailwind CSS 4 necesita PostCSS para funcionar. Procesa el `@import "tailwindcss"` y genera el CSS final.

**Plugins usados:**
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},    // Procesa @import "tailwindcss"
    autoprefixer: {},  // Añade prefijos (-webkit-, -moz-)
  },
}
```

**Flujo:**
```
index.css (con @import "tailwindcss")
        ↓
    PostCSS (lee config)
        ↓
  TailwindCSS (procesa @theme, @layer)
        ↓
Autoprefixer (añade -webkit-, -moz-)
        ↓
CSS final optimizado
```

> **Nota:** PostCSS NO se puede eliminar porque Tailwind 4 lo requiere. Es parte del pipeline de build.

---

### 9.5 Framer Motion (v12.38.0)

**¿Qué es?**
Framer Motion es una librería de animaciones para React. Permite crear animaciones declarativas (describes "qué" quieres, no "cómo").

**¿Por qué Framer Motion y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **CSS Animations** | Menos flexible; no declarativo |
| **GSAP** | Potente pero más pesado; licencia para komersial |
| **Anime.js** | No específico de React |
| **React Spring** | API más compleja; menos documentación |
| **Motion One** | Más ligero pero menos功能 completa |
| **Vanilla CSS + JS** | Más código; menos maintainable |

**¿Por qué se usa?**
- **Declarativo**: Define el estado inicial y final, Framer calcula la transición
- **Animaciones complejas**: Responder a hover, click, scroll es fácil
- **Performance**: Usa animaciones optimizadas del navegador
- **Smooth**: Las animaciones son fluidas (60fps)
- **API intuitiva**: Fácil de aprender

**Ejemplos en QubeCore:**

```jsx
// Animación de entrada (aparece al hacer scroll)
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  Contenido
</motion.div>

// Botón con hover
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>

// Scroll indicator animado
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  ↓
</motion.div>
```

**Conceptos clave:**
- `initial`: Estado inicial de la animación
- `animate`: Estado final
- `transition`: Cómo llegar del inicio al final (duración, easing)
- `whileHover`, `whileTap`: Respuesta a interacciones del usuario
- `useInView`: Detecta cuando el elemento es visible en pantalla

---

### 9.6 tsParticles (v3.9.1)

**¿Qué es?**
tsParticles es una librería para crear partículas interactivas (puntos que se mueven y se conectan). Es el fondo de "constelación" en QubeCore.

**¿Por qué tsParticles y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Canvas API nativo** | Mucho código para復雜功能 |
| **Three.js** | Overkill para 2D; muy pesado |
| **React Particles** | Desactualizado; no compatible con React 19 |
| **particles.js** | Solo vanilla JS; no React |
| **CSS-only particles** | Limitado; no interactivo |

**¿Por qué se usa?**
- **Visual impact**: Da el aspecto "cuántico" y tecnológico
- **Interactivo**: Las partículas responden al mouse
- **Customizable**: Puedes controlar cantidad, color, velocidad, conexiones
- **Ligero**: `@tsparticles/slim` es la versión reducida (~40kb)
- **React compatible**: Tiene wrapper oficial

**En QubeCore (`ParticlesBackground.jsx`):**
```javascript
particles: {
  number: { value: 80 },        // 80 partículas
  color: { value: 'var(--particle-color)' },  // Cambia con theme
  links: {
    enable: true,
    distance: 150,            // Conectar si están a 150px
    opacity: 0.3,
  },
  move: {
    enable: true,
    speed: 0.5,              // Velocidad
  },
}
```

---

### 9.7 Lucide React (v1.7.0)

**¿Qué es?**
Lucide es una librería de iconos SVG. Proporciona cientos de iconos en formato vectorial.

**¿Por qué Lucide y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Font Awesome** | Grande; requiere cargar toda la fuente |
| **Heroicons** | Menos iconos disponibles |
| **Material Icons** | Estilo Material, no personalizable |
| **React Icons** | Bundle muy grande (incluye múltiples packs) |
| **Ionicons** | Estilo específico de Ionic |
| **Feather Icons** | Menos iconos que Lucide |

**¿Por qué se usa?**
- **SVG**: Se escala sin perder calidad
- **Pequeño**: Bundle muy liviano (~30kb)
- **Consistente**: Todos los iconos tienen el mismo estilo
- **Fácil de usar**: Componente React

**Ejemplos:**
```javascript
import { Lock, Sun, Moon, Menu, X, Mail, Send, CheckCircle } from 'lucide-react'

// En JSX
<Lock size={20} />              // Candado
<Sun className="text-cyan" />   // Sol
<Moon className="text-cyan" /> // Luna
<Mail size={18} />             // Email
```

---

### 9.8 ESLint (v9.39.4)

**¿Qué es?**
ESLint es un linter (analizador estático) de JavaScript. Revisa el código sin ejecutarlo para encontrar errores, bugs y código de mala calidad.

**¿Por qué ESLint y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Prettier** | Solo formatea, no analiza código |
| **TSLint** | Deprecated; migrado a ESLint |
| **Standard JS** | Sin configuración; muy estricto |
| **Sin linter** | Código propenso a errores |

**¿Por qué se usa?**
- **Previene errores**: Detecta antes de que ocurran
- **Consistencia**: Todo el equipo sigue las mismas reglas
- **Best practices**: Detecta anti-patterns conocidos
- **Integración**: Se ejecuta automáticamente antes de commit

**En QubeCore:**
```bash
npm run lint  # Ejecuta ESLint
```

**Configuración actual:**
```javascript
rules: {
  'no-unused-vars': ['error', { 
    varsIgnorePattern: '^(?:[A-Z_]|motion$)', 
  }],
  'react-hooks/exhaustive-deps': 'warn',
}
```

**Errores que detecta:**
```
'motion' is defined but never used
React Hook useEffect has a missing dependency
```

**Reglas activas:**
- `no-unused-vars`: Detecta variables no usadas (ignora `motion` por bug del parser)
- `react-hooks/exhaustive-deps`: Advierte sobre dependencias faltantes en hooks
- `react-refresh`: Valida que el código sea compatible con HMR

---

### 9.9 Autoprefixer (v10.4.27)

**¿Qué es?**
Autoprefixer es un plugin de PostCSS que añade prefijos de CSS automáticamente.

**¿Por qué Autoprefixer y no...?**

| Alternativa | ¿Por qué NO se eligió? |
|------------|---------------------|
| **Sin autoprefixer** | Navegadores antiguos no renderizan bien |
| **手动 prefijos** | Tedioso; fácil de olvidar |
| **其它 plugin** | Autoprefixer es el estándar |

> **Nota:** Autoprefixer es PARTE de PostCSS, no se puede eliminar. viene con `autoprefixer` package.

**¿Por qué existe?**
- **Compatibilidad**: Algunos navegadores antiguos necesitan prefijos
- `-webkit-`: Safari, Chrome antiguo
- `-moz-`: Firefox antiguo
- `-ms-`: Internet Explorer (en desuso)

**Ejemplo:**
```css
/* Tu código */
.da {
  display: flex;
}

/* Después de Autoprefixer */
.da {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
```

---

### 9.10 @emailjs/browser - NO USADO

**Situación especial:**
`@emailjs/browser` está instalado en `dependencies` pero **NO SE USA** en ningún componente.

**¿Por qué estaba ahí?**
Probablemente se agregó pensando usar EmailJS para enviar los formularios, pero finalmente se integran directamente con el backend.

**¿Qué hace Contact.jsx actualmente?**
El formulario de contacto envía directamente al backend vía fetch:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const response = await fetch(`${API_URL}/api/solicitudes`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({...})
});
```

**¿Eliminarlo?**
Si quieres reducir el tamaño del bundle, puedes eliminarlo:
```bash
npm uninstall @emailjs/browser
```

---

## 10. API y Backend

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login admin (retorna JWT) |
| POST | `/api/auth/register` | Registro usuario |
| POST | `/api/solicitudes` | Crear solicitud |
| GET | `/api/servicios` | Listar servicios |
| GET | `/api/admin/solicitudes` | Ver todas las solicitudes |
| GET | `/api/admin/solicitudes?estado=X` | Filtrar por estado |
| GET | `/api/admin/solicitudes/estadisticas` | Estadísticas |
| PATCH | `/api/admin/solicitudes/:id/estado?estado=X` | Cambiar estado |
| DELETE | `/api/admin/solicitudes/:id` | Eliminar |

### Estados de Solicitud
- `PENDIENTE` - Nueva
- `EN_REVISION` - En revisión
- `ACEPTADA` - Aceptada
- `RECHAZADA` - Rechazada

---

## 11. Docker

### Dockerfile (Desarrollo Local)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

### docker-compose.yml

```yaml
services:
  frontend:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
```

### .dockerignore

```
.git, .vscode, node_modules, *.log, .env, dist/, coverage/
```

### Correr

```bash
cd frontend
docker compose up --build
```

Acceder: `http://localhost:5173`

---

## 12. Variables de Entorno

### `.env`

```env
VITE_API_URL=http://localhost:8080
```

**Cómo usarla en código:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

**Para producción (Docker):**
```env
VITE_API_URL=http://backend:8080
```

---

## 13. Seguridad del Login

### Rate Limiting
- **5 intentos** máximo en **15 minutos**
- Después del límite → lockout por 15 minutos
- Por IP (simple, en memoria)

### Mensaje Genérico
- Login y register devuelven **"Credenciales inválidas"** para cualquier error
- No revela si el email existe o no

### Logging
```java
// Login exitoso
LOGIN_SUCCESS | email: admin@qubecore.com | ip: 192.168.1.1 | timestamp: 2026-04-21T10:30:00

// Login fallido
LOGIN_FAILED | email: admin@qubecore.com | ip: 192.168.1.1 | reason: BadCredentials

// Cuenta bloqueada
ACCOUNT_LOCKED | ip: 192.168.1.1 | attempts: 5 | lockout_minutes: 15
```

---

## 14. Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server (localhost:5173) |
| `npm run build` | Build producción |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint check |
| `docker compose up --build` | Docker dev |
| `npm uninstall @emailjs/browser` | Eliminar paquete no usado |