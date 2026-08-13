import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import records from './routes/records.js';
import ai from './routes/ai.js';
import { requireAuth } from './middleware/auth.js';

const app=express();
app.use(cors());
app.use(express.json({limit:'2mb'}));

app.get('/api/health',(req,res)=>res.json({status:'ok',service:'myboard-backend'}));
app.use('/api/records',requireAuth,records);
app.use('/api/ai',requireAuth,ai);

const port=process.env.PORT||4000;
app.listen(port,()=>console.log(`MyBoard backend running on http://localhost:${port}`));
