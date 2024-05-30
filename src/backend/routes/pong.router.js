import express from 'express'
import path from 'path';

const router = express()

router.get('/pong',(req,res)=>{
    res.sendFile(path.join(path.resolve(), 'src/frontend/public/html/pong.html'));
})

export default router