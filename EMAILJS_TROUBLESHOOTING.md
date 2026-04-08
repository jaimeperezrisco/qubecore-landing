# 🔧 EmailJS Troubleshooting Guide

## ✅ Problemas Corregidos

### 1. Archivo `.env` Creado
- ✅ Se ha creado el archivo `.env` con tus credenciales
- ✅ Las variables de entorno ahora son accesibles por Vite

### 2. Implementación de EmailJS Corregida
- ❌ **Antes**: Se inicializaba EmailJS dos veces (línea 35: `emailjs.init()`)
- ✅ **Ahora**: Solo se usa `emailjs.send()` con la Public Key como último parámetro

---

## 📋 Verificación de Template en EmailJS

Para que el formulario funcione, tu template en EmailJS **DEBE** tener estas variables exactas:

### Variables Requeridas en el Template:

```
{{from_name}}      → Nombre del usuario
{{from_email}}     → Email del usuario
{{company}}        → Empresa del usuario
{{interest}}       → Área de interés seleccionada
{{message}}        → Mensaje del usuario
{{to_name}}        → Destinatario (QubeCore Team)
```

### Pasos para Verificar el Template:

1. **Ve a tu dashboard de EmailJS**: https://dashboard.emailjs.com/
2. **Click en "Email Templates"**
3. **Abre tu template** (ID: `template_vkfxjy8`)
4. **Verifica que el contenido HTML incluya TODAS las variables** entre `{{  }}`

### Ejemplo de Template Correcto:

```html
<!DOCTYPE html>
<html>
<head>
  <title>New Contact from QubeCore Landing</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>🚀 New Contact Form Submission</h2>
  
  <p><strong>From:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Company:</strong> {{company}}</p>
  <p><strong>Area of Interest:</strong> {{interest}}</p>
  
  <h3>Message:</h3>
  <p>{{message}}</p>
  
  <hr>
  <p style="color: #666; font-size: 12px;">
    This email was sent from QubeCore Landing Page contact form.
  </p>
</body>
</html>
```

---

## 🔍 Cómo Depurar Errores

### 1. Abre la Consola del Navegador
Presiona `F12` o `Ctrl+Shift+I` y ve a la pestaña **Console**.

### 2. Envía el Formulario
Intenta enviar un mensaje de prueba.

### 3. Revisa los Errores

#### Error Común #1: "Public Key is required"
**Causa**: El archivo `.env` no existe o las variables no tienen el prefijo `VITE_`

**Solución**: 
- ✅ Ya creado: `/qubecore-landing/.env`
- ✅ Variables tienen prefijo `VITE_` correcto

#### Error Común #2: "Template not found"
**Causa**: El Template ID no existe o está mal escrito

**Verificar**:
```javascript
// Revisa en la consola que se impriman valores reales:
console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
```

#### Error Común #3: "Failed to send email"
**Causa**: Service ID incorrecto o servicio no configurado

**Solución**:
1. Ve a https://dashboard.emailjs.com/admin
2. Click en "Email Services"
3. Verifica que el Service ID coincida exactamente con el de tu `.env`

#### Error Común #4: Variables del template no aparecen
**Causa**: El template no tiene las variables configuradas correctamente

**Solución**:
1. Edita tu template en EmailJS
2. Usa `{{variable_name}}` para cada variable (ver ejemplo arriba)
3. Guarda el template

---

## 🧪 Pasos para Probar Ahora

### 1. Reiniciar el Servidor de Desarrollo
```bash
# Detén el servidor actual (Ctrl+C)
# Reinicia para cargar las nuevas variables de entorno
npm run dev
```

### 2. Probar el Formulario
1. Abre http://localhost:5173
2. Ve a la sección "Contact"
3. Llena el formulario con datos de prueba
4. Click en "Send Message"
5. **Abre la consola del navegador (F12)** para ver los logs

### 3. Verificar Resultado

**✅ Si funciona:**
- Verás el mensaje de éxito verde
- En la consola: "Email sent successfully"
- Recibirás el email en la bandeja del servicio configurado

**❌ Si falla:**
- Verás el mensaje de error rojo
- En la consola: "EmailJS Error: [detalles del error]"
- Copia el error exacto y revísalo contra las soluciones arriba

---

## 🎯 Checklist de Verificación

- [x] Archivo `.env` existe en `/qubecore-landing/.env`
- [x] Variables tienen prefijo `VITE_`
- [x] Código de Contact.jsx corregido (sin doble inicialización)
- [ ] Template en EmailJS tiene todas las variables `{{from_name}}`, `{{from_email}}`, etc.
- [ ] Service ID es correcto y el servicio está activo
- [ ] Public Key es correcta (revísala en Dashboard → Account)
- [ ] Servidor de desarrollo reiniciado después de crear `.env`

---

## 📞 Siguiente Paso

**Reinicia el servidor ahora y prueba de nuevo:**

```bash
cd qubecore-landing
npm run dev
```

Luego prueba el formulario. Si aún hay un error, **copia el mensaje exacto de error de la consola del navegador** y te ayudo a solucionarlo.
