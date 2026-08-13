import {
  addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where
} from 'firebase/firestore';
import { db } from '../firebase';

export async function createRecord(collectionName, data) {
  const ref = await addDoc(collection(db, collectionName), {
    ...data, createdAt: Date.now(), updatedAt: Date.now()
  });
  return { id: ref.id, ...data };
}

export async function saveRecord(collectionName, id, data) {
  await setDoc(doc(db, collectionName, id), { ...data, updatedAt: Date.now() }, { merge: true });
  return { id, ...data };
}

export async function updateRecord(collectionName, id, data) {
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: Date.now() });
}

export async function deleteRecord(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

export async function listRecords(collectionName, userId) {
  const ref = collection(db, collectionName);
  const q = userId ? query(ref, where('ownerId', '==', userId)) : ref;
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
