#!/usr/bin/env node

/**
 * Script de Verificación de Variables de Entorno EmailJS
 * Ejecuta: node verify-env.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verificando configuración de EmailJS...\n');

// Leer archivo .env
try {
  const envPath = join(__dirname, '.env');
  const envContent = readFileSync(envPath, 'utf-8');
  
  console.log('✅ Archivo .env encontrado\n');
  
  // Extraer variables
  const vars = {};
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      vars[key.trim()] = value;
    }
  });
  
  // Verificar variables requeridas
  const required = [
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID'
  ];
  
  let allPresent = true;
  
  required.forEach(key => {
    const value = vars[key];
    const isPresent = value && value.length > 0 && !value.includes('TU_') && !value.includes('AQUI');
    
    if (isPresent) {
      console.log(`✅ ${key}: ${value}`);
    } else {
      console.log(`❌ ${key}: NO CONFIGURADA`);
      allPresent = false;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  
  if (allPresent) {
    console.log('✅ TODAS LAS VARIABLES ESTÁN CONFIGURADAS');
    console.log('\n📋 Siguiente paso:');
    console.log('1. Reinicia el servidor: npm run dev');
    console.log('2. Abre la consola del navegador (F12)');
    console.log('3. Envía el formulario de prueba');
    console.log('4. Revisa los logs en la consola');
  } else {
    console.log('❌ FALTAN VARIABLES POR CONFIGURAR');
    console.log('\n📋 Pasos para obtener las credenciales:');
    console.log('1. Ve a https://dashboard.emailjs.com/');
    console.log('2. Account → General → Public Key');
    console.log('3. Email Services → Copia el Service ID');
    console.log('4. Email Templates → Copia el Template ID');
    console.log('5. Pega los valores en el archivo .env');
  }
  
  console.log('='.repeat(60) + '\n');
  
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('❌ Archivo .env NO ENCONTRADO');
    console.log('\n📋 Solución:');
    console.log('1. Copia el archivo de ejemplo: cp .env.example .env');
    console.log('2. Edita .env y pega tus credenciales de EmailJS');
    console.log('3. Ejecuta este script de nuevo: node verify-env.js\n');
  } else {
    console.error('❌ Error:', error.message);
  }
}
