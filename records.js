import { Router } from 'express';
import { db } from '../firebaseAdmin.js';
const router=Router();

router.get('/:collection', async(req,res)=>{
  const snap=await db.collection(req.params.collection).where('ownerId','==',req.user.uid).get();
  res.json(snap.docs.map(d=>({id:d.id,...d.data()})));
});

router.post('/:collection', async(req,res)=>{
  const data={...req.body,ownerId:req.user.uid,createdAt:Date.now(),updatedAt:Date.now()};
  const ref=await db.collection(req.params.collection).add(data);
  res.status(201).json({id:ref.id,...data});
});

router.patch('/:collection/:id', async(req,res)=>{
  await db.collection(req.params.collection).doc(req.params.id).update({...req.body,updatedAt:Date.now()});
  res.json({ok:true});
});

router.delete('/:collection/:id', async(req,res)=>{
  await db.collection(req.params.collection).doc(req.params.id).delete();
  res.json({ok:true});
});
export default router;
