import { adminAuth } from '../firebaseAdmin.js';

export async function requireAuth(req,res,next){
  try{
    const header=req.headers.authorization||'';
    if(!header.startsWith('Bearer ')) return res.status(401).json({message:'Missing Firebase ID token'});
    req.user=await adminAuth.verifyIdToken(header.slice(7));
    next();
  }catch(err){res.status(401).json({message:'Invalid Firebase ID token'});}
}
