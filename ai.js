import { Router } from 'express';
const router=Router();

/*
  Put your approved AI provider call here. Keep provider secrets on the Express
  server, never in React/Vite environment variables.
*/
router.post('/ask', async(req,res)=>{
  const {question}=req.body;
  if(!question?.trim()) return res.status(400).json({message:'Question is required'});
  res.json({
    answer:`AI endpoint received: "${question}". Connect an AI provider in backend/src/routes/ai.js using AI_API_KEY.`
  });
});
export default router;
