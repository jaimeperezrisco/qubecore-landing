# Documentación de Estilos - QubeCore Frontend

## Índice

1. [Visión General](#visión-general)
2. [index.css](#indexcss)
3. [Tailwind CSS](#tailwind-css)
4. [Clases de Componentes](#clases-de-componentes)
5. [Framer Motion](#framer-motion)
6. [App.css](#appcss)

---

## Visión General

El frontend de QubeCore usa múltiples fuentes de estilos:

| Archivo | Propósito | Tecnología |
|---------|----------|-----------|
| `index.css` | Estilos principales + theme | Tailwind v4 + CSS personalizado |
| `App.css` | Estilos legacy de Vite template | CSS Modules/vanilla |
| Componentes JSX | Estilos inline o Tailwind | Clases utility |

---

## index.css

Este es el **archivo principal de estilos**. Contiene todo el theme, variables CSS y clases personalizadas.

### Estructura

```css
1. Imports de fuentes
2. @import "tailwindcss" (Tailwind v4)
3. @theme { ... } (Custom properties)
4. @layer base { ... } (Estilos base + theme claro/oscuro)
5. @layer components { ... } (Componentes reutilizables)
6. @layer utilities { ... } (Utilidades extra)
```

### 1. Fuentes (Google Fonts)

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

| Fuente | Uso |
|--------|-----|
| **Space Grotesk** | Títulos (h1-h6) |
| **Inter** | Texto body |

---

### 2. Tailwind CSS v4

```css
@import "tailwindcss";
```

**¿Qué es?**
Tailwind v4 funciona diferente a v3. No usa `tailwind.config.js`, todo se define en CSS.

**¿Por qué Tailwind?**
- Utility-first: clases como `p-4`, `bg-cyan-500`
- Diseño consistente
- Dark mode automático
- Bundle pequeño (solo incluye clases usadas)

---

### 3. @theme (Custom Properties)

```css
@theme {
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  
  --color-quantum-cyan: #00F0FF;
  --color-quantum-magenta: #B026FF;
}
```

**¿Qué hace?**
Define propiedades personalizadas que Tailwind usa y我们可以 personalizar.

---

### 4. @layer base

Contiene los estilos base del documento, incluyendo el **theme claro/oscuro**.

#### Variables CSS

| Variable | Light Mode | Dark Mode | Uso |
|----------|----------|----------|-----|
| `--bg-primary` | `#F0F4F8` | `#0A0F1A` | Fondo principal |
| `--bg-secondary` | `#FFFFFF` | `#121826` | Fondo secundario |
| `--text-primary` | `#0A0F1A` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#4A5568` | `#A0AEC0` | Texto secundario |
| `--accent-cyan` | `#0099CC` | `#00F0FF` | Color acento |
| `--accent-magenta` | `#8B1FA8` | `#B026FF` | Color acento 2 |
| `--glass-bg` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.05)` | Fondo glass |
| `--glass-border` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` | Borde glass |
| `--glass-shadow` | `rgba(0,153,204,0.08)` | `rgba(0,240,255,0.05)` | Sombra glass |
| `--particle-color` | `#0099CC` | `#00F0FF` | Color partículas |

#### Theme Toggle

**Cómo funciona:**

```javascript
// En Header.jsx
const toggleTheme = () => {
  setIsDark(!isDark);
  document.documentElement.classList.toggle('dark');
};
```

1. `document.documentElement` es el `<html>`
2. Cuando tiene clase `dark` → usa variables dark
3. Cuando NO tiene clase `dark` → usa variables light (`:root`)

---

### 5. @layer components

Son clases personalizadas que我们可以复用.

#### .glass-header

```css
.glass-header {
  backdrop-filter: blur(2px) saturate(135%);
  -webkit-backdrop-filter: blur(2px) saturate(135%);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px var(--glass-shadow);
  transition: all 0.3s ease;
}
```

**Para qué serve:**
- Header fijo en la parte superior
- Efecto "glass" (vidrio esmerilado)
- Se modifica al hacer scroll (`.glass-header-scrolled`)

**Propiedades:**
- `backdrop-filter: blur(2px)`: Desenfoca lo que está detrás
- `saturate(135%)`: Aumenta saturación
- `transition`: Animación suave al cambiar

#### .glass y .glass-card

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px var(--glass-shadow);
}

.glass-card {
  /* Igual que .glass + */
  background: var(--glass-bg);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px var(--glass-shadow);
}
```

**Diferencia:**
- `.glass`: Solo container básico
- `.glass-card`: Container con border-radius, padding y hover animation

**Glassmorphism:**
Es un efecto visual que imita vidrio esmerilado/translúcido.

---

#### .btn-primary y .btn-secondary

```css
.btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px; /* Círculo perfecto */
  font-weight: 600;
  transition: all 0.3s;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
  color: white;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 2px solid var(--accent-cyan);
  color: var(--accent-cyan);
  background: transparent;
}
```

**Diferencia:**

| Clase | Fondo | Borde | Uso |
|-------|-------|-------|-----|
| `.btn-primary` | Gradient cyan→magenta | No | CTA principal |
| `.btn-secondary` | Transparente | Cyan | Secundario |

---

#### .contact-select

```css
.contact-select {
  background: color-mix(in srgb, var(--bg-secondary) 88%, transparent);
  color: var(--text-primary);
}
```

**Problema que resuelve:**
- Los `<select>` en algunos navegadores no respetan el fondo
- `color-scheme` ayuda a que el navegador use el theme correcto

---

#### .section

```css
.section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  position: relative;
}

/* Responsive */
@media (min-width: 768px) {
  .section {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}
```

**Por qué padding grande:**
- Evita que el contenido choque con el header fijo
- En móvil es menor, en desktop es mayor

---

### 6. @layer utilities

#### .text-gradient

```css
.text-gradient {
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Cómo funciona:**
1. `background`: gradient en el fondo del texto
2. `background-clip: text`: recorta el fondo al texto
3. `webkit-text-fill-color: transparent`: hace el texto transparente

**Resultado:** El texto tiene el gradiente como color.

#### .glow y .glow-magenta

```css
.glow {
  box-shadow: 0 0 20px var(--accent-cyan);
}

.glow-magenta {
  box-shadow: 0 0 20px var(--accent-magenta);
}
```

**Para qué sirven:**
- Efectos de luz en botones al hacer hover
- Resaltar elementos

---

## Tailwind CSS

### ¿Qué es?

Tailwind es un framework CSS **utility-first**. En lugar de crear clases como `.btn`, usas clasesutility directamente en el HTML.

### Ejemplos de clases usadas en QubeCore

| Clase | Equivalente CSS |
|-------|--------------|
| `flex` | `display: flex` |
| `items-center` | `align-items: center` |
| `justify-center` | `justify-content: center` |
| `p-4` | `padding: 1rem` |
| `m-4` | `margin: 1rem` |
| `text-cyan-500` | `color: #06b6d4` |
| `bg-gray-900` | `background: #111827` |
| `rounded-xl` | `border-radius: 0.75rem` |
| `hover:bg-cyan-600` | `:hover { background: #0891b2 }` |
| `dark:text-white` | `.dark { color: white }` |
| `md:flex` | `@media (min-width: 768px) { display: flex }` |

### Breakpoints

| Prefix | Min-width | Uso |
|--------|----------|-----|
| `sm:` | 640px | Móviles grandes |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktop |

### Dark Mode

```html
<!-- Cambia automáticamente según la clase .dark en <html> -->
<div class="dark:bg-gray-900 bg-white">
  Contenido
</div>
```

**En QubeCore:**
- Por defecto tiene clase `dark` (dark mode)
- Toggle en header remueve/agrega clase `dark`

---

## Framer Motion

### ¿Qué es?

Framer Motion es una librería de animaciones para React. Permite crear animaciones declarativas.

### ¿Por qué Framer Motion y no CSS?

| Característica | CSS | Framer Motion |
|----------------|-----|--------------|
| Animaciones complejas | Mucho código | Declarativo |
| Transiciones respondidas a eventos | Limited | `whileHover`, `whileTap` |
| Scroll-triggered | Necesita IntersectionObserver | `useInView` |
| Performance | Variable | Optimizado |

### Uso en QubeCore

#### 1. Animación de entrada al hacer scroll

```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Section = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      Contenido
    </motion.div>
  );
};
```

**Qué hace:**
- `initial`: Estado inicial (invisible, desplazado 30px abajo)
- `animate`: Estado final (visible, posición original)
- `transition`: Duración de 0.8 segundos
- `useInView`: Detecta cuando el elemento entra en viewport

#### 2. Botón con respuesta a hover/tap

```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>
```

- `whileHover`: Cuando el mouse está sobre el botón
- `whileTap`: Cuando se hace click

#### 3. Scroll indicator animado

```jsx
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  ↓
</motion.div>
```

- `y: [0, 10, 0]`: Mueve 0→10→0 pixeles
- `repeat: Infinity`: Repite infinitamente

#### 4. key concepts

| Concepto | Descripción |
|---------|------------|
| `initial` | Estado inicial de la animación |
| `animate` | Estado final |
| `transition` | Cómo llegar del inicio al final (easing, duración) |
| `whileHover` | Animación cuando mouse está sobre elemento |
| `whileTap` | Animación cuando se hace click |
| `useInView` | Hook que detecta visibility en viewport |
| `AnimatePresence` | Para animaciones de entrada/salida de componentes |

---

## App.css

### ¿Qué contiene?

Este archivo contiene estilos **legacy** del template de Vite. La mayoría NO se usan en QubeCore.

### Clases que SE USAN

```css
/* Parece que no hay clases usadas de App.css en los componentes actuales */
```

### Clases que NO SE USAN (legacy)

- `.counter`
- `.hero`
- `.base`, `.framework`, `.vite`
- `#center`
- `#next-steps`
- `#docs`
- `.ticks`

**Recomendación:** Se puede eliminar todo App.css ya que no se utiliza en los componentes. Pero primero verificar que no haya referencias en otros archivos.

### ¿Cómo verificar si se usa?

```bash
# Buscar referencias a clases de App.css
grep -r "class=\"counter\"" frontend/src/
grep -r "class=\"hero\"" frontend/src/
```

---

## Resumen de Estilos

| Archivo | Importante? | Se usa? |
|---------|------------|---------|
| `index.css` | ✅ Sí | Todo |
| `App.css` | ⚠️ Legacy | Probablemente no |

---

## Notas Adicionales

### ¿Por qué Glassmorphism?

El diseño "glassmorphism" (vidrio esmerilado) es popular en interfaces modernas porque:
- Da profundidad
- Permite ver las partículas detrás
- Se integra bien con el theme oscuro/quantum

### ¿Por qué Gradient en botones?

Los gradientes cyan→magenta dan:
- Aspecto "futurístico" / "quantum"
- Distingue los CTAs del resto
- Coincide con el branding

### ¿Por qué Tailwind en lugar de CSS modules?

- Desarrollo más rápido
- Menos archivos que mantener
- Consistencia en el diseño
- Dark mode automático