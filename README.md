#VIDEO DE FUNCIONAMIENTO DEL SOFTWARE
https://drive.google.com/file/d/1tELb5sDIiQFgVzY_GkI1L9bMNoaAUBWf/view?usp=sharing


# 💰 Calculadora de Presupuestos para Desarrollo de Software

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Expo](https://img.shields.io/badge/Expo-51.0.0-black.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.0-61DAFB.svg)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6.svg)](https://www.typescriptlang.org)

Aplicación móvil profesional para generar cotizaciones y contratos de servicios de software, con cálculo automático de costos basado en tipo de proyecto y tamaño de equipo.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Problema Identificado](#problema-identificado)
- [Solución Implementada](#solución-implementada)
- [Arquitectura](#arquitectura)
- [Requerimientos](#requerimientos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Contribución](#contribución)
- [Roadmap](#roadmap)
- [Documentación Adicional](#documentación-adicional)

---

## 🎯 Descripción General

**Calculadora de Presupuestos** es una aplicación móvil desarrollada con React Native y Expo que permite a empresas de software y freelancers generar cotizaciones profesionales de manera rápida y estructurada. La app incluye 4 tipos predefinidos de trabajos de software, cálculo dinámico de costos según el número de integrantes, y exportación a PDF de contratos legales.

### Características Principales
- ✅ 4 tipos de trabajo de software predefinidos
- ✅ Cálculo automático de costos por integrante
- ✅ Generación de contratos PDF profesionales
- ✅ Interfaz responsive con soporte dark/light mode
- ✅ Validación de datos del cliente
- ✅ Exportación y compartición de documentos

---

## ❓ Problema Identificado

Las empresas de desarrollo de software y profesionales independientes enfrentan los siguientes desafíos:

1. **Falta de estandarización**: No existe un proceso uniforme para cotizar proyectos de software
2. **Cálculos manuales propensos a errores**: Los costos se calculan manualmente, generando inconsistencias
3. **Documentación inconsistente**: Los contratos varían en formato y contenido
4. **Pérdida de tiempo**: Crear cotizaciones desde cero consume horas de trabajo administrativo
5. **Dificultad para escalar**: Al crecer el equipo, es difícil mantener precios consistentes
6. **Sin trazabilidad**: No hay registro histórico de cotizaciones enviadas

**Impacto**: Empresas pierden hasta 15-20 horas semanales en procesos de cotización manual, con errores que pueden costar hasta 30% del valor del proyecto.

## Requerimientos
# Servidores y Plataformas 
Componente	            | Especificación	      | Propósito
Servidor de Desarrollo	| Node.js 18+        	| Ejecutar Expo y dependencias
Servicio de Compilación	| Expo Build Service  	| Generar APK/IPA
Almacenamiento Local    |AsyncStorage (opcional)| Guardar cotizaciones
CDN                     |	Expo Assets          | Distribuir assets estáticos


Nota: La aplicación es 100% offline, no requiere servidor backend.

---

## 💡 Solución Implementada

La aplicación resuelve estos problemas mediante:

### 1. **Estandarización de Servicios**
- 4 categorías predefinidas: Desarrollo Web, App Móvil, Backend & APIs, Consultoría Técnica
- Cada tipo incluye: tecnologías, entregables, y rango de equipo recomendado

### 2. **Automatización de Cálculos**
- Costo Total = Integrantes × Costo por Integrante
- Validación automática de rangos permitidos
- Cálculo en tiempo real mientras el usuario configura la cotización

### 3. **Generación Profesional de Documentos**
- Contratos legales en PDF con formato profesional
- Incluye: términos y condiciones, plazos, formas de pago
- Compartición inmediata vía email o almacenamiento

### 4. **Experiencia de Usuario Optimizada**
- Interfaz intuitiva paso a paso
- Validación de datos en tiempo real
- Soporte para temas claro/oscuro

### 5. **Portabilidad Multiplataforma**
- Funciona en iOS, Android y Web
- Sin necesidad de conexión a internet (offline first)

### 6. **Arquitectura**

┌─────────────────────────────────────────────────────────┐
│                     CLIENTE (App Móvil)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React      │  │   Expo       │  │  TypeScript  │  │
│  │   Native     │  │   Router     │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE SERVICIOS                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  expo-print  │  │expo-sharing  │  │react-native  │  │
│  │              │  │              │  │   Picker     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   GENERADOR DE PDF                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │         HTML Template + CSS Styling              │  │
│  │         Contrato Legal Estructurado              │  │
│  └──────────────────────────────────────────────────┘  │



## Instalación

**¿Cómo instalar el ambiente de desarrollo?**

# Clonar repositorio
git clone https://github.com/tu-usuario/https://github.com/MariOrt-A/appMovil_HTI.git
cd calculadora-presupuestos

# Instalar dependencias
npm install

# Instalar paquetes adicionales
npx expo install @react-native-picker/picker expo-print expo-sharing

# Iniciar servidor de desarrollo
npx expo start



## ¿Cómo ejecutar pruebas manualmente?

# Prueba 1: Selección de trabajo
- Abrir app, seleccionar cada tipo de trabajo
- Verificar que muestre tecnologías correctas

# Prueba 2: Validación de datos
- Intentar exportar sin seleccionar trabajo (error esperado)
- Ingresar integrantes fuera de rango (error esperado)
- Ingresar email inválido (error esperado)

# Prueba 3: Cálculo de costos
- Verificar fórmula: integrantes × costo por integrante

# Prueba 4: Generación de PDF
- Completar datos y exportar PDF
- Verificar contenido del documento generado


Roadmap
Requerimientos que se implementarán en un futuro:

Versión 1.1.0 (Q2 2026)

Guardado local de cotizaciones

Múltiples monedas (USD, EUR, MXN)

Múltiples plantillas de PDF

Versión 1.2.0 (Q3 2026)

Backend con Node.js y PostgreSQL

Autenticación de usuarios

Envío de cotizaciones por email

Dashboard de administración

Versión 2.0.0 (Q4 2026)

IA para predicción de costos

Firma digital integrada (DocuSign)

Integración con Jira, Slack y Google Drive
