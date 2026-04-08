# Guía de Inicio Rápido - QubeCore Landing

## ✅ Verificación del Proyecto

El proyecto está completamente funcional y usa **Tailwind CSS v4** con la nueva sintaxis.

### Iniciar el Proyecto

```bash
# 1. Navegar al directorio
cd qubecore-landing

# 2. Instalar dependencias (si aún no están instaladas)
npm install

# 3. Configurar EmailJS (opcional pero recomendado)
cp .env.example .env
# Edita .env con tus credenciales de EmailJS

# 4. Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en: **http://localhost:5173/**

### Build para Producción

```bash
npm run build
npm run preview
```

## 🔧 Solución de Problemas

### Error: PostCSS Plugin

Si ves el error:
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**Solución**: Este error ya está resuelto. El proyecto usa `@tailwindcss/postcss` en lugar de `tailwindcss` directamente.

Verifica que `postcss.config.js` contenga:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Header se ve blanco/sin efecto glass

**Problema**: Al hacer scroll, el header pierde el efecto glassmorphism.

**Solución**: Ya está corregido. El header usa clases dinámicas:
- `glass-header` (sin scroll): 75% opacidad
- `glass-header-scrolled` (con scroll): 92% opacidad

Verifica que `src/index.css` use `html:not(.dark)` para el modo claro (NO `:root`).

### Configuración de Tailwind v4

**Importante**: Este proyecto NO usa `tailwind.config.js`. 

La configuración de Tailwind v4 se hace en `src/index.css` usando la directiva `@theme`:

```css
@theme {
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  
  --color-quantum-cyan: #00F0FF;
  --color-quantum-magenta: #B026FF;
}
```

## 📂 Estructura del Proyecto

```
qubecore-landing/
├── src/
│   ├── components/        # Componentes React
│   │   ├── Header.jsx     # Navbar con glass effect dinámico
│   │   ├── Hero.jsx
│   │   ├── ParticlesBackground.jsx
│   │   ├── ProblemSolution.jsx
│   │   ├── Scalability.jsx
│   │   ├── Offer.jsx
│   │   ├── WhyUs.jsx
│   │   ├── HardwareDeepDive.jsx
│   │   ├── Team.jsx
│   │   └── Contact.jsx    # Formulario con EmailJS
│   ├── config/
│   │   └── emailjs.config.js
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos y configuración Tailwind v4
├── index.html
├── postcss.config.js     # Configuración PostCSS
├── .env.example          # Template variables de entorno
└── package.json
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `src/index.css`:

```css
:root {
  --bg-primary: #F0F4F8;      /* Fondo modo claro */
  --accent-cyan: #0099CC;     /* Color acento cyan */
  --accent-magenta: #8B1FA8;  /* Color acento magenta */
}

.dark {
  --bg-primary: #0A0F1A;      /* Fondo modo oscuro */
  --accent-cyan: #00F0FF;     /* Color acento cyan */
  --accent-magenta: #B026FF;  /* Color acento magenta */
}
```

### Modificar Fuentes

Las fuentes se configuran en `@theme` dentro de `src/index.css`:

```css
@theme {
  --font-heading: "Tu Fuente", sans-serif;
  --font-body: "Tu Fuente Body", sans-serif;
}
```

## ✨ Características Implementadas

- ✅ Modo oscuro/claro con toggle animado
- ✅ Efecto glassmorphism dinámico en header
- ✅ Navbar responsive (visible en móvil, tablet y desktop)
- ✅ Animaciones de scroll con Framer Motion
- ✅ Constelación interactiva de fondo
- ✅ Diseño responsive optimizado
- ✅ Sección Hardware consultiva (sin productos fijos)
- ✅ Formulario de contacto con EmailJS

## 🚀 Próximos Pasos

1. **Configurar EmailJS**: Ver guía en `EMAILJS_SETUP.md`
2. **Contenido Real**: Reemplazar textos de placeholder
3. **Imágenes**: Añadir imágenes del equipo y logos
4. **SEO**: Mejorar meta tags y Open Graph
5. **Analytics**: Integrar Google Analytics o similar

## 📞 Soporte

Si encuentras algún problema:
1. Verifica que estás usando Node.js v18 o superior
2. Elimina `node_modules` y vuelve a ejecutar `npm install`
3. Asegúrate de que no haya otro proceso en el puerto 5173
4. Revisa la consola del navegador (F12) para errores

---

**Estado**: ✅ Completamente Funcional  
**Versión**: 1.1.0  
**Última Actualización**: Abril 2026
