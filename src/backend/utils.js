import path from 'path';
import express from 'express';

// Obtiene la ruta absoluta del directorio actual
const __dirname = path.resolve();

export const setupStaticFiles = (app) => {
    // Configura la ruta para los archivos estáticos
    app.use(express.static(path.join(__dirname, 'src/frontend/public')));
};
