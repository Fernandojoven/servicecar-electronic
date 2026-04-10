# Servicecar Electronic 🔧

Sistema de gestión para talleres mecánicos — desarrollado para **Alan Pire**.

## Módulos incluidos

| Módulo | Descripción |
|--------|-------------|
| 📊 Panel | Dashboard con estadísticas en tiempo real |
| 🚗 Vehículos | Registro e ingreso de vehículos al taller |
| 🕐 Historial | Consulta de historial de servicios por placa |
| 🔧 Mecánicos | Gestión del equipo de trabajo |
| 📦 Inventario | Control de repuestos y materiales |

## Instalación local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Deploy en Vercel desde GitHub

### Paso 1 — Subir a GitHub

```bash
git init
git add .
git commit -m "🚀 Servicecar Electronic - demo inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/servicecar-electronic.git
git push -u origin main
```

### Paso 2 — Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Clic en **"Add New Project"**
3. Selecciona el repositorio `servicecar-electronic`
4. Vercel detecta Vite automáticamente — no cambies nada
5. Clic en **"Deploy"**

¡En ~1 minuto tendrás la URL pública! 🎉

### Configuración de build (Vercel detecta automáticamente)

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Tecnologías

- HTML5 + CSS3 + JavaScript (ES Modules)
- Vite (bundler)
- Sin frameworks externos — 100% vanilla

## Estructura del proyecto

```
servicecar/
├── index.html
├── vercel.json
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.js          # App + router
    ├── styles.css       # Estilos globales
    ├── icons.js         # SVG icons
    ├── data/
    │   └── datos.js     # Datos demo
    └── pages/
        ├── panel.js
        ├── vehiculos.js
        ├── historial.js
        ├── mecanicos.js
        └── inventario.js
```
