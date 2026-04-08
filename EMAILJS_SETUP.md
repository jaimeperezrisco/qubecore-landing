# 📧 Guía de Configuración de EmailJS para QubeCore

Esta guía te ayudará a configurar **EmailJS** para que el formulario de contacto envíe emails automáticamente a tu correo de QubeCore.

## 📋 Tabla de Contenidos

1. [¿Qué es EmailJS?](#qué-es-emailjs)
2. [Crear cuenta en EmailJS](#crear-cuenta-en-emailjs)
3. [Configurar servicio de email](#configurar-servicio-de-email)
4. [Crear plantilla de email](#crear-plantilla-de-email)
5. [Obtener credenciales](#obtener-credenciales)
6. [Configurar variables de entorno](#configurar-variables-de-entorno)
7. [Probar el formulario](#probar-el-formulario)
8. [Troubleshooting](#troubleshooting)

---

## 🌟 ¿Qué es EmailJS?

**EmailJS** es un servicio que permite enviar emails directamente desde el frontend sin necesidad de un servidor backend. Es perfecto para formularios de contacto en landing pages.

**Ventajas:**
- ✅ No necesitas backend
- ✅ 200 emails gratis al mes
- ✅ Fácil configuración
- ✅ Soporte para múltiples servicios de email (Gmail, Outlook, etc.)

---

## 🚀 Paso 1: Crear cuenta en EmailJS

1. Ve a [EmailJS](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"**
3. Crea tu cuenta con email o Google
4. Verifica tu email

**⏱️ Tiempo estimado: 2 minutos**

---

## 📨 Paso 2: Configurar servicio de email

### 2.1 Añadir un Email Service

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email:
   - **Gmail** (recomendado para pruebas)
   - Outlook
   - Yahoo
   - Otro (SMTP personalizado)

### 2.2 Configurar Gmail (Recomendado)

1. Selecciona **Gmail**
2. Haz clic en **"Connect Account"**
3. Autoriza EmailJS con tu cuenta de Gmail
4. **IMPORTANTE**: Copia el **Service ID** (ejemplo: `service_abc123`)

**Ejemplo de Service ID:**
```
service_xyz789
```

### 2.3 Configurar Email de Destino

En la configuración del servicio, asegúrate de que el email receptor sea el correo de QubeCore donde quieres recibir los mensajes.

**⏱️ Tiempo estimado: 3-5 minutos**

---

## 📝 Paso 3: Crear plantilla de email

### 3.1 Crear Template

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Asigna un nombre: `QubeCore Contact Form`

### 3.2 Configurar el Template

**Subject (Asunto):**
```
New Contact from {{from_name}} - {{company}}
```

**Body (Contenido del email):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00F0FF, #B026FF); padding: 20px; border-radius: 10px; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #f4f4f4; padding: 20px; margin-top: 20px; border-radius: 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #000; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Contact Request - QubeCore</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">🏢 Company:</div>
                <div class="value">{{company}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">🎯 Area of Interest:</div>
                <div class="value">{{interest}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from the QubeCore landing page contact form.</p>
            <p>Reply to: {{from_email}}</p>
        </div>
    </div>
</body>
</html>
```

### 3.3 Configurar Variables

Asegúrate de que tu template tenga estas variables (se mapean automáticamente desde el formulario):

- `{{from_name}}` - Nombre del contacto
- `{{from_email}}` - Email del contacto
- `{{company}}` - Empresa
- `{{interest}}` - Área de interés
- `{{message}}` - Mensaje
- `{{to_name}}` - "QubeCore Team" (automático)

### 3.4 Guardar y obtener Template ID

1. Haz clic en **"Save"**
2. **IMPORTANTE**: Copia el **Template ID** (ejemplo: `template_abc123`)

**Ejemplo de Template ID:**
```
template_xyz789
```

**⏱️ Tiempo estimado: 5-7 minutos**

---

## 🔑 Paso 4: Obtener credenciales

### 4.1 Public Key

1. Ve a **"Account"** (icono de usuario arriba a la derecha)
2. Selecciona **"General"**
3. En la sección **"API Keys"**, encontrarás tu **Public Key**
4. **IMPORTANTE**: Copia el **Public Key** (ejemplo: `abc123xyz`)

**Ejemplo de Public Key:**
```
aBcDeFgHiJkLmNoPqRsTuV
```

### 4.2 Resumen de Credenciales

Al finalizar, debes tener:

| Credencial | Ejemplo | Dónde se encuentra |
|------------|---------|-------------------|
| **Public Key** | `aBcDeFgHiJkLmNoPqRsTuV` | Account → General → API Keys |
| **Service ID** | `service_xyz789` | Email Services → Tu servicio |
| **Template ID** | `template_xyz789` | Email Templates → Tu template |

**⏱️ Tiempo estimado: 2 minutos**

---

## ⚙️ Paso 5: Configurar variables de entorno

### 5.1 Crear archivo .env

En la raíz del proyecto `qubecore-landing`, crea un archivo llamado `.env`:

```bash
# Navegar al proyecto
cd qubecore-landing

# Crear archivo .env
touch .env
```

### 5.2 Añadir credenciales

Edita el archivo `.env` y añade tus credenciales:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=aBcDeFgHiJkLmNoPqRsTuV
VITE_EMAILJS_SERVICE_ID=service_xyz789
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
```

**⚠️ IMPORTANTE:**
- Reemplaza los valores de ejemplo con tus credenciales reales
- El prefijo `VITE_` es obligatorio para que Vite exponga las variables
- NO subas el archivo `.env` a Git (ya está en `.gitignore`)

### 5.3 Verificar .gitignore

El archivo `.gitignore` ya incluye `.env`, pero verifica:

```gitignore
# Environment variables
.env
.env.local
.env.production
```

**⏱️ Tiempo estimado: 2 minutos**

---

## ✅ Paso 6: Probar el formulario

### 6.1 Reiniciar servidor de desarrollo

Si el servidor ya estaba corriendo, debes reiniciarlo para que cargue las variables:

```bash
# Detener servidor (Ctrl+C)
# Luego iniciar de nuevo:
npm run dev
```

### 6.2 Probar envío

1. Abre http://localhost:5173
2. Navega al formulario de contacto (final de la página)
3. Rellena todos los campos:
   - Nombre: "Test User"
   - Empresa: "Test Company"
   - Email: tu-email@gmail.com (usa un email real para recibir confirmación)
   - Área de interés: Cualquiera
   - Mensaje: "Este es un mensaje de prueba"
4. Haz clic en **"Send Message"**

### 6.3 Verificar comportamiento

**Durante el envío:**
- ✅ Botón muestra "Sending..." con spinner
- ✅ Campos del formulario se deshabilitan

**Si es exitoso:**
- ✅ Mensaje verde de éxito aparece
- ✅ Formulario se resetea
- ✅ Deberías recibir el email en tu bandeja de entrada (puede tardar 1-2 minutos)

**Si hay error:**
- ✅ Mensaje rojo de error aparece
- ✅ Los datos del formulario se mantienen

### 6.4 Verificar email recibido

Revisa tu bandeja de entrada (el email configurado en EmailJS):
- **Asunto**: "New Contact from Test User - Test Company"
- **Contenido**: Email formateado con todos los datos

**⏱️ Tiempo estimado: 3 minutos**

---

## 🔧 Troubleshooting

### Error: "Public Key is invalid"

**Solución:**
1. Verifica que el Public Key en `.env` sea correcto
2. Asegúrate de que NO haya espacios antes o después del valor
3. Reinicia el servidor de desarrollo

### Error: "Service ID not found"

**Solución:**
1. Verifica que el Service ID en `.env` sea correcto
2. Ve al dashboard de EmailJS y confirma que el servicio esté activo
3. Copia de nuevo el Service ID directamente desde EmailJS

### Error: "Template ID not found"

**Solución:**
1. Verifica que el Template ID en `.env` sea correcto
2. Asegúrate de haber guardado el template en EmailJS
3. Ve a Email Templates y confirma que el template exista

### No recibo el email

**Causas posibles:**

1. **Revisa spam**: El email podría estar en spam/junk
2. **Cuenta no verificada**: Verifica tu email en EmailJS
3. **Límite de emails**: EmailJS tiene límite de 200/mes en plan gratuito
4. **Email incorrecto**: Verifica que el email receptor en EmailJS sea correcto

**Solución:**
1. Ve al dashboard de EmailJS → "Email Services"
2. Verifica que tu servicio de email esté conectado (estado: Connected)
3. Haz una prueba desde el dashboard de EmailJS directamente

### Las variables de entorno no cargan

**Solución:**
1. Asegúrate de que el archivo se llame exactamente `.env` (no `.env.txt`)
2. Verifica que las variables empiecen con `VITE_`
3. Reinicia completamente el servidor (Ctrl+C y `npm run dev`)
4. Verifica que `.env` esté en la raíz del proyecto, no en `src/`

### Error de CORS

**Solución:**
EmailJS ya maneja CORS automáticamente. Si ves este error:
1. Verifica que estés usando `@emailjs/browser` v4+
2. Asegúrate de haber inicializado EmailJS con `emailjs.init()`

---

## 📊 Plan Gratuito de EmailJS

**Límites del plan gratuito:**
- ✅ 200 emails/mes
- ✅ 2 Email Services
- ✅ 2 Email Templates
- ✅ Soporte básico

**Para más emails:**
- Plan Personal: 1000 emails/mes ($7/mes)
- Plan Pro: 10000 emails/mes ($35/mes)

---

## 🎯 Checklist de Configuración

- [ ] Cuenta de EmailJS creada
- [ ] Email Service configurado y conectado
- [ ] Template creado con HTML personalizado
- [ ] Public Key copiado
- [ ] Service ID copiado
- [ ] Template ID copiado
- [ ] Archivo `.env` creado con las 3 credenciales
- [ ] Servidor reiniciado
- [ ] Formulario probado exitosamente
- [ ] Email de prueba recibido

---

## 📞 Soporte

Si tienes problemas:

1. **Documentación oficial**: [EmailJS Docs](https://www.emailjs.com/docs/)
2. **FAQ**: [EmailJS FAQ](https://www.emailjs.com/docs/faq/)
3. **Soporte**: support@emailjs.com

---

## 🚀 Próximos Pasos (Opcional)

### Auto-respuesta al usuario

Puedes crear un segundo template para enviar un email de confirmación automático al usuario:

1. Crea un nuevo template llamado "Auto-reply"
2. Configura el destinatario como `{{from_email}}`
3. Mensaje de agradecimiento y confirmación
4. Envía dos emails en el `handleSubmit`:

```javascript
// Email a QubeCore
await emailjs.send(serviceId, templateId, templateParams);

// Auto-respuesta al usuario
await emailjs.send(serviceId, autoReplyTemplateId, {
  to_email: formData.email,
  to_name: formData.name
});
```

### Integración con CRM

EmailJS se puede integrar con:
- Zapier
- Make (Integromat)
- Webhooks personalizados

---

<div align="center">

**🎉 ¡Configuración completada!**

Tu formulario de contacto ahora envía emails automáticamente a tu bandeja de entrada.

---

**Tiempo total estimado: 15-20 minutos**

</div>
