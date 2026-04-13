# 🚀 Guía de Despliegue Local (Entorno Escuela / Pruebas)

Esta guía documenta el procedimiento oficial paso a paso para levantar el proyecto web **QubeCore** de manera aislada en tu propia computadora, ideal para demostraciones, pruebas en entornos escolares, o desarrollo interno donde el frontend y el backend residen y se procesan en el mismo ordenador bajo `localhost`.

### 📌 ¿Por qué un Despliegue Local?
Al estar corriendo el Backend (`http://localhost:8080`) y el Frontend (`http://localhost:5173`) sin capas complejas de proxies HTTP o cortafuegos de Vercel/Cloudflare, se garantiza el funcionamiento de todo el ecosistema de llamadas asíncronas **sin bloqueos de CORS** o "Contenido Mixto", además de no depender de internet para demostrar tu base de datos.

---

## 🛠️ 1. Prerrequisitos de la Máquina
Asegúrate de tener instalados los siguientes componentes en el ordenador:
1. **Docker Desktop** o **Docker Engine** (Para orquestar Java y MySQL sin ensuciar la máquina).
2. **Node.js** (Versiones 18 o 20) y NPM instalados de forma global.

---

## 🏃 2. Arrancar el Backend y la Base de Datos

Las tuberías de datos, las tablas y la lógica Spring Boot están empaquetadas en un contenedor. Vamos a invocarlo:

1. Abre tu terminal de comandos e ingresa al directorio raíz del proyecto:
   ```bash
   cd qubecore-landing
   ```
2. Ejecuta el orquestador pidiendo que construya las imágenes:
   ```bash
   docker compose up --build -d
   ```
3. **¿Qué sucederá en segundo plano?**
   - Se creará un contenedor con MySQL versión 8.
   - El script `init-db/01-init.sql` formatea la base de datos automáticamente e inserta un super-usuario.
   - El contenedor Java / Spring Boot se sincronizará e iniciará el API escuchando en tu puerto `8080`.

*(Puedes verificar que todo esté en verde ejecutando el comando `docker ps`, revisando los contenedores "qubecore-mysql" y "qubecore-backend").*

---

## 💻 3. Arrancar el Frontend React

Con el esqueleto vivo, ahora toca presentar el portal visual.

1. Abre una **nueva ventana/pestaña** en tu consola de comandos, y dirígete a la ruta del frontend:
   ```bash
   cd qubecore-landing/frontend
   ```
2. Instala las dependencias (por si alguien clonó el proyecto de cero):
   ```bash
   npm install
   ```
3. Levanta el servidor en caliente de Vite:
   ```bash
   npm run dev
   ```

---

## 🔍 4. Cómo Evaluar tu Presentación (Demo)

Todo tu ecosistema corporativo ha cobrado vida.
1. Abre tu navegador preferido e ingresa a: **[http://localhost:5173](http://localhost:5173)**
2. Desplázate (Scroll) e interactúa con las zonas de Glassmorphism, y luego somete un formulario ficticio usando el módulo de Contáctanos.
3. Ingresa al Centro de Comandos para evaluar la interceptación y retención de esa data viajando a: **[http://localhost:5173/admin](http://localhost:5173/admin)**
4. Utiliza la clave blindada inicial auto-generada:
   * **Usuario:** `admin@qubecore.es`
   * **Contraseña:** `Admin123!`
5. **Observa el Panel de Administración:** Verificando que tu entrada ha fluido exitosamente desde los componentes web JS, por la API REST Java, hacia la base de datos MySQL, ¡todo en décimas de segundo!

---

💡 *Tip para cerrar sesión de demostración:* Cuando acabes todo, puedes apagar el backend deteniendo Docker (`docker compose down`) en la terminal donde lo originaste, y cortando con `Ctrl + C` el frontend.
