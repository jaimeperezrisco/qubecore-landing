# 🌍 Guía de Despliegue en Producción (VPS Ubuntu/Debian)

Este manual aborda el despliegue del componente "Cerebro" (Motor Backend + Bases de Datos) de QubeCore hacia un servidor privado a través de **Docker**. Dado que hemos resuelto alojar el Frontend (nuestra vista final) estáticamente en **Vercel** (`https://qubecore-landing.vercel.app/`), el servidor VPS actuará estrictamente como un API REST Gateway unificado.

---

## 🛠️ 1. Preparar la VPS Linux Remota

1. Conéctate vía comando SSH a tu máquina:
   ```bash
   ssh root@TU_DIRECCION_IP
   ```
2. Instala Docker y Git si tu imagen Ubuntu/Debian no lo incorpora (Actualiza repositorios):
   ```bash
   sudo apt-get update
   sudo apt-get install docker.io docker-compose git -y
   ```
3. Sitúate en un directorio común, ej. `/opt/` y clona tu repositorio Qubecore:
   ```bash
   cd /opt
   git clone https://ruta-de-tu-repo/qubecore-landing.git
   cd qubecore-landing
   ```

---

## 🔒 2. Seguridad del Entorno

En producción nunca permitas las variables de depuración base. 
Asegúrate de preparar en el entorno remoto un archivo de dependencias vitales.

```bash
cp .env.example .env
nano .env
```
Rellena o modifica el archivo. **Es imperativo cambiar:**
- `MYSQL_ROOT_PASSWORD`
- `MYSQL_PASSWORD`
- `JWT_SECRET` (Genera una cadena alfanumérica muy extensa sin espacios para la capa de firmas digitales Java).

---

## 🛡️ 3. Aprovisionamiento HTTPS Inverso (SSL - Certbot)

Para que Vercel (que impone `https://`) pueda enviar datos confidenciales B2B a nuestro VPS de manera blindada, nuestra API debe poseer su propio sello de confianza SSL.

1. **Configura tu dominio en tu proveedor (Namecheap/GoDaddy):** Asigna un subdominio `api.tudominio.com` apuntando (Registro tipo 'A') a la IP del VPS.
2. Comenta **temporalmente** los redireccionamientos pesados `443 ssl` ubicados en el final del documento `nginx/nginx.conf` o el inicio del mismo a HTTPS, para permitirle a la autoridad certificadora leer en el puerto 80 sin ruido.
3. Levanta Nginx a oscuras momentáneamente:
   ```bash
   docker compose up -d nginx
   ```
4. Ejecuta el contendor criptográfico temporal (cambia tus correos y dominio):
   ```bash
   docker run --rm \
     -v ./certbot/www:/var/www/certbot \
     -v ./certbot/conf:/etc/letsencrypt \
     certbot/certbot certonly \
     --webroot \
     --webroot-path /var/www/certbot \
     -d api.qubecore.es \
     --email tu_correo@empresa.com \
     --agree-tos \
     --no-eff-email
   ```
5. Si fue exitoso, vuelve a **quitar los comentarios (#)** en tu `nginx/nginx.conf` donde definen `ssl_certificate` y `listen 443;`. NGINX ahora interceptará, descifrará e iterará las peticiones HTTP2 de manera encriptada a nuestras API de backend.

---

## 🚀 4. Despliegue Máster Multi-Contenedor

1. Ejecuta el comando en cadena y deja a Docker ensamblar y descargar las topologías:
   ```bash
   docker compose up --build -d
   ```
2. Realiza un ping a los `logs` en paralelo del motor de backend para garantizar que Java está "Listening en el Main Thread 8080".
   ```bash
   docker compose logs -f backend
   ```

---

## 🔌 5. Ultima pieza: El cordón Vercel

Tu API robusta ya existe en tu VPS resguardada tras tu proxy estricto Nginx emitiendo cabeceras CORS pre-configuradas. ¡Es momento de ensamblarlos!

1. Accede a tu plataforma **Vercel** por consola de usuario y navega hasta el proyecto: `qubecore-landing-xxxx`.
2. Dirigite a **Settings (Configuración) > Environment Variables (Variables de entorno)**.
3. Configura en la nube Vercel tu nueva ruta a la que construimos en el paso anterior:
   * **Key**: `VITE_API_URL`
   * **Value**: `https://api.qubecore.es` (Sustituye por tu dominio o subdominio asignado VPS)
4. En la pestaña de *Deployments*, presiona **Redeploy**.

### ✨ RESULTADO FINAL

* Vercel hospedará a 0 coste computacional todos los megabytes de tus vídeos reactivos y tus diseños Tailwind en su CDN Global ultrarrápida.
* Cualquier clic o contacto que se gatille desde el UI asincrono de la landing viajará encriptado sin importar de qué geografía provenga el usuario.
* Tu VPS procesará el volumen pesado transaccional protegiéndote de SQL injections manejando un JWT seguro.  
* Has logrado establecer una **Arquitectura Distribuida Micro-Front/Monolítica de grado empresarial**.
