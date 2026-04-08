# 📧 Plantillas de Email para EmailJS

Este archivo contiene plantillas de email listas para usar en EmailJS.

## 📋 Tabla de Contenidos

1. [Plantilla Principal (HTML Completo)](#plantilla-principal-html-completo)
2. [Plantilla Minimalista](#plantilla-minimalista)
3. [Plantilla de Auto-respuesta](#plantilla-de-auto-respuesta)

---

## 🎨 Plantilla Principal (HTML Completo)

**Nombre sugerido**: `QubeCore Contact Form`

### Subject:
```
New Contact from {{from_name}} - {{company}}
```

### Body (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #00F0FF, #B026FF); 
            padding: 30px 20px; 
            border-radius: 10px; 
            text-align: center;
        }
        .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 24px; 
        }
        .content { 
            background: #f4f4f4; 
            padding: 30px 20px; 
            margin-top: 20px; 
            border-radius: 10px; 
        }
        .field { 
            margin-bottom: 20px; 
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #00F0FF;
        }
        .label { 
            font-weight: bold; 
            color: #555; 
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value { 
            color: #000; 
            margin-top: 5px;
            font-size: 16px;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #888; 
            font-size: 12px;
            border-top: 2px solid #eee;
            padding-top: 20px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #00F0FF, #B026FF);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Contact Request - QubeCore</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">🏢 Company / Organization</div>
                <div class="value">{{company}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email Address</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">🎯 Area of Interest</div>
                <div class="value">{{interest}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Message</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>This message was sent from the QubeCore landing page contact form.</strong></p>
            <p>Reply to: <a href="mailto:{{from_email}}" style="color: #00F0FF;">{{from_email}}</a></p>
            <p style="margin-top: 20px; color: #aaa;">QubeCore - Democratizing Quantum Computing for the Enterprise</p>
        </div>
    </div>
</body>
</html>
```

---

## ✨ Plantilla Minimalista

**Nombre sugerido**: `QubeCore Contact Simple`

### Subject:
```
New Contact: {{from_name}} ({{company}})
```

### Body (Texto Simple):

```
New Contact Request - QubeCore

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT DETAILS

Name: {{from_name}}
Company: {{company}}
Email: {{from_email}}
Interest: {{interest}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MESSAGE

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{from_email}}

---
Sent from QubeCore Landing Page
```

---

## 📬 Plantilla de Auto-respuesta

**Nombre sugerido**: `QubeCore Auto-reply`

**Uso**: Email automático de confirmación al usuario

### Subject:
```
Thank you for contacting QubeCore - We received your message
```

### Body (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #00F0FF, #B026FF); 
            padding: 40px 20px; 
            border-radius: 10px; 
            text-align: center;
        }
        .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 28px; 
        }
        .content { 
            padding: 30px 20px; 
        }
        .content p {
            font-size: 16px;
            margin-bottom: 15px;
        }
        .highlight {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #00F0FF;
            margin: 20px 0;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #888; 
            font-size: 12px;
            border-top: 2px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Message Received!</h1>
        </div>
        
        <div class="content">
            <p>Hi {{from_name}},</p>
            
            <p>Thank you for reaching out to <strong>QubeCore</strong>! We've successfully received your message regarding <strong>{{interest}}</strong>.</p>
            
            <div class="highlight">
                <p style="margin: 0;"><strong>What happens next?</strong></p>
                <p style="margin: 10px 0 0 0;">Our quantum advisors will review your inquiry and get back to you within <strong>24 hours</strong>. We're excited to help you unlock the quantum advantage!</p>
            </div>
            
            <p>In the meantime, feel free to explore more about our quantum computing solutions:</p>
            
            <ul>
                <li>🔬 Custom Quantum Hardware Solutions</li>
                <li>📚 Training & Education Programs</li>
                <li>🤝 Expert Consulting & Support</li>
            </ul>
            
            <p>If you have any urgent questions, don't hesitate to reply to this email.</p>
            
            <p>Best regards,<br>
            <strong>The QubeCore Team</strong></p>
        </div>
        
        <div class="footer">
            <p><strong>QubeCore</strong></p>
            <p>Democratizing Quantum Computing for the Enterprise</p>
            <p style="margin-top: 10px;">
                <a href="mailto:contact@qubecore.com" style="color: #00F0FF; text-decoration: none;">contact@qubecore.com</a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 🔧 Cómo Usar las Plantillas

### Plantilla Principal (Obligatoria)

1. Ve a EmailJS Dashboard → **Email Templates**
2. Haz clic en **"Create New Template"**
3. Nombre: `QubeCore Contact Form`
4. Copia el Subject y el Body HTML de arriba
5. Guarda y copia el **Template ID**

### Auto-respuesta (Opcional)

Para enviar confirmación automática al usuario:

1. Crea un segundo template con el HTML de auto-respuesta
2. En `Contact.jsx`, modifica `handleSubmit`:

```javascript
// Email a QubeCore (principal)
await emailjs.send(
  emailJsConfig.serviceId,
  emailJsConfig.templateId,
  templateParams,
  emailJsConfig.publicKey
);

// Auto-respuesta al usuario
await emailjs.send(
  emailJsConfig.serviceId,
  'template_autoreply_id_aqui', // ID del template de auto-respuesta
  {
    to_email: formData.email,
    from_name: formData.name,
    interest: formData.interest,
  },
  emailJsConfig.publicKey
);
```

---

## 📝 Variables Disponibles

Estas son las variables que el formulario envía y que puedes usar en tus plantillas:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{{from_name}}` | Nombre del contacto | "John Doe" |
| `{{from_email}}` | Email del contacto | "john@example.com" |
| `{{company}}` | Empresa/Organización | "Acme Corp" |
| `{{interest}}` | Área de interés | "hardware" |
| `{{message}}` | Mensaje del usuario | "Estamos interesados..." |
| `{{to_name}}` | Destinatario | "QubeCore Team" |

---

## 🎨 Personalización

### Cambiar Colores

Modifica los valores de `background` en el CSS:

```css
/* Gradient principal */
background: linear-gradient(135deg, #00F0FF, #B026FF);

/* Para tu marca */
background: linear-gradient(135deg, #TuColor1, #TuColor2);
```

### Añadir Logo

Añade tu logo en el header:

```html
<div class="header">
    <img src="https://tu-dominio.com/logo.png" alt="QubeCore" style="width: 150px; margin-bottom: 10px;">
    <h1>🚀 New Contact Request</h1>
</div>
```

---

<div align="center">

**🎉 Plantillas listas para usar**

Copia, pega y personaliza según tus necesidades.

</div>
