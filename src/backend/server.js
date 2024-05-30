import express from 'express';
import path from 'path';
import { setupStaticFiles } from './utils.js';
import pongRouter from './routes/pong.router.js'

const app = express();
const PORT = process.env.PORT || 3000;


setupStaticFiles(app);



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'src/frontend/public/index.html'));
});
app.get('/pong',pongRouter);