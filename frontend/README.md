# 🚀 QubeCore Landing Page - Documentación Completa

<div align="center">

![QubeCore](https://img.shields.io/badge/QubeCore-Quantum_Computing-00F0FF?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Functional-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)

**Landing page de alto impacto visual para QubeCore**  
Startup de computación cuántica enfocada en democratizar el acceso a soluciones cuánticas para empresas e instituciones de investigación.

[Demo](#instalación) • [Documentación](#tabla-de-contenidos) • [Personalización](#personalización)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Instalación y Uso](#-instalación-y-uso)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Secciones de la Landing Page](#-secciones-de-la-landing-page)
- [Componentes Técnicos](#-componentes-técnicos)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Accesibilidad - OpenDyslexic](#-accesibilidad---opendyslexic)
- [Personalización](#-personalización)
- [Optimización y Performance](#-optimización-y-performance)
- [Próximos Pasos](#-próximos-pasos)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Descripción General

QubeCore Landing Page es un **prototipo de alta fidelidad** diseñado para comunicar la propuesta de valor de una startup de computación cuántica. El proyecto está construido con tecnologías modernas y sigue las mejores prácticas de desarrollo web.

### Objetivos del Proyecto

1. **Comunicar complejidad de forma simple**: Presentar computación cuántica de manera accesible
2. **Generar conversiones**: Guiar al usuario hacia la consultoría personalizada
3. **Impacto visual**: Crear una experiencia memorable y futurista
4. **Responsive first**: Funcionar perfectamente en todos los dispositivos

### Filosofía de Diseño

- **Glassmorphism**: Transparencias y desenfoques para una estética moderna
- **Minimalismo**: Contenido esencial sin saturación visual
- **Animaciones sutiles**: Mejoran la experiencia sin distraer
- **Dark Mode First**: El modo oscuro es el predeterminado

---

## ✨ Características

### Características Visuales

- ✅ **Glassmorphism** en todas las tarjetas y paneles
- ✅ **Header con glass dinámico** (75% sin scroll → 92% con scroll)
- ✅ **Constelación Interactiva** de fondo (80 partículas conectadas)
- ✅ **Modo Oscuro/Claro** con toggle animado
- ✅ **Modo OpenDyslexic** con fuente amigable para dislexia (botón en Header)
- ✅ **Scroll Parallax** para profundidad visual
- ✅ **Animaciones activadas por scroll** en cada sección
- ✅ **Gradientes cuánticos** (Cyan → Magenta)
- ✅ **Efectos Glow** en elementos interactivos

### Características Funcionales

- ✅ **Navegación sticky** con efecto glassmorphic dinámico
- ✅ **Navbar responsive** visible en todas las pantallas (móvil, tablet, desktop)
- ✅ **Smooth scroll** entre secciones
- ✅ **Formulario de contacto** con integración EmailJS
- ✅ **Responsive design** optimizado (Mobile, Tablet, Desktop)
- ✅ **Optimización SEO** básica
- ✅ **Performance optimizado** (Build ~500KB)
- ✅ **Accesibilidad mejorada** - Toggle de fuente OpenDyslexic en Header (WCAG A11y)

### Características de Negocio

- ✅ **Sección Hardware consultiva** (NO muestra productos fijos)
- ✅ **Flujo de conversión** claramente definido
- ✅ **CTAs estratégicos** en secciones clave
- ✅ **Credibilidad** mediante sección "Why Us" y Team

---

## 🛠️ Stack Tecnológico

### Core

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Vite** | 8.0.7 | Build tool y dev server |
| **React** | 18.x | Framework UI |
| **Tailwind CSS** | 4.2.2 | Framework CSS utility-first |
| **@tailwindcss/postcss** | 4.2.2 | Plugin PostCSS para Tailwind v4 |

### Librerías UI/Animaciones

| Librería | Uso |
|----------|-----|
| **Framer Motion** | Animaciones y transiciones fluidas |
| **@tsparticles/react** | Efecto de constelación de fondo |
| **@tsparticles/slim** | Engine optimizado de partículas |
| **Lucide React** | Iconos minimalistas SVG |

### Servicios Integrados

| Servicio | Estado | Uso |
|----------|--------|-----|
| **EmailJS** | ✅ Implementado | Envío de emails desde formulario de contacto |
| **Framer Motion** | Animaciones y transiciones fluidas |
| **@tsparticles/react** | Efecto de constelación de fondo |
| **@tsparticles/slim** | Engine optimizado de partículas |
| **Lucide React** | Iconos minimalistas SVG |

### Por qué este Stack?

- **Vite**: Dev server instantáneo y builds ultra-rápidos
- **React**: Ecosistema maduro, componentización eficiente
- **Tailwind v4**: Nueva sintaxis basada en CSS, más rendimiento
- **Framer Motion**: Animaciones declarativas y potentes
- **TSParticles**: Efecto de fondo sin impacto en performance

---

## 📦 Instalación y Uso

### Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalación

```bash
# 1. Clonar o navegar al proyecto
cd qubecore-landing

# 2. Instalar dependencias
npm install

# 3. Configurar EmailJS (IMPORTANTE)
# Copia el archivo de ejemplo y configura tus credenciales
cp .env.example .env
# Edita .env con tus credenciales de EmailJS
# Ver guía completa en EMAILJS_SETUP.md

# 4. Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en: **http://localhost:5173/**

**⚠️ Nota importante sobre EmailJS:**
Para que el formulario de contacto funcione, debes configurar EmailJS. Sigue la guía completa en [`EMAILJS_SETUP.md`](./EMAILJS_SETUP.md).

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Preview del build local

# Utilidades
npm run lint         # Ejecuta linter (si configurado)
```

### Build de Producción

```bash
npm run build
```

**Salida:**
```
dist/
├── index.html                 (0.62 KB gzip)
├── assets/
│   ├── index-[hash].css      (27.95 KB → 5.57 KB gzip)
│   └── index-[hash].js       (497.39 KB → 150.84 KB gzip)
```

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
qubecore-landing/
├── public/                    # Assets estáticos
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.jsx       # Header sticky con navegación
│   │   ├── Hero.jsx         # Sección hero principal
│   │   ├── ParticlesBackground.jsx  # Fondo de partículas
│   │   ├── ProblemSolution.jsx      # Problema vs Solución
│   │   ├── Scalability.jsx          # Animación de escalabilidad
│   │   ├── Offer.jsx               # 3 pilares de servicios
│   │   ├── WhyUs.jsx               # Fortalezas de QubeCore
│   │   ├── HardwareDeepDive.jsx    # Sección crítica de hardware
│   │   ├── Team.jsx                # Equipo
│   │   └── Contact.jsx             # Formulario de contacto
│   ├── App.jsx              # Componente raíz
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales + Tailwind
├── index.html               # HTML principal
├── postcss.config.js        # Configuración PostCSS
├── package.json             # Dependencias
├── README.md                # Esta documentación
├── QUICKSTART.md            # Guía de inicio rápido
└── VERIFICATION.md          # Reporte de verificación
```

### Flujo de Datos

```
main.jsx
  └── App.jsx
      ├── ParticlesBackground (Global, z-index: -10)
      ├── Header (Sticky, z-index: 50)
      └── main
          ├── Hero
          ├── ProblemSolution
          ├── Scalability
          ├── Offer
          ├── WhyUs
          ├── HardwareDeepDive ⭐ (Sección crítica)
          ├── Team
          └── Contact
```

---

## 📑 Secciones de la Landing Page

### 1. Header

**Archivo**: `src/components/Header.jsx`

**Características:**
- Logo tipográfico: **QUBE**CORE
- Navegación responsive visible en todas las pantallas
- Toggle Dark/Light mode animado
- Sticky en scroll con detección automática
- **Efecto glassmorphism dinámico**:
  - Sin scroll: 75% opacidad + blur 12px (translúcido)
  - Con scroll: 92% opacidad + blur 20px (más sólido, evita solapamiento de texto)
- Funciona correctamente en ambos modos (dark/light)

**Responsive Design:**
| Pantalla | Logo | Links | Espaciado |
|----------|------|-------|-----------|
| Móvil (< 640px) | `text-xl` | `text-xs`, `space-x-3` | `px-4`, `py-3` |
| Tablet (640px+) | `text-xl` | `text-sm`, `space-x-4` | `px-6`, `py-3` |
| Desktop (768px+) | `text-2xl` | `text-sm`, `space-x-8` | `px-12`, `py-4` |

**Navegación:**
- Home → #hero
- Solutions → #offer
- Hardware → #hardware
- Team → #team
- Contact → #contact

---

### 2. Hero Section

**Archivo**: `src/components/Hero.jsx`

**Propósito**: Primera impresión y CTA principal

**Contenido:**
- Título: "Unlock the Quantum Advantage"
- Subtítulo: Propuesta de valor
- 2 CTAs:
  - Primario: "Request Access" → #contact
  - Secundario: "Learn More" → #offer
- Indicador de scroll animado

**Animaciones:**
- Entrada escalonada (título → subtítulo → CTAs)
- Panel glassmorphic central
- Bounce infinite en el indicador de scroll

---

### 3. Problem/Solution

**Archivo**: `src/components/ProblemSolution.jsx`

**Propósito**: Establecer el problema y presentar la solución

**Estructura:**
- **Columna izquierda**: The Challenge
  - Limitaciones de computación clásica
  - 4 puntos clave con íconos
  
- **Columna derecha**: Our Solution
  - Cómo QubeCore resuelve el problema
  - 4 soluciones con checkmarks

**Diseño:**
- Grid de 2 columnas (1 en mobile)
- Tarjetas glassmorphic
- Animación de entrada lateral (left/right)

---

### 4. Scalability Section

**Archivo**: `src/components/Scalability.jsx`

**Propósito**: Visualizar crecimiento y escalabilidad

**Versión Desktop:**
- Animación SVG de red cuántica
- 12 nodos que se expanden progresivamente
- Conexiones animadas entre nodos
- Efecto de pulso en los nodos

**Versión Mobile:**
- Triángulo de 3 nodos
- Pulsos de energía viajando entre nodos
- Sincronización de animaciones

**Mensaje**: "Solutions that scale with your computational needs"

---

### 5. Offer Section

**Archivo**: `src/components/Offer.jsx`

**Propósito**: Presentar los 3 pilares de servicios

**Servicios:**

1. **Quantum Hardware Access** ⭐ (Destacado)
   - Icono: Cpu
   - Sistemas cuánticos personalizados
   - CTA: "Learn More" → #hardware
   - Borde cyan para destacar

2. **Training & Education**
   - Icono: GraduationCap
   - Programas de formación
   - Certificaciones

3. **Consulting & Support**
   - Icono: Headphones
   - Asesoría estratégica
   - Soporte 24/7

**Diseño:**
- Grid de 3 columnas (1 en mobile)
- Tarjetas glassmorphic con hover effect
- Iconos con gradiente para el destacado

---

### 6. Why Us Section

**Archivo**: `src/components/WhyUs.jsx`

**Propósito**: Establecer credibilidad y diferenciación

**Fortalezas (Grid 3x2):**
1. Cutting-Edge Technology
2. Expert Team
3. Tailored Solutions
4. Enterprise Security
5. Rapid Deployment
6. Global Reach

**Diseño:**
- Tarjetas pequeñas glassmorphic
- Icono + título + descripción
- Efecto glow en hover

---

### 7. Hardware Deep Dive ⭐ **SECCIÓN CRÍTICA**

**Archivo**: `src/components/HardwareDeepDive.jsx`

**Propósito**: Convertir leads mediante consultoría personalizada

**Estructura:**

**Encabezado:**
- Mensaje clave: "No pre-packaged systems. We build quantum infrastructure around your mission."
- Badge: "🚫 No Fixed Products • ✅ 100% Customized Solutions"

**Flujo de 3 Pasos:**

**Step 01: Problem Assessment**
- Icono: Search
- Análisis de workload
- Evaluación de feasibilidad
- Proyección de ROI

**Step 02: Custom Algorithm Design**
- Icono: Lightbulb
- Circuitos cuánticos a medida
- Soluciones híbridas
- Benchmarking

**Step 03: Hardware Matching**
- Icono: Cpu
- Topología de qubits personalizada
- Arquitectura escalable
- Deployment

**Diseño:**
- Línea vertical animada conectando los pasos
- Nodos centrales con pulsos
- Layout alternado (izq-der-izq)
- CTA prominente: "Talk to a Quantum Advisor"

**Por qué es crítica:**
- ✅ NO muestra productos fijos
- ✅ Enfatiza personalización
- ✅ Guía hacia consultoría
- ✅ Diferencia de competencia

---

### 8. Team Section

**Archivo**: `src/components/Team.jsx`

**Propósito**: Humanizar la marca y mostrar expertise

**Perfiles (3):**

1. **Dr. Sarah Chen**
   - Founder & Chief Quantum Scientist
   - Especialidad: Quantum algorithms & error correction

2. **Marcus Rodriguez**
   - Lead Hardware Architect
   - Especialidad: Superconducting qubit design

3. **Elena Volkov**
   - Strategic Partnerships Manager
   - Especialidad: Enterprise quantum integration

**Diseño:**
- Avatares con icono User (placeholder)
- Tarjetas glassmorphic
- Efecto glow en hover
- Grid de 3 columnas

---

### 9. Contact Section

**Archivo**: `src/components/Contact.jsx`

**Propósito**: Captura de leads

**Campos del Formulario:**
1. Full Name (requerido)
2. Company / Organization (requerido)
3. Email Address (requerido)
4. Area of Interest (select)
   - Quantum Hardware Access
   - Training & Education
   - Consulting & Support
   - General Inquiry
5. Message (textarea, opcional)

**Diseño:**
- Formulario grande glassmorphic centrado
- Validación HTML5
- Iconos en cada campo
- CTA: "Send Message" con icono Send
- Nota: "We typically respond within 24 hours"

**Integración EmailJS:** ✅ **IMPLEMENTADO**
- ✅ Envío de emails automático al correo de QubeCore
- ✅ Estados de loading, éxito y error
- ✅ Mensajes visuales para el usuario
- ✅ Spinner durante el envío
- ✅ Reset automático del formulario tras envío exitoso
- ✅ Timeout de mensajes (5 segundos)

**Configuración:**
Ver guía completa en [`EMAILJS_SETUP.md`](./EMAILJS_SETUP.md)

**Variables de entorno requeridas:**
```env
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
```

---

## 🧩 Componentes Técnicos

### ParticlesBackground.jsx

**Configuración:**
```javascript
{
  particles: {
    number: { value: 80 },
    color: { value: 'var(--particle-color)' },
    links: {
      distance: 150,
      opacity: 0.3,
      color: 'var(--particle-color)'
    },
    move: { speed: 0.5 }
  },
  interactivity: {
    events: {
      onHover: { mode: 'grab' },
    }
  }
}
```

**Características:**
- 80 partículas máximo (performance)
- Links se activan a 150px
- Modo "grab" en hover (140px)
- Color adaptativo según tema

---

## 🎨 Sistema de Diseño

### Paleta de Colores

#### Modo Oscuro (Predeterminado)

```css
--bg-primary: #0A0F1A;        /* Azul medianoche profundo */
--bg-secondary: #121826;      /* Variante más clara */
--text-primary: #FFFFFF;
--text-secondary: #A0AEC0;    /* Gris azulado */
--accent-cyan: #00F0FF;       /* Cian eléctrico */
--accent-magenta: #B026FF;    /* Magenta vibrante */
--particle-color: #00F0FF;
```

#### Modo Claro

```css
--bg-primary: #F0F4F8;        /* Gris azulado claro */
--bg-secondary: #FFFFFF;
--text-primary: #0A0F1A;
--text-secondary: #4A5568;
--accent-cyan: #0099CC;       /* Cian corporativo */
--accent-magenta: #8B1FA8;    /* Magenta saturado */
--particle-color: #0099CC;
```

### Tipografías

**Configuración:**
```css
@theme {
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

**Uso:**
- **Space Grotesk**: Headings (h1-h6), Logo
- **Inter**: Body text, formularios, navegación

**Pesos disponibles:** 300, 400, 500, 600, 700

### Componentes CSS Reutilizables

#### .glass-header (Estado sin scroll)

```css
.glass-header {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

/* Dark mode */
.dark .glass-header {
  background: rgba(10, 15, 26, 0.75);
}

/* Light mode */
html:not(.dark) .glass-header {
  background: rgba(240, 244, 248, 0.75);
}
```

#### .glass-header-scrolled (Estado con scroll)

```css
.glass-header-scrolled {
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  border-bottom: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

/* Dark mode - más opaco para evitar solapamiento de texto */
.dark .glass-header-scrolled {
  background: rgba(10, 15, 26, 0.92);
  border-bottom-color: rgba(0, 240, 255, 0.15);
}

/* Light mode - más opaco para evitar solapamiento de texto */
html:not(.dark) .glass-header-scrolled {
  background: rgba(240, 244, 248, 0.92);
  border-bottom-color: rgba(0, 153, 204, 0.2);
}
```

#### .glass

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px var(--glass-shadow);
}
```

#### .glass-card

```css
.glass-card {
  /* Hereda de .glass */
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px var(--glass-shadow);
}
```

#### .btn-primary

```css
.btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--accent-cyan);
}
```

#### .btn-secondary

```css
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  border: 2px solid var(--accent-cyan);
  color: var(--accent-cyan);
  background: transparent;
}

.btn-secondary:hover {
  background: var(--accent-cyan);
  color: var(--bg-primary);
}
```

#### .text-gradient

```css
.text-gradient {
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### .glow

```css
.glow {
  box-shadow: 0 0 20px var(--accent-cyan);
}
```

### Responsive Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## ♿ Accesibilidad - OpenDyslexic

### Descripción General

QubeCore Landing Page incluye **soporte nativo para fuente OpenDyslexic**, una tipografía especializada diseñada para mejorar la legibilidad de personas con dislexia. Esta funcionalidad cumple con estándares **WCAG 2.1 Level A** de accesibilidad web.

### ¿Qué es OpenDyslexic?

**OpenDyslexic** es una fuente de código abierto creada específicamente para facilitar la lectura a personas con dislexia. Sus características incluyen:

- ✅ Letras con mayor grosor en la base (impide inversiones como b/d)
- ✅ Mayor espaciado entre caracteres
- ✅ Diseño inequívoco para evitar confusiones visuales
- ✅ Ligera (optimizada para web)
- ✅ Código abierto y gratuita

### Activación en Header

**Ubicación:** Header superior derecho, junto al botón de tema

**Botón de Accesibilidad:**
- **Icono:** ♿ (Accessibility de Lucide React)
- **Color Inactivo:** Cyan (#00F0FF / #0099CC)
- **Color Activo:** Magenta (#B026FF / #8B1FA8) con glow effect
- **Animación:** Scale 1 → 1.1 al activarse
- **Aria-label:** "Toggle dyslexic-friendly font"

### Funcionamiento Técnico

#### Fuentes Locales

Las fuentes OpenDyslexic se sirven localmente desde `/public/fonts/` para máxima privacidad y control:

```
frontend/public/fonts/
├── OpenDyslexic-Regular.woff2  (296 KB)
├── OpenDyslexic-Bold.woff2     (296 KB)
└── OpenDyslexic-Italic.woff2   (296 KB)
```

**Tamaño total:** ~900 KB (caché en navegador, carga única)

#### Implementación en CSS

**Archivo:** `src/index.css`

```css
/* 1. Definir @font-face */
@font-face {
  font-family: 'OpenDyslexic';
  src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

/* 2. Clase .dyslexic-mode que cambia variables */
.dyslexic-mode {
  --font-body: "OpenDyslexic", sans-serif;
  --font-heading: "OpenDyslexic", sans-serif;
}

/* 3. Estos selectores ya existen y aplican la fuente */
body { font-family: var(--font-body); }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }
```

#### Implementación en Header

**Archivo:** `src/components/Header.jsx`

```javascript
// 1. Importar icono
import { Accessibility } from 'lucide-react';

// 2. Estado para rastrear modo dyslexic
const [isDyslexicMode, setIsDyslexicMode] = useState(false);

// 3. Cargar preferencia de localStorage
useEffect(() => {
  const savedDyslexicMode = localStorage.getItem('dyslexic-mode') === 'true';
  setIsDyslexicMode(savedDyslexicMode);
  if (savedDyslexicMode) {
    document.documentElement.classList.add('dyslexic-mode');
  }
}, []);

// 4. Función toggle
const toggleDyslexicMode = () => {
  const newState = !isDyslexicMode;
  setIsDyslexicMode(newState);
  localStorage.setItem('dyslexic-mode', newState);
  document.documentElement.classList.toggle('dyslexic-mode', newState);
};

// 5. JSX del botón
<button
  onClick={toggleDyslexicMode}
  className={`p-2 rounded-full glass-card hover:glow transition-all ${
    isDyslexicMode ? 'glow-magenta' : ''
  }`}
  aria-label="Toggle dyslexic-friendly font"
  title="OpenDyslexic Font Mode"
>
  <Accessibility
    size={20}
    className={isDyslexicMode 
      ? 'text-[var(--accent-magenta)]' 
      : 'text-[var(--accent-cyan)]'
    }
  />
</button>
```

#### Inicialización en App

**Archivo:** `src/App.jsx`

```javascript
// Restaurar preferencia de OpenDyslexic al cargar la app
useEffect(() => {
  const isDyslexicMode = localStorage.getItem('dyslexic-mode') === 'true';
  if (isDyslexicMode) {
    document.documentElement.classList.add('dyslexic-mode');
  }
}, []);
```

### Persistencia

La preferencia de usuario se guarda en `localStorage` con la clave `dyslexic-mode`:

```javascript
localStorage.setItem('dyslexic-mode', true);  // Activar
localStorage.getItem('dyslexic-mode');        // Leer ('true' o null)
```

**Comportamiento:**
- ✅ Se persiste al recargar la página
- ✅ Se mantiene al navegar dentro del sitio
- ✅ Funciona independientemente del tema claro/oscuro
- ✅ Se restaura automáticamente al retornar al sitio

### Combinaciones de Temas

OpenDyslexic funciona correctamente con ambos temas:

| Combinación | Resultado |
|-------------|-----------|
| Normal + Dark | Inter/Space Grotesk con tema oscuro |
| Normal + Light | Inter/Space Grotesk con tema claro |
| Dyslexic + Dark | OpenDyslexic con tema oscuro |
| Dyslexic + Light | OpenDyslexic con tema claro |

### Accesibilidad Garantizada

La implementación cumple con estándares WCAG:

- ✅ **Contraste suficiente** (WCAG AA, mínimo 4.5:1)
- ✅ **Teclado accesible** (Tab + Enter)
- ✅ **Aria labels** correctamente etiquetados
- ✅ **Tooltip/title** descriptivo en botón
- ✅ **Color no es el único indicador** (también hay escala y glow)
- ✅ **Responde rápidamente** (sin lag)

### Recomendaciones de Uso

Para usuarios con dislexia:

1. Click en el botón ♿ en el Header
2. La fuente cambiará a OpenDyslexic en tiempo real
3. Todos los textos de la página usarán la nueva fuente
4. La preferencia se recordará en futuras visitas

### Métricas de Rendimiento

- **Fuentes descargadas:** ~900 KB total (primera carga)
- **Renderizado:** Cambio instantáneo de fuente (toggle)
- **localStorage:** Uso < 1 KB
- **Impacto en performance:** Mínimo (fuentes en caché del navegador)

### Compatibilidad

| Navegador | Soporte | Estado |
|-----------|---------|--------|
| Chrome/Edge | .woff2 | ✅ Completo |
| Firefox | .woff2 | ✅ Completo |
| Safari | .woff2 | ✅ Completo |
| IE 11 | No | ⚠️ No soportado |

### Mejoras Futuras (Opcionales)

Posibles expansiones de la funcionalidad:

- [ ] Añadir más tamaños de fuente (pequeño/normal/grande)
- [ ] Aumentar espaciado entre líneas (line-height)
- [ ] Contraste aumentado (modo alto contraste)
- [ ] Opción para combinar múltiples ajustes
- [ ] Página de preferencias avanzadas
- [ ] Sincronizar con servidor (si hay login)

---

## 🎛️ Personalización

### Cambiar Colores

**Ubicación:** `src/index.css`

```css
:root {
  /* Edita estos valores para el modo claro */
  --bg-primary: #TuColor;
  --accent-cyan: #TuCyan;
  --accent-magenta: #TuMagenta;
}

.dark {
  /* Edita estos valores para el modo oscuro */
  --bg-primary: #TuColor;
  --accent-cyan: #TuCyan;
  --accent-magenta: #TuMagenta;
}
```

### Cambiar Fuentes

**Paso 1:** Importar en `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@300;700&display=swap');
```

**Paso 2:** Configurar en `@theme`

```css
@theme {
  --font-heading: "TuFuente", sans-serif;
  --font-body: "TuFuenteBody", sans-serif;
}
```

**Nota sobre OpenDyslexic:**

OpenDyslexic no se importa de Google Fonts sino que se sirve **localmente desde `/public/fonts/`**. Si deseas agregar otra fuente de accesibilidad:

```css
/* Nuevo @font-face para fuente de accesibilidad */
@font-face {
  font-family: 'MiFuenteAccesible';
  src: url('/fonts/MiFuenteAccesible-Regular.woff2') format('woff2');
  font-weight: 400;
}

/* Crear clase similar a .dyslexic-mode */
.accesible-mode {
  --font-body: "MiFuenteAccesible", sans-serif;
  --font-heading: "MiFuenteAccesible", sans-serif;
}
```

### Modificar Textos

Cada componente tiene su contenido definido. Ejemplo en `Hero.jsx`:

```jsx
<h1>
  Unlock the{' '}
  <span className="text-gradient">Quantum Advantage</span>
</h1>
```

Simplemente edita el texto dentro de cada componente.

### Añadir/Quitar Secciones

**En `App.jsx`:**

```jsx
<main>
  <Hero />
  <ProblemSolution />
  {/* Comenta o elimina secciones aquí */}
  <Scalability />
  {/* Añade nuevas secciones aquí */}
  <TuNuevaSeccion />
</main>
```

### Configurar Partículas

**En `ParticlesBackground.jsx`:**

```jsx
number: {
  value: 80,  // Cantidad de partículas (más = más pesado)
},
move: {
  speed: 0.5,  // Velocidad de movimiento
},
links: {
  distance: 150,  // Distancia de conexión
  opacity: 0.3,   // Opacidad de las líneas
}
```

---

## ⚡ Optimización y Performance

### Métricas Actuales

**Build Size:**
- HTML: 0.62 KB (gzip: 0.38 KB)
- CSS: 27.95 KB (gzip: 5.57 KB)
- JS: 497.39 KB (gzip: 150.84 KB)
- **Total gzip: ~157 KB**

### Optimizaciones Implementadas

1. ✅ **Code Splitting**: Vite automático
2. ✅ **Tree Shaking**: Eliminación de código no usado
3. ✅ **Minificación**: CSS y JS minificados
4. ✅ **Lazy Loading**: Componentes con suspense (si aplica)
5. ✅ **Partículas optimizadas**: Modo "slim" de TSParticles

### Recomendaciones Futuras

- [ ] Lazy load de componentes con React.lazy()
- [ ] Optimización de imágenes con WebP
- [ ] Implementar Service Worker para PWA
- [ ] Usar dynamic import para Framer Motion
- [ ] Implementar Intersection Observer manual

### Performance Tips

```javascript
// Usar memo para componentes pesados
import { memo } from 'react';

const HeavyComponent = memo(({ data }) => {
  // Tu componente
});

// Lazy loading
const Contact = lazy(() => import('./components/Contact'));
```

---

## 🚀 Próximos Pasos

### Funcionalidades Pendientes

- [x] **Backend para formulario** ✅
  - [x] EmailJS implementado y funcional
  - [ ] Auto-respuesta al usuario (opcional)
  - [ ] Integración con CRM (opcional)

- [ ] **Contenido Real**
  - Textos finales de marketing
  - Imágenes del equipo
  - Logo definitivo de QubeCore

- [ ] **SEO Avanzado**
  - Meta tags completos
  - Open Graph para redes sociales
  - Schema.org markup
  - Sitemap.xml

- [ ] **Analytics**
  - Google Analytics 4
  - Hotjar (heatmaps)
  - Conversion tracking

- [ ] **Optimizaciones**
  - Lazy loading de imágenes
  - Critical CSS inline
  - Preload de fuentes

### Mejoras de UX

- [x] Loading state en formulario ✅
- [x] Mensajes de éxito/error ✅
- [x] Validación avanzada de formulario ✅
- [ ] Animación de loading global
- [ ] Skip to content link (accesibilidad)

### Integrations

- [ ] CRM (HubSpot, Salesforce)
- [ ] Email marketing (Mailchimp)
- [ ] Chat en vivo (Intercom, Drift)
- [ ] A/B Testing (Google Optimize)

---

## 🔧 Troubleshooting

### Error: PostCSS Plugin

**Síntoma:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly
```

**Solución:**
Este error ya está resuelto. Verifica que `postcss.config.js` use `@tailwindcss/postcss`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Header Glass Effect no Funciona

**Síntoma:**
El header se ve completamente blanco o no tiene efecto glass al hacer scroll.

**Solución:**
Verifica que `src/index.css` tenga los selectores correctos para ambos modos:

```css
/* Dark mode */
.dark .glass-header-scrolled {
  background: rgba(10, 15, 26, 0.92);
}

/* Light mode - IMPORTANTE: usar html:not(.dark) */
html:not(.dark) .glass-header-scrolled {
  background: rgba(240, 244, 248, 0.92);
}
```

**Nota:** No usar `:root .glass-header-scrolled` ya que tiene menor especificidad.

### Modo Oscuro no se Activa por Defecto

**Solución:**
Verifica `index.html`:

```html
<html lang="en" class="dark">
```

### Partículas no se Ven

**Causa posible:** z-index incorrecto

**Solución en `ParticlesBackground.jsx`:**
```jsx
<Particles className="absolute inset-0 -z-10" />
```

### Build Falla

**Solución:**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules dist
npm install
npm run build
```

### Fuentes no Cargan

**Solución:**
Verifica que el `@import` esté **antes** de `@import "tailwindcss"` en `index.css`.

---

## 📚 Recursos Adicionales

### Documentación

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TSParticles](https://particles.js.org/)

### Archivos Relacionados

- `QUICKSTART.md` - Guía de inicio rápido
- `VERIFICATION.md` - Reporte de verificación técnica
- `postcss.config.js` - Configuración PostCSS

### Comandos Útiles

```bash
# Ver tamaño del bundle
npm run build && du -sh dist/*

# Analizar dependencias
npm list --depth=0

# Limpiar proyecto
rm -rf node_modules dist .vite

# Actualizar dependencias
npm update
```

---

## 👥 Contribución

Este es un prototipo desarrollado siguiendo especificaciones exactas. Para modificaciones:

1. Crea una rama para tu feature
2. Mantén el sistema de diseño consistente
3. Documenta cambios significativos
4. Prueba en modo oscuro y claro
5. Verifica responsive en todos los breakpoints

---

## 📄 Licencia

Proyecto propietario de **QubeCore**.

---

## 📞 Soporte

Para preguntas técnicas o issues:
1. Revisa esta documentación completa
2. Consulta `QUICKSTART.md` para problemas comunes
3. Revisa `VERIFICATION.md` para detalles técnicos

---

<div align="center">

**QubeCore Landing Page**  
Democratizing Quantum Computing for the Enterprise

Versión 1.0.0 - Prototipo Funcional  
Abril 2026

---

Hecho con ⚛️ y mucho café

</div>
