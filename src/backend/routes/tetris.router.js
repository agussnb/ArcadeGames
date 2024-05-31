import express from 'express'
import path from 'path';

const router = express()

router.get('/tetris',(req,res)=>{
    res.sendFile(path.join(path.resolve(), 'src/frontend/public/html/tetris.html'));
})

export default router