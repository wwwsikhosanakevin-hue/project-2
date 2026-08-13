import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

export async function uploadFile(file, folder, userId) {
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const path = `${folder}/${userId || 'anonymous'}/${safeName}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return { name: file.name, path, url, type: file.type, size: file.size };
}
