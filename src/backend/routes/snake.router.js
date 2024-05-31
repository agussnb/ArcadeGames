import express from 'express'
import path from 'path';

const router = express()

router.get('/snake',(req,res)=>{
    res.sendFile(path.join(path.resolve(), 'src/frontend/public/html/snake.html'));
})

export default router